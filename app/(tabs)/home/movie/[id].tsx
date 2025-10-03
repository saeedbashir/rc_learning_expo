// app/(tabs)/home/movie/[id].tsx
import CastModal from '@/components/CastModal';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
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

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selectedCast, setSelectedCast] = useState<any | null>(null);

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

  if (loading) {
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

        <InfoRow>
          <InfoLabel>⏱ Duration</InfoLabel>
          <InfoValue>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</InfoValue>
        </InfoRow>

        {/* Trailer Section */}
        {trailerKey && (
          <>
            <SectionLabel>🎥 Trailer</SectionLabel>
            <YoutubeIframe height={220} videoId={trailerKey} />
          </>
        )}

        {/* Cast Section */}
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

        {/* Recommendations Section */}
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

      {/* Cast Detail Modal */}
      <CastModal
        visible={!!selectedCast}
        onClose={() => setSelectedCast(null)}
        cast={selectedCast}
      />
    </Container>
  );
}
