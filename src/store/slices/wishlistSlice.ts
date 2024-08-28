import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../services/tmdbApi';

interface WishlistState {
  items: Movie[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<Movie>) => {
      state.items.push(action.payload);
    },
    removeFromWishList: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(movie => movie.id !== action.payload);
    },
  },
});

export const { addToWishList, removeFromWishList } = wishlistSlice.actions;

export default wishlistSlice.reducer;
