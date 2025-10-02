//theme/styles/searchStyles.ts
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';
import colors from '../colors';

export const SectionHeader = styled.View`
  background-color: ${colors.background};
  padding: 8px 0;
`;

export const ContentPaddingHorizontal = {
  paddingHorizontal: 8,
};

export const ContentPaddingBottom = {
  paddingBottom: 16,
};

export const Loader = styled(ActivityIndicator).attrs({
  size: 'large',
  color: colors.primary || 'dodgerblue',
})``;

export const LoadMoreWrapper = styled(View)`
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 160px;
  height: 220px;
`;

export const LoadMoreLoader = styled(ActivityIndicator).attrs({
  size: 'small',
  color: colors.primary || 'dodgerblue',
})``;
