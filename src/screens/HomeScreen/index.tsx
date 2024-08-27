import React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';
import { useGetGenresQuery } from '../../store/services/tmdbApi';
import Carousel from '../../components/Carousel';

export default function HomeScreen() {
  const { data: genres, error, isLoading } = useGetGenresQuery();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Failed to load genres.</Text>;

  // arbitrarily extracting three genres in order to meet the challenge requirement
  const selectedGenres = genres && genres.genres.slice(0, 3);

  return (
    <View>
      {selectedGenres && selectedGenres.length > 0 ? (
        selectedGenres.map(genre => (
          <Carousel key={genre.id} genreId={genre.id} genreName={genre.name} />
        ))
      ) : (
        <StyledText>No genres available.</StyledText>
      )}
    </View>
  );
}

const StyledText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-vertical: 10px;
`;
