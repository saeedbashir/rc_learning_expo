// app/(tabs)/home/movie/_styles.ts
import styled from 'styled-components/native';
import colors from '../colors';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.background};
  padding: 16px;
`;

export const LoadingContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Poster = styled.Image`
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.text};
  margin-vertical: 10px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${colors.muted};
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${colors.text};
  margin-bottom: 16px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

export const InfoLabel = styled.Text`
  font-size: 16px;
  color: ${colors.text};
  font-weight: 500;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  color: ${colors.muted};
`;

export const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 20px;
`;

export const TagBox = styled.View`
  background-color: ${colors.muted}22;
  padding: 6px 10px;
  border-radius: 12px;
  margin: 4px;
  flex-grow: 1;
  align-items: stretch;
`;

export const TagText = styled.Text`
  font-size: 12px;
  color: ${colors.text};
  text-align: center;
`;
