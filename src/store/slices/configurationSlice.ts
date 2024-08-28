import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

interface ImageConfig {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  poster_sizes: string[];
}

interface ConfigState {
  images: ImageConfig | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ConfigState = {
  images: null,
  status: 'idle',
};

export const fetchConfig = createAsyncThunk('config/fetchConfig', async () => {
  const response = await axiosInstance.get('configuration');
  return response.data.images;
});

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchConfig.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.status = 'idle';
        state.images = action.payload;
      })
      .addCase(fetchConfig.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const selectImageConfig = (state: { config: ConfigState }) =>
  state.config.images;

export default configSlice.reducer;
