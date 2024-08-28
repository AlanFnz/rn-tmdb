import React from 'react';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { Movie, useGetMovieDetailsQuery } from '../../store/services/tmdbApi';
import { Text } from 'react-native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native-gesture-handler';
import WishListButton from '../WishListScreen/components/WishListButton';
import Poster from '../../components/Poster';

interface RouteParams {
  movieId: number;
}

export default function FilmDetailScreen() {
  const route = useRoute();
  const { movieId } = route.params as RouteParams;

  const {
    data: movieDetails,
    error,
    isLoading,
  } = useGetMovieDetailsQuery(movieId);

  if (isLoading) return <Text>Loading...</Text>;
  if (error || !movieDetails) return <Text>Failed to load movie details.</Text>;

  return (
    <Container>
      <TopContainer>
        <FilmDetailPoster posterPath={movieDetails.poster_path} sizeIndex={4} />
        <DescriptionContainer>
          <DescriptionTextContainer>
            <Description>{movieDetails.overview}</Description>
          </DescriptionTextContainer>
          <WishListButton movie={movieDetails as Movie} />
        </DescriptionContainer>
      </TopContainer>
      <AdditionalInfo>
        <InfoText>Release Date: {movieDetails.release_date}</InfoText>
        <InfoText>Rating: {movieDetails.vote_average}</InfoText>
      </AdditionalInfo>
    </Container>
  );
}

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 5,
  },
}))`
  flex: 1;
`;

const TopContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  height: ${responsiveScreenHeight(38)}px;
`;

const FilmDetailPoster = styled(Poster)`
  height: 92%;
  aspect-ratio: 0.7;
  border-radius: 10px;
  background-color: red;
`;

const DescriptionContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 10px;
`;

const DescriptionTextContainer = styled(ScrollView)`
  flex: 1;
  flex-direction: column;
  padding: 2px 8px 2px 0;
  margin-bottom: 5px;
  max-height: ${responsiveScreenHeight(30)}px;
`;

const Description = styled.Text`
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 22px;
`;

const AdditionalInfo = styled.View`
  margin-top: 20px;
  padding: 10px;
`;

const InfoText = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
`;
