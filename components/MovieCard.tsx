// components/MovieCard.tsx
import {
  Card,
  Info,
  LoaderWrapper,
  Meta,
  Poster,
  PosterContainer,
  Title,
} from '@/theme/styles/movieCardStyles';
import { Movie } from '@/type/types';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';

type MovieCardProps = {
  movie: Movie;
  onPress?: () => void;
  style?: object;
};

function MovieCard({ movie, onPress, style }: MovieCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card onPress={onPress} disabled={!onPress} style={style} activeOpacity={0.8}>
      <PosterContainer>
        {isLoading && (
          <LoaderWrapper>
            <ActivityIndicator size="small" color="#999" />
          </LoaderWrapper>
        )}
        <Poster
          source={{ uri: movie.poster }}
          contentFit="cover"
          cachePolicy="disk"
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </PosterContainer>

      <Info>
        <Title numberOfLines={2}>{movie.title}</Title>
        <Meta>
          {movie.year ? `${movie.year}` : ''} {movie.genre ? `• ${movie.genre}` : ''}
        </Meta>
        {movie.rating !== undefined && movie.rating !== null && (
          <Meta>⭐ {movie.rating.toFixed(1)}</Meta>
        )}
      </Info>
    </Card>
  );
}

export default React.memo(MovieCard, (prevProps, nextProps) => {
  // Only re-render if these specific props change
  return (
    prevProps.movie.id === nextProps.movie.id &&
    prevProps.movie.title === nextProps.movie.title &&
    prevProps.movie.poster === nextProps.movie.poster &&
    prevProps.movie.rating === nextProps.movie.rating &&
    prevProps.onPress === nextProps.onPress &&
    prevProps.style === nextProps.style
  );
});
