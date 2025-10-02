// app/(tabs)/home/index.tsx
import { TMDBMovie } from '@/type/types';
import { Link } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import {
  ColumnWrapper,
  ContentContainer,
  FooterLoader,
  Loader,
  LoadingContainer,
  PopularCard,
  ScrollWrapper,
  SectionTitle,
  TrendingCard,
} from '../../../theme/styles/homeStyles';
import { getPopularMovies, getTrendingMovies } from '../../../utils/tmdb';

function MoviesHeader({ trending }: { trending: TMDBMovie[] }) {
  return (
    <>
      <SectionTitle>🔥 Trending</SectionTitle>
      <ScrollWrapper>
        {trending.map(item => (
          <Link key={item.id} href={`/home/movie/${item.id}`} asChild>
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
        ))}
      </ScrollWrapper>
      <SectionTitle>⭐ Popular</SectionTitle>
    </>
  );
}

export default function MoviesListScreen() {
  const [trending, setTrending] = useState<TMDBMovie[]>([]);
  const [popular, setPopular] = useState<TMDBMovie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // fetch trending
  const fetchTrending = useCallback(async () => {
    const data = await getTrendingMovies();
    setTrending(data);
  }, []);

  // fetch popular
  const fetchPopular = useCallback(async (pageNum = 1, reset = false) => {
    const data = await getPopularMovies(pageNum);
    setPopular(prev => (reset ? data.results : [...prev, ...data.results]));
    setPage(data.page);
  }, []);

  // Initial load
  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchTrending(), fetchPopular(1, true)]);
      setLoading(false);
    })();
  }, []);

  // Pagination
  const loadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    await fetchPopular(page + 1);
    setLoadingMore(false);
  };

  // Pull to refresh
  const onRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    await Promise.all([fetchTrending(), fetchPopular(1, true)]);
    setRefreshing(false);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    );
  }

  return (
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
      ListHeaderComponent={<MoviesHeader trending={trending} />}
      ListFooterComponent={loadingMore ? <FooterLoader /> : null}
    />
  );
}
