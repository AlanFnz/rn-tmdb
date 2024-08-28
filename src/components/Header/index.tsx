import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  BackButton,
  BackButtonText,
  HeaderContainer,
  HeaderText,
} from './styles';

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
      <HeaderText>FilmApp Challenge</HeaderText>
    </HeaderContainer>
  );
}
