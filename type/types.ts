//app/type/types

import { User as FirebaseUser } from 'firebase/auth';

export type TMDBMovie = {
  id: number;
  title: string;
  release_date?: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
};

export type MovieGenre = {
  id: number;
  name: string;
};

export type Movie = {
  id: string;
  title: string;
  year?: number | string;
  genre?: string;
  rating?: number;
  poster: string;
  description?: string;
};

export type SectionData = {
  title: string;
  genreId: number;
  data: TMDBMovie[];
  page: number;
  totalPages?: number;
  loadingMore: boolean;
};

export type MovieList = {
  id: string;
  userId: string;
  name: string;
  movies: TMDBMovie[];
};

export interface AppUser extends FirebaseUser {
  name?: string;
  bio?: string;
  country?: string;
  avatar?: string;
  followers?: number;
  following?: number;
}
