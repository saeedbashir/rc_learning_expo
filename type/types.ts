//app/type/types
export type TMDBMovie = {
  id: number;
  title: string;
  release_date?: string;
  vote_average: number;
  poster_path: string;
  overview: string;
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
