// app/(tabs)/home/index.tsx
import { useHomeMovies } from '@/hooks/useHomeMovies';
import { Loader, LoadingContainer } from '@/theme/styles/homeStyles';
import React from 'react';
import MoviesGrid from '../../../components/home/HomeMoviesGrid';

const MoviesListScreen = () => {
  const { trending, popular, loading, loadingMore, refreshing, loadMore, onRefresh } =
    useHomeMovies();

  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
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
