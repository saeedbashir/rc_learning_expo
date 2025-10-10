// app/(tabs)/home/index.tsx
import MoviesGrid from '@/components/home/HomeMoviesGrid';
import { useHomeMovies } from '@/hooks/useHomeMovies';
import React from 'react';

const MoviesListScreen = () => {
  const { trending, popular, loading, loadingMore, refreshing, loadMore, onRefresh } =
    useHomeMovies();

  if (loading) {
    return null;
  }

  return (
    <MoviesGrid
      trending={trending}
      popular={popular}
      loadingMore={loadingMore}
      refreshing={refreshing}
      loadMore={loadMore}
      onRefresh={onRefresh}
    />
  );
};

export default MoviesListScreen;
