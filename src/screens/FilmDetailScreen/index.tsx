import React from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { Movie, useGetMovieDetailsQuery } from '../../store/services/tmdbApi';
import { selectImageConfig } from '../../store/slices/configurationSlice';
import WishListButton from '../WishListScreen/components/WishListButton';
import Poster from '../../components/Poster';

interface RouteParams {
  movieId: number;
  genreIndex: number;
}

export default function FilmDetailScreen() {
  const route = useRoute();
  const { movieId, genreIndex } = route.params as RouteParams;

  const {
    data: movieDetails,
    error,
    isLoading,
  } = useGetMovieDetailsQuery(movieId);
  const imageConfig = useSelector(selectImageConfig);

  if (isLoading) return <Text>Loading...</Text>;
  if (error || !movieDetails || !imageConfig)
    return <Text>Failed to load movie details.</Text>;

  const backdropUrl = `${imageConfig.secure_base_url}${imageConfig.backdrop_sizes[2]}${movieDetails.backdrop_path}`;
  const dynamicStyles = getStylesByIndex(genreIndex);

  return (
    <Container>
      <ImageBackground
        source={{ uri: backdropUrl }}
        style={backdropImageStyles}
      />
      <TopContainer>
        <FilmDetailPoster posterPath={movieDetails.poster_path} sizeIndex={4} />
        <DescriptionContainer>
          <DescriptionTextContainer>
            <Description fontFamily={dynamicStyles.fontFamily} />
          </DescriptionTextContainer>
          <WishListButton
            movie={movieDetails as Movie}
            buttonColor={dynamicStyles.buttonColor}
            borderRadius={dynamicStyles.borderRadius}
          />
        </DescriptionContainer>
      </TopContainer>
      <AdditionalInfo>
        <InfoText>Release Date: {movieDetails.release_date}</InfoText>
        <InfoText>Rating: {movieDetails.vote_average}</InfoText>
      </AdditionalInfo>
    </Container>
  );
}

const backdropImageStyles = {
  opacity: 0.3,
  ...StyleSheet.absoluteFillObject,
  height: responsiveScreenHeight(38),
};

const Container = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 5,
  },
}))`
  flex: 1;
`;

const TopContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  height: ${responsiveScreenHeight(38)}px;
  position: relative;
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
  padding-horizontal: 8px;
  margin-bottom: 5px;
  max-height: ${responsiveScreenHeight(30)}px;
`;

const Description = styled.Text<{ fontFamily: string }>`
  font-size: 14px;
  font-family: ${props => props.fontFamily};
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

const getStylesByIndex = (index: number) => {
  const styles = [
    {
      fontFamily: 'Helvetica',
      buttonColor: '#ff6347',
      borderRadius: '5px',
    },
    {
      fontFamily: 'Arial',
      buttonColor: '#4682b4',
      borderRadius: '10px',
    },
    {
      fontFamily: 'Courier New',
      buttonColor: '#32cd32',
      borderRadius: '15px',
    },
  ];

  return styles[index % styles.length];
};
