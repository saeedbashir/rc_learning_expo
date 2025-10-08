// components/home/MovieRecommendationsSection.tsx
import { MovieCard, MovieImage, SectionLabel } from '@/theme/styles/movieDetailStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';

type Props = {
  recommendations: any[];
};

const MovieRecommendationsSection: React.FC<Props> = ({ recommendations }) => {
  const router = useRouter();

  if (!recommendations?.length) return null;

  return (
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
  );
};

export default MovieRecommendationsSection;
