// hooks/useHomeMovies.ts
import { useGetPopularMoviesQuery, useGetTrendingMoviesQuery } from '@/redux/tmdb';
import { TMDBMovie } from '@/type/types';
import { useEffect, useState } from 'react';

export const useHomeMovies = () => {
  const [popularPage, setPopularPage] = useState(1);
  const [popularMovies, setPopularMovies] = useState<TMDBMovie[]>([]);

  // Fetch trending
  const trendingQuery = useGetTrendingMoviesQuery(undefined);

  // Fetch popular with page
  const popularQuery = useGetPopularMoviesQuery(popularPage);

  // Merge popular pages without duplicates
  useEffect(() => {
    if (!popularQuery.data?.results) return;

    setPopularMovies(prev => {
      const merged = [...prev, ...popularQuery.data.results];
      const unique = Array.from(new Map(merged.map(m => [m.id, m])).values());
      return unique;
    });
  }, [popularQuery.data]);

  const trending: TMDBMovie[] = trendingQuery.data?.results ?? [];

  const loading = trendingQuery.isLoading || (popularPage === 1 && popularQuery.isFetching);
  const loadingMore = popularQuery.isFetching && popularPage > 1;

  const onRefresh = () => {
    setPopularMovies([]);
    setPopularPage(1);
    trendingQuery.refetch();
    popularQuery.refetch();
  };

  const loadMore = () => {
    if (!loadingMore) setPopularPage(prev => prev + 1);
  };

  return {
    trending,
    popular: popularMovies,
    loading,
    loadingMore,
    refreshing: loading || popularQuery.isFetching,
    loadMore,
    onRefresh,
  };
};
