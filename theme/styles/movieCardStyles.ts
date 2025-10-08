import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity`
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

export const PosterContainer = styled.View`
  width: 100%;
  height: 220px;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
`;

export const LoaderWrapper = styled.View`
  position: absolute;
  z-index: 10;
`;

export const Poster = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Info = styled.View`
  padding: 8px;
`;

export const Title = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: #222;
  margin-bottom: 4px;
`;

export const Meta = styled.Text`
  font-size: 12px;
  color: #666;
`;
