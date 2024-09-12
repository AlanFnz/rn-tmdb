import React from 'react';
import configureMockStore from 'redux-mock-store';
import WishListScreen from '../src/screens/WishListScreen';
import { fireEvent, render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { removeFromWishList } from '../src/store/slices/wishlistSlice';

jest.mock('../src/components/Poster', () => {
  return () => null;
});

jest.mock('../src/screens/WishListScreen/styles', () => {
  const originalModule = jest.requireActual(
    '../src/screens/WishListScreen/styles',
  );
  return {
    ...originalModule,
    WishListPoster: () => null,
  };
});

const mockStore = configureMockStore([]);
const initialState = {
  wishlist: { items: [] },
  config: { images: { secure_base_url: '', poster_sizes: [] } },
};

describe('WishListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <WishListScreen />
      </Provider>,
    );
    expect(getByText('Your wishlist is empty')).toBeTruthy();
  });

  it('renders movies in the wishlist correctly', () => {
    const stateWithMovies = {
      ...initialState,
      wishlist: {
        items: [
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
        ],
      },
    };
    const store = mockStore(stateWithMovies);
    const { getByText } = render(
      <Provider store={store}>
        <WishListScreen />
      </Provider>,
    );

    expect(getByText('Movie 1')).toBeTruthy();
    expect(getByText('Movie 2')).toBeTruthy();
  });

  it('shows the "Remove" button for each movie in the wishlist', () => {
    const stateWithMovies = {
      ...initialState,
      wishlist: {
        items: [
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
        ],
      },
    };
    const store = mockStore(stateWithMovies);
    const { getAllByText } = render(
      <Provider store={store}>
        <WishListScreen />
      </Provider>,
    );

    const removeButtons = getAllByText('Remove');
    expect(removeButtons.length).toBe(2);
  });

  it('dispatches the removeFromWishList action when "Remove" button is pressed', () => {
    const stateWithMovies = {
      ...initialState,
      wishlist: {
        items: [
          {
            id: 1,
            title: 'Movie 1',
            poster_path: 'poster1.jpg',
          },
        ],
      },
    };
    const store = mockStore(stateWithMovies);
    store.dispatch = jest.fn();

    const { getByText, getByRole } = render(
      <Provider store={store}>
        <WishListScreen />
      </Provider>,
    );

    fireEvent.press(getByText('Remove'));

    expect(store.dispatch).toHaveBeenCalledWith(removeFromWishList(1));
  });

  it('correctly renders safe area insets', () => {
    const stateWithMovies = {
      ...initialState,
      wishlist: {
        items: [
          {
            id: 1,
            title: 'Movie 1',
            poster_path: 'poster1.jpg',
          },
        ],
      },
    };
    const mockInsets = { top: 10, bottom: 0, left: 0, right: 0 };
    jest.mock('react-native-safe-area-context', () => ({
      useSafeAreaInsets: () => mockInsets,
    }));

    const store = mockStore(stateWithMovies);
    const { getByText } = render(
      <Provider store={store}>
        <WishListScreen />
      </Provider>,
    );

    expect(getByText('Remove')).toBeTruthy();
  });
});
