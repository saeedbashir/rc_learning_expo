import { Link } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, View } from 'react-native';
import MovieCard from '../../../components/MovieCard';
import { getPopularMovies, getTrendingMovies } from '../../../utils/tmdb';
import styles from '../home/styles';

type TMDBMovie = {
  id: number;
  title: string;
  release_date?: string;
  vote_average: number;
  poster_path: string;
  overview: string;
};

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
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }

  return (
    <FlatList
      data={popular}
      numColumns={2}
      columnWrapperStyle={{ paddingHorizontal: 8 }}
      contentContainerStyle={{ paddingBottom: 16 }}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <Link href={`/home/movie/${item.id}`} asChild>
          <MovieCard
            style={{ flex: 1, margin: 8 }} // use available space for 2 cards
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
      ListHeaderComponent={
        <View>
          <Text style={styles.sectionTitle}>🔥 Trending</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}>
            {trending.map(item => (
              <Link key={item.id} href={`/home/movie/${item.id}`} asChild>
                <MovieCard
                  style={{ width: 160, marginHorizontal: 8 }} // fixed size for trending items
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
          </ScrollView>
          <Text style={styles.sectionTitle}>⭐ Popular</Text>
        </View>
      }
      ListFooterComponent={
        loadingMore ? (
          <ActivityIndicator size="small" color="dodgerblue" style={{ margin: 16 }} />
        ) : null
      }
    />
  );
}
