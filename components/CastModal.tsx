// CastModal.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import colors from '../theme/colors';

type CastModalProps = {
  visible: boolean;
  onClose: () => void;
  cast: any | null;
};

export default function CastModal({ visible, onClose, cast }: CastModalProps) {
  if (!cast) return null;

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Overlay>
        <ModalContainer>
          <CloseButton onPress={onClose}>
            <Ionicons name="close" size={20} color={colors.text} />
          </CloseButton>

          <CastImage
            source={{
              uri: cast.profile_path
                ? `https://image.tmdb.org/t/p/w300${cast.profile_path}`
                : 'https://via.placeholder.com/300x400.png?text=No+Image',
            }}
          />

          <CastName>{cast.name}</CastName>
          <CastCharacter>{cast.character ? `as ${cast.character}` : ''}</CastCharacter>

          {cast.known_for_department && <CastInfo>🎭 {cast.known_for_department}</CastInfo>}
          {cast.popularity && <CastInfo>⭐ Popularity: {cast.popularity.toFixed(1)}</CastInfo>}
        </ModalContainer>
      </Overlay>
    </Modal>
  );
}

// Styled Components
const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const ModalContainer = styled.View`
  width: 90%;
  background-color: ${colors.background};
  border-radius: 20px;
  padding: 24px;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: -16px;
  right: -16px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${colors.background};
  justify-content: center;
  align-items: center;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
`;

const CastImage = styled.Image`
  width: 150px;
  height: 200px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const CastName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.text};
  margin-bottom: 4px;
  text-align: center;
`;

const CastCharacter = styled.Text`
  font-size: 16px;
  color: ${colors.muted};
  margin-bottom: 12px;
  text-align: center;
`;

const CastInfo = styled.Text`
  font-size: 14px;
  color: ${colors.text};
  margin-bottom: 8px;
  text-align: center;
`;
