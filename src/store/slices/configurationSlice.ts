import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import axiosInstance from '../../api/axiosInstance';

export const fetchConfig = createAsyncThunk('config/fetchConfig', async () => {
  const response = await axiosInstance.get('configuration');
  return response.data.images;
});

const configSlice = createSlice({
  name: 'config',
  initialState: {
    images: {
      secure_base_url: '',
      poster_sizes: [],
    },
    status: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchConfig.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.images = action.payload;
        state.status = 'succeeded';
      });
  },
});

export const selectImageConfig = (state: RootState) => state.config.images;

export default configSlice.reducer;
