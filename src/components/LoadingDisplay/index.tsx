import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Text } from 'react-native';
import colors from '../../theme/colors';

export const LoadingDisplay: React.FC = () => {
  return (
    <LoadingContainer testID="loading-display">
      <ActivityIndicator size="large" color={colors.primary} />
    </LoadingContainer>
  );
};

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default LoadingDisplay;
