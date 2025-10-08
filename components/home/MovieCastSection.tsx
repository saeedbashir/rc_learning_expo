// components/home/MovieCastSection.tsx
import { CastImage, CastItem, CastName, SectionLabel } from '@/theme/styles/movieDetailStyles';
import React from 'react';
import { FlatList } from 'react-native';

type Props = {
  cast: any[];
  onSelect: (castMember: any) => void;
};

const MovieCastSection: React.FC<Props> = ({ cast, onSelect }) => {
  if (!cast?.length) return null;

  return (
    <>
      <SectionLabel>👥 Cast</SectionLabel>
      <FlatList
        horizontal
        data={cast.slice(0, 10)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CastItem onPress={() => onSelect(item)}>
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
  );
};

export default MovieCastSection;
