import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useGetMoviesByGenreQuery } from '../../store/services/tmdbApi';
import { useAppNavigation } from '../../navigation/AppNavigator';
import MessageDisplay from '../MessageDisplay';
import LoadingDisplay from '../LoadingDisplay';
import {
  CarouselPoster,
  Container,
  GenreName,
  MovieCard,
  MovieTitle,
} from './styles';

interface CarouselProps {
  genreId: number;
  genreName: string;
  genreIndex: number;
}

export default function Carousel({
  genreId,
  genreName,
  genreIndex,
}: CarouselProps) {
  const navigation = useAppNavigation();

  const { data: movies, error, isLoading } = useGetMoviesByGenreQuery(genreId);

  const handleMovieClick = (movieId: number) => {
    navigation.navigate('MovieDetailsScreen', { movieId, genreIndex });
  };

  if (isLoading) return <LoadingDisplay />;
  if (error) return <MessageDisplay message={'Error loading movies.'} />;

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
