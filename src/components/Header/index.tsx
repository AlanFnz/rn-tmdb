import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

export default function Header() {
  const navigation = useNavigation();
  const route = useRoute();

  const isFilmDetailScreen = route.name === 'MovieDetailsScreen';

  return (
    <HeaderContainer>
      {isFilmDetailScreen && (
        <BackButton onPress={() => navigation.goBack()}>
          <BackButtonText>{'<'}</BackButtonText>
        </BackButton>
      )}
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
  flex-direction: column;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  bottom: 12px;
`;

const BackButtonText = styled.Text`
  font-size: 22px;
  color: white;
`;
