import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderText>FilmApp</HeaderText>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  height: 100px;
  background-color: #3b5998;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
`;
