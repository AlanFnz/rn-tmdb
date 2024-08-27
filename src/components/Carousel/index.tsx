import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetMoviesByGenreQuery } from '../../store/services/tmdbApi';
import { useAppNavigation } from '../../navigation/AppNavigator';

interface CarouselProps {
  genreId: number;
  genreName: string;
}

export default function Carousel({ genreId, genreName }: CarouselProps) {
  const navigation = useAppNavigation();

  const { data: movies, error, isLoading } = useGetMoviesByGenreQuery(genreId);

  const handleMovieClick = (movieId: number) => {
    navigation.navigate('MovieDetailsScreen', { movieId });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading movies.</Text>;

  return (
    <Container>
      <GenreName>{genreName}</GenreName>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies &&
          movies.map(movie => (
            <MovieCard
              key={movie.id}
              onPress={() => handleMovieClick(movie.id)}>
              <Poster
                source={{
                  uri: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`, // FIXME: would be nice to not have to hardcode the first part of the url
                }}
              />
              <MovieTitle numberOfLines={2}>{movie.title}</MovieTitle>
            </MovieCard>
          ))}
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  margin-vertical: 8px;
  padding-horizontal: 5px;
`;

const GenreName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const MovieCard = styled.TouchableOpacity`
  margin-right: 10px;
  align-items: center;
`;

const Poster = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 8px;
`;

const MovieTitle = styled.Text`
  text-align: center;
  width: 100px;
  margin-top: 5px;
`;
