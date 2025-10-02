// app/(tabs)/home/movie/[id].tsx
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  Container,
  Description,
  InfoLabel,
  InfoRow,
  InfoValue,
  LoadingContainer,
  Poster,
  Subtitle,
  TagBox,
  TagContainer,
  TagText,
  Title,
} from '../../../../theme/styles/movieDetailStyles';
import { getMovieDetails } from '../../../../utils/tmdb';

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
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const tags = ['Action', 'Drama', 'Thriller'];

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(Number(id));
        setMovie(data);
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
    <Container contentContainerStyle={{ paddingBottom: 24 }}>
      <Poster source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} />
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

      <InfoRow>
        <InfoLabel>🎬 Director</InfoLabel>
        <InfoValue>Unknown</InfoValue>
      </InfoRow>

      <TagContainer>
        {tags.map((tag, index) => (
          <TagBox key={index}>
            <TagText>{tag}</TagText>
          </TagBox>
        ))}
      </TagContainer>
    </Container>
  );
}
