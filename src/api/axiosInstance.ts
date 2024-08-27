import axios, { AxiosInstance } from 'axios';
import { TMDB_API_READ_ACCESS_TOKEN } from '@env';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`,
  },
});

export default axiosInstance;
