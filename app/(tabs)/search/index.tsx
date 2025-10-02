// app/(tabs)/search/index.tsx
import { MovieGenre, SectionData, TMDBMovie } from '@/type/types';
import { Link } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SectionList } from 'react-native';
import {
  Container,
  Loader,
  SectionTitle,
  TrendingCard as TrendingCardBase,
} from '../../../theme/styles/homeStyles';
import {
  ContentPaddingBottom,
  ContentPaddingHorizontal,
  LoadMoreLoader,
  LoadMoreWrapper,
  SectionHeader,
} from '../../../theme/styles/searchStyles';
import { getMovieGenres, getMoviesByGenre } from '../../../utils/tmdb';

// memoized TrendingCard to prevent unnecessary re-renders
const TrendingCard = React.memo(TrendingCardBase);

export default function SearchScreen() {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenresAndMovies = async () => {
      try {
        const genres: MovieGenre[] = await getMovieGenres();
        if (!genres || genres.length === 0) return;

        const initialSections: SectionData[] = [];

        // Fetch first 3 genres initially
        for (let i = 0; i < Math.min(3, genres.length); i++) {
          const movies: TMDBMovie[] = await getMoviesByGenre(genres[i].id, 1);
          if (movies.length) {
            initialSections.push({
              title: genres[i].name,
              genreId: genres[i].id,
              data: movies,
              page: 1,
              totalPages: 1,
              loadingMore: false,
            });
          }
        }

        setSections(initialSections);

        // Fetch remaining genres progressively
        for (let i = 3; i < genres.length; i++) {
          const movies: TMDBMovie[] = await getMoviesByGenre(genres[i].id, 1);
          if (movies.length) {
            setSections(prev => [
              ...prev,
              {
                title: genres[i].name,
                genreId: genres[i].id,
                data: movies,
                page: 1,
                totalPages: 1,
                loadingMore: false,
              },
            ]);
          }
        }
      } catch (err) {
        console.error('Error fetching genres or movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenresAndMovies();
  }, []);

  // memoized load more handler
  const loadMoreMovies = useCallback(
    async (genreId: number) => {
      const section = sections.find(s => s.genreId === genreId);
      if (!section || section.loadingMore) return;

      setSections(prev => prev.map(s => (s.genreId === genreId ? { ...s, loadingMore: true } : s)));

      try {
        const nextPage = section.page + 1;
        const movies: TMDBMovie[] = await getMoviesByGenre(genreId, nextPage);

        setSections(prev =>
          prev.map(s =>
            s.genreId === genreId
              ? {
                  ...s,
                  data: [...s.data, ...movies],
                  page: nextPage,
                  loadingMore: false,
                }
              : s,
          ),
        );
      } catch (err) {
        console.error('Error loading more movies:', err);
        setSections(prev =>
          prev.map(s => (s.genreId === genreId ? { ...s, loadingMore: false } : s)),
        );
      }
    },
    [sections],
  );

  // memoized renderItem for movie card
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

  // memoized renderSectionFooter
  const renderSectionFooter = useCallback(
    ({ section }: { section: SectionData }) => (
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
        removeClippedSubviews={true}
        ListFooterComponent={
          section.loadingMore ? (
            <LoadMoreWrapper>
              <LoadMoreLoader />
            </LoadMoreWrapper>
          ) : null
        }
      />
    ),
    [loadMoreMovies, renderMovieCard],
  );

  if (loading && sections.length === 0) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={() => null} // handled by FlatList in footer
      renderSectionHeader={({ section }) => (
        <SectionHeader>
          <SectionTitle>{section.title}</SectionTitle>
        </SectionHeader>
      )}
      renderSectionFooter={renderSectionFooter}
      contentContainerStyle={ContentPaddingBottom}
      removeClippedSubviews={true}
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      // windowSize={10}
    />
  );
}
