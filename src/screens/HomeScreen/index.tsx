import React from 'react';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { useGetGenresQuery } from '../../store/services/tmdbApi';
import Carousel from '../../components/Carousel';
import MessageDisplay from '../../components/MessageDisplay';
import LoadingDisplay from '../../components/LoadingDisplay';

export default function HomeScreen() {
  const { data: genres, error, isLoading } = useGetGenresQuery();
  const insets = useSafeAreaInsets();

  if (isLoading) return <LoadingDisplay />;
  if (error) return <MessageDisplay message={'Failed to load movies.'} />;

  // arbitrarily extracting three genres to meet the challenge requirement
  const selectedGenres = genres?.genres?.slice(0, 3) || [];

  return (
    <Container insets={insets}>
      {selectedGenres && selectedGenres.length > 0 ? (
        selectedGenres.map((genre, index) => (
          <Carousel
            key={genre.id}
            genreId={genre.id}
            genreName={genre.name}
            genreIndex={index}
          />
        ))
      ) : (
        <NoMoviesText>No movies in this genre.</NoMoviesText>
      )}
    </Container>
  );
}

const Container = styled.View<{
  insets: { top: number; bottom: number; left: number; right: number };
}>`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-left: ${props => props.insets.left}px;
  padding-right: ${props => props.insets.right}px;
`;

const NoMoviesText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-vertical: 10px;
`;
