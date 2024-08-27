import React from 'react';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { useGetMovieDetailsQuery } from '../../store/services/tmdbApi';
import { Text } from 'react-native';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native-gesture-handler';
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
        <Poster
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`,
          }}
          resizeMode="cover"
        />
        <DescriptionContainer>
          <DescriptionTextContainer>
            <Description>{movieDetails.overview}</Description>
          </DescriptionTextContainer>
          <AddButton onPress={() => addToWishList(movieDetails.id)}>
            <ButtonText>Add to Wish List</ButtonText>
          </AddButton>
        </DescriptionContainer>
      </TopContainer>

      <AdditionalInfo>
        <InfoText>Release Date: {movieDetails.release_date}</InfoText>
        <InfoText>Rating: {movieDetails.vote_average}</InfoText>
      </AdditionalInfo>
    </Container>
  );
}

const addToWishList = (movieId: number) => {
  console.log(`Movie with ID: ${movieId} added to the wish list.`);
};

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

const Poster = styled.Image`
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

const AddButton = styled.TouchableOpacity`
  background-color: #3b5998;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
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
