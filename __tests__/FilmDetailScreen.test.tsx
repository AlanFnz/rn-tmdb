import React from 'react';
import FilmDetailScreen from '../src/screens/FilmDetailScreen';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import { useGetMovieDetailsQuery } from '../src/store/services/tmdbApi';
import { FilmDetailPoster } from '../src/screens/FilmDetailScreen/styles';
import { useSelector } from 'react-redux';

jest.mock('../src/store/services/tmdbApi', () => ({
  useGetMovieDetailsQuery: jest.fn(),
  tmdbApi: {
    reducerPath: 'tmdbApi',
    reducer: jest.fn(),
    middleware: jest.fn(),
  },
}));

jest.mock('../src/store', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({
    params: {
      movieId: 1,
      genreIndex: 2,
    },
  }),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../src/screens/WishListScreen/components/WishListButton', () => {
  const { View } = require('react-native');
  return () => <View testID="wishlist-button" />;
});

jest.mock('../src/components/Poster', () => {
  return () => null;
});

jest.mock('../src/screens/FilmDetailScreen/styles', () => {
  const { View } = require('react-native');
  const originalModule = jest.requireActual(
    '../src/screens/FilmDetailScreen/styles',
  );

  return {
    ...originalModule,
    CompanyLogo: () => <View testID="company-logo" />,
    FilmDetailPoster: () => <View testID="film-detail-poster" />,
  };
});

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    ScrollView: View,
    State: {},
    PanGestureHandler: View,
    TapGestureHandler: View,
    BaseButton: View,
    Directions: {},
    GestureHandlerRootView: View,
  };
});

jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve());

describe('FilmDetailScreen', () => {
  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      secure_base_url: 'https://image.tmdb.org/t/p/',
      backdrop_sizes: ['w300', 'w780', 'w1280'],
      logo_sizes: ['w45', 'w92'],
    });
    (useGetMovieDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        backdrop_path: '/backdrop.jpg',
        poster_path: '/poster.jpg',
        overview: 'This is a movie overview.',
        tagline: 'A tagline for the movie.',
        release_date: '2022-01-01',
        vote_average: 8.0,
        budget: 50000000,
        homepage: 'https://movie-homepage.com',
        production_companies: [
          { id: 1, logo_path: '/company-logo.png', name: 'Company 1' },
        ],
        spoken_languages: [{ iso_639_1: 'en', english_name: 'English' }],
      },
      error: null,
      isLoading: false,
    });
  });

  it('shows loading display when fetching movie details', () => {
    (useGetMovieDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { getByTestId } = render(<FilmDetailScreen />);
    expect(getByTestId('loading-display')).toBeTruthy();
  });

  it('displays an error message if there is an error fetching movie details', () => {
    (useGetMovieDetailsQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    const { getByTestId } = render(<FilmDetailScreen />);
    expect(getByTestId('message-display')).toBeTruthy();
  });

  it('renders movie details correctly when data is loaded', () => {
    (useGetMovieDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        backdrop_path: '/backdrop.jpg',
        poster_path: '/poster.jpg',
        overview: 'This is a movie overview.',
        tagline: 'A tagline for the movie.',
        release_date: '2022-01-01',
        vote_average: 8.0,
        budget: 50000000,
        homepage: 'https://movie-homepage.com',
        production_companies: [
          { id: 1, logo_path: '/company-logo.png', name: 'Company 1' },
        ],
        spoken_languages: [{ iso_639_1: 'en', english_name: 'English' }],
      },
      error: null,
      isLoading: false,
    });

    const { getByText, getByTestId } = render(<FilmDetailScreen />);

    expect(getByTestId('film-detail-poster')).toBeTruthy();
    expect(getByText('This is a movie overview.')).toBeTruthy();
    expect(getByText('A tagline for the movie.')).toBeTruthy();
    expect(getByText('Release Date: 2022-01-01')).toBeTruthy();
    expect(getByText('Rating: 8')).toBeTruthy();
    expect(getByText('Budget: 50000000')).toBeTruthy();
    expect(getByText('English')).toBeTruthy();
  });

  it('opens the movie homepage when the link is pressed', () => {
    (useGetMovieDetailsQuery as jest.Mock).mockReturnValue({
      data: {
        backdrop_path: '/backdrop.jpg',
        poster_path: '/poster.jpg',
        overview: 'This is a movie overview.',
        tagline: 'A tagline for the movie.',
        release_date: '2022-01-01',
        vote_average: 8.0,
        budget: 50000000,
        homepage: 'https://movie-homepage.com',
        production_companies: [],
        spoken_languages: [{ iso_639_1: 'en', english_name: 'English' }],
      },
      error: null,
      isLoading: false,
    });

    const { getByText } = render(<FilmDetailScreen />);
    const homepageLink = getByText('Visit Homepage');
    fireEvent.press(homepageLink);

    expect(Linking.openURL).toHaveBeenCalledWith('https://movie-homepage.com');
  });
});
