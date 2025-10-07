// app/(tabs)/home/movie/[id].tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

import CastModal from '@/components/CastModal';
import { useMovieLists } from '../../../../hooks/useMovieLists';
import {
  CastImage,
  CastItem,
  CastName,
  Container,
  Content,
  Description,
  InfoLabel,
  InfoRow,
  InfoValue,
  LoadingContainer,
  MovieCard,
  MovieImage,
  Poster,
  SectionLabel,
  Subtitle,
  Title,
  WatchlistButton,
  WatchlistButtonText,
} from '../../../../theme/styles/movieDetailStyles';
import {
  getMovieCredits,
  getMovieDetails,
  getMovieRecommendations,
  getMovieVideos,
} from '../../../../utils/tmdb';

type MovieDetail = {
  id: number;
  title: string;
  release_date?: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
};

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const {
    lists,
    createList,
    addMovieToList,
    removeMovieFromList,
    fetchLists,
    loading: listsLoading,
  } = useMovieLists();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedCast, setSelectedCast] = useState<any | null>(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [watchlistId, setWatchlistId] = useState<string | null>(null);

  // Fetch movie details
  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        const [movieData, videos, credits, recs] = await Promise.all([
          getMovieDetails(Number(id)),
          getMovieVideos(Number(id)),
          getMovieCredits(Number(id)),
          getMovieRecommendations(Number(id)),
        ]);

        setMovie(movieData);

        const trailer = videos.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);

        setCast(credits.cast || []);
        setRecommendations(recs || []);
      } catch (err) {
        console.error('Movie fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  // Check if movie is in Watchlist
  useEffect(() => {
    if (!id || listsLoading) return;

    const watchlist = lists.find(l => l.name.toLowerCase() === 'watchlist');
    if (watchlist) {
      setWatchlistId(watchlist.id);
      const exists = watchlist.movies.some(m => m.id === Number(id));
      setInWatchlist(exists);
    }
  }, [id, lists, listsLoading]);

  // Handle Add/Remove Watchlist
  const toggleWatchlist = async () => {
    if (!movie) return;

    let targetListId = watchlistId;
    let targetList = lists.find(l => l.name.toLowerCase() === 'watchlist');

    // Create "Watchlist" if it doesn’t exist
    if (!targetList) {
      const createdList = await createList('Watchlist');
      if (!createdList) {
        Alert.alert('Error', 'Could not create or locate Watchlist.');
        return;
      }
      targetListId = createdList.id;
      setWatchlistId(createdList.id);
    } else {
      targetListId = targetList.id;
    }

    // Add or remove movie
    if (inWatchlist) {
      await removeMovieFromList(targetListId!, movie.id);
      setInWatchlist(false);
      Alert.alert('Removed', `${movie.title} has been removed from your Watchlist.`);
    } else {
      await addMovieToList(targetListId!, movie);
      setInWatchlist(true);
      Alert.alert('Added', `${movie.title} has been added to your Watchlist.`);
    }
  };

  if (loading || listsLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="dodgerblue" />
      </LoadingContainer>
    );
  }

  if (!movie) return <Title>Movie not found</Title>;

  return (
    <Container>
      <Poster source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} />
      <Content>
        <Title>{movie.title}</Title>
        <Subtitle>
          {movie.genres?.map(g => g.name).join(', ') || 'N/A'} |{' '}
          {movie.release_date?.split('-')[0] || 'Unknown'} | ⭐ {movie.vote_average.toFixed(1)}
        </Subtitle>
        <Description>{movie.overview}</Description>

        {/* Watchlist Button */}
        <WatchlistButton inWatchlist={inWatchlist} onPress={toggleWatchlist}>
          <Ionicons name={inWatchlist ? 'checkmark' : 'add'} size={20} color="#fff" />
          <WatchlistButtonText>
            {inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </WatchlistButtonText>
        </WatchlistButton>

        <InfoRow>
          <InfoLabel>⏱ Duration</InfoLabel>
          <InfoValue>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</InfoValue>
        </InfoRow>

        {trailerKey && (
          <>
            <SectionLabel>🎥 Trailer</SectionLabel>
            <YoutubeIframe height={220} videoId={trailerKey} />
          </>
        )}

        {cast.length > 0 && (
          <>
            <SectionLabel>👥 Cast</SectionLabel>
            <FlatList
              horizontal
              data={cast.slice(0, 10)}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <CastItem onPress={() => setSelectedCast(item)}>
                  <CastImage
                    source={{
                      uri: item.profile_path
                        ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                        : 'https://via.placeholder.com/100x150.png?text=No+Image',
                    }}
                  />
                  <CastName numberOfLines={1}>{item.name}</CastName>
                </CastItem>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}

        {recommendations.length > 0 && (
          <>
            <SectionLabel>📺 Recommendations</SectionLabel>
            <FlatList
              horizontal
              data={recommendations}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <MovieCard onPress={() => router.push(`/home/movie/${item.id}`)}>
                  <MovieImage
                    source={{
                      uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                    }}
                  />
                </MovieCard>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      </Content>

      <CastModal
        visible={!!selectedCast}
        onClose={() => setSelectedCast(null)}
        cast={selectedCast}
      />
    </Container>
  );
}
