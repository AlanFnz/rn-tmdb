import React from 'react';
import Carousel from '../src/components/Carousel';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { useAppNavigation } from '../src/navigation/AppNavigator';
import { useGetMoviesByGenreQuery } from '../src/store/services/tmdbApi';

jest.mock('../src/store/services/tmdbApi', () => ({
  useGetMoviesByGenreQuery: jest.fn(),
}));

jest.mock('../src/navigation/AppNavigator', () => ({
  useAppNavigation: jest.fn(),
}));

jest.mock('../src/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('../src/components/Poster', () => {
  return () => null;
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

jest.mock('../src/components/Carousel/styles', () => {
  const originalModule = jest.requireActual(
    '../src/components/Carousel/styles',
  );
  return {
    ...originalModule,
    CarouselPoster: () => null,
  };
});

describe('Carousel', () => {
  const genreId = 1;
  const genreName = 'Action';
  const genreIndex = 0;

  const mockMovies = [
    {
      id: 1,
      title: 'Movie 1',
      poster_path: 'poster1.jpg',
    },
    {
      id: 2,
      title: 'Movie 2',
      poster_path: 'poster2.jpg',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with movies', () => {
    (useGetMoviesByGenreQuery as jest.Mock).mockReturnValue({
      data: mockMovies,
      error: null,
      isLoading: false,
    });

    const { getByText } = render(
      <Carousel
        genreId={genreId}
        genreName={genreName}
        genreIndex={genreIndex}
      />,
    );

    expect(getByText('Action')).toBeTruthy();

    expect(getByText('Movie 1')).toBeTruthy();
    expect(getByText('Movie 2')).toBeTruthy();
  });

  it('shows loading display when data is loading', () => {
    (useGetMoviesByGenreQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { getByTestId } = render(
      <Carousel
        genreId={genreId}
        genreName={genreName}
        genreIndex={genreIndex}
      />,
    );

    expect(getByTestId('loading-display')).toBeTruthy();
  });

  it('shows error message when there is an error', () => {
    (useGetMoviesByGenreQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    const { getByText } = render(
      <Carousel
        genreId={genreId}
        genreName={genreName}
        genreIndex={genreIndex}
      />,
    );

    expect(getByText('Error loading movies.')).toBeTruthy();
  });

  it('navigates to the movie details screen when a movie is clicked', async () => {
    (useGetMoviesByGenreQuery as jest.Mock).mockReturnValue({
      data: mockMovies,
      error: null,
      isLoading: false,
    });

    const mockNavigate = jest.fn();
    (useAppNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });

    const { getByText } = render(
      <Carousel
        genreId={genreId}
        genreName={genreName}
        genreIndex={genreIndex}
      />,
    );

    fireEvent.press(getByText('Movie 1'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('MovieDetailsScreen', {
        movieId: 1,
        genreIndex: 0,
      });
    });
  });
});
