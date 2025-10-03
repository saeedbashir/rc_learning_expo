import styled from 'styled-components/native';
import colors from '../colors';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  background-color: ${colors.background};
`;

export const Content = styled.View`
  padding: 0 16px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Poster = styled.Image`
  width: 100%;
  aspect-ratio: 2 / 3;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${colors.text};
  margin-top: 12px;
  margin-bottom: 6px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${colors.muted};
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${colors.text};
  margin-bottom: 16px;
  line-height: 20px;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

export const InfoLabel = styled.Text`
  font-size: 16px;
  color: ${colors.text};
  font-weight: 500;
  margin-top: 12px;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  color: ${colors.muted};
`;

export const SectionLabel = styled(InfoLabel)`
  margin-top: 20px;
  margin-bottom: 8px;
`;

export const CastItem = styled.TouchableOpacity`
  margin-right: 12px;
  align-items: center;
  width: 80px;
`;

export const CastImage = styled.Image`
  width: 80px;
  height: 120px;
  border-radius: 8px;
  margin-bottom: 4px;
`;

export const CastName = styled.Text`
  font-size: 12px;
  color: ${colors.text};
  text-align: center;
`;

export const MovieCard = styled.TouchableOpacity`
  margin-right: 12px;
`;

export const MovieImage = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 8px;
`;

export const TagBox = styled.View`
  background-color: ${colors.muted}22;
  padding: 6px 10px;
  border-radius: 12px;
  margin: 4px;
  flex-grow: 1;
  align-items: stretch;
`;
