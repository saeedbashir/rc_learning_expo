// utils/tmdb.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = '935386f1adb33802dffaa2d89bcf4539';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getTrendingMovies: builder.query({
      query: () => `/trending/movie/day?api_key=${API_KEY}&language=en-US`,
    }),
    getPopularMovies: builder.query<any, number>({
      query: page =>
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&sort_by=popularity.desc`,
    }),
    getMovieGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    }),
    getMoviesByGenreLazy: builder.query<any, { genreId: number; page?: number }>({
      query: ({ genreId, page = 1 }) =>
        `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
      transformResponse: (response: any) => response.results,
    }),
    getMovieDetails: builder.query({
      query: (id: number) => `/movie/${id}?api_key=${API_KEY}&language=en-US`,
    }),
    getMovieVideos: builder.query({
      query: (id: number) => `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
    }),
    getMovieCredits: builder.query({
      query: (id: number) => `/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    }),
    getMovieRecommendations: builder.query<any, { id: number; page?: number }>({
      query: ({ id, page = 1 }) =>
        `/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=${page}`,
      transformResponse: (response: any) => response.results,
    }),
  }),
});

export const {
  useGetTrendingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetMovieGenresQuery,
  useLazyGetMoviesByGenreLazyQuery,
  useGetMovieDetailsQuery,
  useGetMovieVideosQuery,
  useGetMovieCreditsQuery,
  useGetMovieRecommendationsQuery,
} = tmdbApi;
