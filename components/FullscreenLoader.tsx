// components/FullscreenLoader.tsx
import { RootState } from '@/redux/store';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

const FullscreenLoader = () => {
  const isLoading = useSelector((state: RootState) => state.global.isLoading);

  if (!isLoading) return null;

  return (
    <Overlay>
      <ActivityIndicator size="large" color="#fff" />
    </Overlay>
  );
};

export default FullscreenLoader;

// Styled Components
const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
