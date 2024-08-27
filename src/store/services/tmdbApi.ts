import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig, AxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';

interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface MovieDetails extends Movie {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  popularity: number;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
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
    getMovieDetails: builder.query<MovieDetails, number>({
      query: movieId => ({ url: `movie/${movieId}` }),
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesByGenreQuery,
  useGetMovieDetailsQuery,
} = tmdbApi;
