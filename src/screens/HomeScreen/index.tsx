import React from 'react';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { useGetGenresQuery } from '../../store/services/tmdbApi';
import Carousel from '../../components/Carousel';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const { data: genres, error, isLoading } = useGetGenresQuery();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Failed to load genres.</Text>;

  // arbitrarily extracting three genres in order to meet the challenge requirement
  const selectedGenres = genres && genres.genres.slice(0, 3);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Container>
          {selectedGenres && selectedGenres.length > 0 ? (
            selectedGenres.map(genre => (
              <Carousel
                key={genre.id}
                genreId={genre.id}
                genreName={genre.name}
              />
            ))
          ) : (
            <NoMoviesText>No movies in this genre.</NoMoviesText>
          )}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const NoMoviesText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-vertical: 10px;
`;
