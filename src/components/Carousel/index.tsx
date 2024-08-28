import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetMoviesByGenreQuery } from '../../store/services/tmdbApi';
import { useAppNavigation } from '../../navigation/AppNavigator';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import Poster from '../Poster';

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
              <CarouselPoster posterPath={movie.poster_path} sizeIndex={1} />
              <MovieTitle numberOfLines={2}>{movie.title}</MovieTitle>
            </MovieCard>
          ))}
      </ScrollView>
    </Container>
  );
}

const Container = styled.View`
  margin-bottom: 4px;
  padding-horizontal: 5px;
  height: ${responsiveScreenHeight(26)}px;
`;

const GenreName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 6px;
  padding-left: 4px;
`;

const MovieCard = styled.TouchableOpacity`
  margin-right: 6px;
  align-items: center;
`;

const CarouselPoster = styled(Poster)`
  height: ${responsiveScreenHeight(16)}px;
  aspect-ratio: 0.6;
  border-radius: 8px;
`;

const MovieTitle = styled.Text`
  text-align: center;
  width: 100px;
  margin-top: 5px;
`;
