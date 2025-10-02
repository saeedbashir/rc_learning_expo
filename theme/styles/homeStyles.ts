// app/(tabs)/home/_styles.ts
import styled from 'styled-components/native';
import MovieCard from '../../components/MovieCard';
import colors from '../colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
  padding: 16px;
  justifycontent: center;
  alignitems: center;
`;

export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-vertical: 12px;
  margin-left: 8px;
`;

export const TouchableWrapper = styled.TouchableOpacity`
  margin: 4px;
`;

// For the horizontal trending items
export const TrendingCardWrapper = styled.View`
  width: 160px;
  margin-horizontal: 8px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Loader = styled.ActivityIndicator.attrs({
  size: 'large',
  color: 'dodgerblue',
})``;

export const FooterLoader = styled.ActivityIndicator.attrs({
  size: 'small',
  color: 'dodgerblue',
})`
  margin: 16px;
`;

export const ColumnWrapper = styled.View`
  padding-horizontal: 8px;
`;

export const ContentContainer = styled.View`
  padding-bottom: 16px;
`;

export const ScrollWrapper = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const TrendingCard = styled(MovieCard)`
  width: 160px;
  margin-horizontal: 8px;
`;

export const PopularCard = styled(MovieCard)`
  flex: 1;
  margin: 8px;
`;
