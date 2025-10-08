//components/home/HomeMoviesGrid.tsx
import {
  ColumnWrapper,
  ContentContainer,
  FooterLoader,
  PopularCard,
} from '@/theme/styles/homeStyles';
import { TMDBMovie } from '@/type/types';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import HomeMoviesHeader from './HomeMoviesHeader';

interface Props {
  trending: TMDBMovie[];
  popular: TMDBMovie[];
  loadingMore: boolean;
  refreshing: boolean;
  loadMore: () => void;
  onRefresh: () => void;
}

const HomeMoviesGrid: React.FC<Props> = ({
  trending,
  popular,
  loadingMore,
  refreshing,
  loadMore,
  onRefresh,
}) => (
  <FlatList
    data={popular}
    numColumns={2}
    columnWrapperStyle={ColumnWrapper}
    contentContainerStyle={ContentContainer}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => (
      <Link href={`/home/movie/${item.id}`} asChild>
        <PopularCard
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
    )}
    onEndReached={loadMore}
    onEndReachedThreshold={0.1}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    ListHeaderComponent={<HomeMoviesHeader trending={trending} />}
    ListFooterComponent={loadingMore ? <FooterLoader /> : null}
  />
);

export default HomeMoviesGrid;
