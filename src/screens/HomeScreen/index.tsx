import React from 'react';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { useGetGenresQuery } from '../../store/services/tmdbApi';
import Carousel from '../../components/Carousel';

export default function HomeScreen() {
  const { data: genres, error, isLoading } = useGetGenresQuery();
  const insets = useSafeAreaInsets();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Failed to load genres.</Text>;

  // arbitrarily extracting three genres to meet the challenge requirement
  const selectedGenres = genres && genres.genres.slice(0, 3);

  return (
    <Container insets={insets}>
      {selectedGenres && selectedGenres.length > 0 ? (
        selectedGenres.map(genre => (
          <Carousel key={genre.id} genreId={genre.id} genreName={genre.name} />
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
