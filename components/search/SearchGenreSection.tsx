// components/search/SearchGenreSection.tsx
import { SectionTitle } from '@/theme/styles/homeStyles';
import {
  ContentPaddingHorizontal,
  LoadMoreLoader,
  LoadMoreWrapper,
  SectionHeader,
  TrendingCard,
} from '@/theme/styles/searchStyles';
import { SectionData, TMDBMovie } from '@/type/types';
import { Link } from 'expo-router';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

interface Props {
  section: SectionData;
  loadMoreMovies: (genreId: number) => void;
}

const SearchGenreSection: React.FC<Props> = ({ section, loadMoreMovies }) => {
  const renderMovieCard = useCallback(
    ({ item }: { item: TMDBMovie }) => (
      <Link href={`/home/movie/${item.id}`} asChild>
        <TrendingCard
          movie={{
            id: item.id.toString(),
            title: item.title,
            year: item.release_date?.split('-')[0],
            genre: 'N/A',
            rating: item.vote_average,
            poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            description: item.overview,
          }}
        />
      </Link>
    ),
    [],
  );

  return (
    <>
      <SectionHeader>
        <SectionTitle>{section.title}</SectionTitle>
      </SectionHeader>
      <FlatList
        data={section.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${section.genreId}-${item.id}-${index}`}
        renderItem={renderMovieCard}
        contentContainerStyle={ContentPaddingHorizontal}
        onEndReached={() => loadMoreMovies(section.genreId)}
        onEndReachedThreshold={0.4}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews
        ListFooterComponent={
          section.loadingMore ? (
            <LoadMoreWrapper>
              <LoadMoreLoader />
            </LoadMoreWrapper>
          ) : null
        }
      />
    </>
  );
};

export default SearchGenreSection;
