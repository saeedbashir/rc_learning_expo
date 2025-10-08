// app/(tabs)/home/movie/[id].tsx
import CastModal from '@/components/CastModal';
import MovieCastSection from '@/components/home/MovieCastSection';
import RecommendationsSection from '@/components/home/MovieRecommendationsSection';
import WatchlistButton from '@/components/home/WatchlistButton';
import { useMovieDetail } from '@/hooks/useMovieDetail';

import {
  Container,
  Content,
  Description,
  InfoLabel,
  InfoRow,
  InfoValue,
  LoaderWrapper,
  LoadingContainer,
  Poster,
  PosterContainer,
  SectionLabel,
  Subtitle,
  Title,
} from '@/theme/styles/movieDetailStyles';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const {
    movie,
    loading,
    listsLoading,
    trailerKey,
    cast,
    recommendations,
    selectedCast,
    setSelectedCast,
    inWatchlist,
    toggleWatchlist,
  } = useMovieDetail(id);

  if (loading || listsLoading)
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="dodgerblue" />
      </LoadingContainer>
    );

  if (!movie) return <Title>Movie not found</Title>;

  return (
    <Container>
      <PosterContainer>
        {isImageLoading && (
          <LoaderWrapper>
            <ActivityIndicator size="small" color="#999" />
          </LoaderWrapper>
        )}
        <Poster
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          contentFit="cover"
          transition={500}
          cachePolicy="disk"
          onLoadEnd={() => setIsImageLoading(false)}
        />
      </PosterContainer>

      <Content>
        <Title>{movie.title}</Title>
        <Subtitle>
          {movie.genres?.map(g => g.name).join(', ') || 'N/A'} |{' '}
          {movie.release_date?.split('-')[0] || 'Unknown'} | ⭐ {movie.vote_average.toFixed(1)}
        </Subtitle>
        <Description>{movie.overview}</Description>

        <WatchlistButton inWatchlist={inWatchlist} onPress={toggleWatchlist} />

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

        <MovieCastSection cast={cast} onSelect={setSelectedCast} />
        <RecommendationsSection recommendations={recommendations} />
      </Content>

      <CastModal
        visible={!!selectedCast}
        onClose={() => setSelectedCast(null)}
        cast={selectedCast}
      />
    </Container>
  );
}
