// components/search/SearchSectionsList.tsx
import { ContentPaddingBottom } from '@/theme/styles/searchStyles';
import { SectionData } from '@/type/types';
import React from 'react';
import { SectionList } from 'react-native';
import SearchGenreSection from './SearchGenreSection';

interface Props {
  sections: SectionData[];
  loadMoreMovies: (genreId: number) => void;
}

const SearchSectionsList: React.FC<Props> = ({ sections, loadMoreMovies }) => (
  <SectionList
    sections={sections}
    keyExtractor={(item, index) => `${item.id}-${index}`}
    renderItem={() => null}
    renderSectionFooter={({ section }) => (
      <SearchGenreSection section={section} loadMoreMovies={loadMoreMovies} />
    )}
    contentContainerStyle={ContentPaddingBottom}
    removeClippedSubviews
    initialNumToRender={3}
    maxToRenderPerBatch={5}
  />
);

export default SearchSectionsList;
