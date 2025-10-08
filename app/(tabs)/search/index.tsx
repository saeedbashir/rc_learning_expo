// app/(tabs)/search/index.tsx
import SearchSectionsList from '@/components/search/SearchSectionsList';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import { Container, Loader } from '@/theme/styles/homeStyles';
import React from 'react';

const SearchScreen = () => {
  const { sections, loading, loadMoreMovies } = useSearchMovies();

  if (loading && sections.length === 0) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return <SearchSectionsList sections={sections} loadMoreMovies={loadMoreMovies} />;
};

export default SearchScreen;
