// components/MovieCard.tsx
import { Movie } from '@/type/types';
import React from 'react';
import styled from 'styled-components/native';

type MovieCardProps = {
  movie: Movie;
  onPress?: () => void;
  style?: object;
};

function MovieCard({ movie, onPress, style }: MovieCardProps) {
  return (
    <Card onPress={onPress} disabled={!onPress} style={style} activeOpacity={0.8}>
      <Poster source={{ uri: movie.poster }} resizeMode="cover" />
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

const Card = styled.TouchableOpacity`
  flex: 1;
  margin: 8px;
  border-radius: 12px;
  background-color: #fff;
  overflow: hidden;

  /* iOS shadow */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;

  /* Android elevation */
  elevation: 3;
`;

const Poster = styled.Image`
  width: 100%;
  height: 220px;
`;

const Info = styled.View`
  padding: 8px;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
`;

const Meta = styled.Text`
  font-size: 12px;
  color: #666;
`;
