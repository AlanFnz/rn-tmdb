import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig, AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface GenreResponse {
  genres: Genre[];
}

const axiosBaseQuery: BaseQueryFn<
  { url: string; method?: AxiosRequestConfig['method']; data?: unknown },
  unknown,
  unknown
> = async ({ url, method = 'get', data }) => {
  try {
    const result = await axiosInstance({ url, method, data });
    return { data: result.data };
  } catch (error) {
    const err = error as AxiosError;
    return {
      error: {
        status: err.response?.status ?? 'FETCH_ERROR',
        data:
          err.response?.data ||
          err.message ||
          'There was an error fetching tha data',
      },
    };
  }
};

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: axiosBaseQuery,
  endpoints: builder => ({
    getGenres: builder.query<GenreResponse, void>({
      query: () => ({ url: 'genre/movie/list' }),
    }),

    getMoviesByGenre: builder.query<Movie[], number>({
      query: genreId => ({ url: `discover/movie?with_genres=${genreId}` }),
      transformResponse: (response: { results: Movie[] }) => response.results,
    }),

    getMovieDetails: builder.query<Movie, number>({
      query: movieId => ({ url: `movie/${movieId}` }),
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesByGenreQuery,
  useGetMovieDetailsQuery,
} = tmdbApi;
