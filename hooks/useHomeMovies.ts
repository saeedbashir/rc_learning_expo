// hooks/useHomeMovies.ts
import { TMDBMovie } from '@/type/types';
import { getPopularMovies, getTrendingMovies } from '@/utils/tmdb';
import { useCallback, useEffect, useState } from 'react';

export const useHomeMovies = () => {
  const [trending, setTrending] = useState<TMDBMovie[]>([]);
  const [popular, setPopular] = useState<TMDBMovie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Helper function to merge and remove duplicates by ID
  const mergeUniqueMovies = useCallback((existing: TMDBMovie[], incoming: TMDBMovie[]) => {
    const all = [...existing, ...incoming];
    const unique = Array.from(new Map(all.map(movie => [movie.id, movie])).values());
    return unique;
  }, []);

  const fetchTrending = useCallback(async () => {
    const data = await getTrendingMovies();
    setTrending(data);
  }, []);

  const fetchPopular = useCallback(
    async (pageNum = 1, reset = false) => {
      const data = await getPopularMovies(pageNum);
      setPopular(prev => {
        if (reset) return data.results;
        return mergeUniqueMovies(prev, data.results);
      });
      setPage(data.page);
    },
    [mergeUniqueMovies],
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchTrending(), fetchPopular(1, true)]);
      setLoading(false);
    })();
  }, [fetchTrending, fetchPopular]);

  const loadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    await fetchPopular(page + 1);
    setLoadingMore(false);
  };

  const onRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    await Promise.all([fetchTrending(), fetchPopular(1, true)]);
    setRefreshing(false);
  };

  return {
    trending,
    popular,
    loading,
    loadingMore,
    refreshing,
    loadMore,
    onRefresh,
  };
};
