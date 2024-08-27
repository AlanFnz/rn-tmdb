import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from './services/tmdbApi';
import wishlistReducer from './slices/wishlistSlice';

const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    wishlist: wishlistReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export default store;
