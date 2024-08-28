import React from 'react';
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  Linking,
} from 'react-native';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import { Movie, useGetMovieDetailsQuery } from '../../store/services/tmdbApi';
import { selectImageConfig } from '../../store/slices/configurationSlice';
import WishListButton from '../WishListScreen/components/WishListButton';
import Poster from '../../components/Poster';
import colors from '../../theme/colors';

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

  const companyLogos = movieDetails.production_companies.map(company => {
    if (company.logo_path) {
      return (
        <CompanyLogo
          resizeMode="contain"
          key={company.id}
          source={{
            uri: `${imageConfig.secure_base_url}${imageConfig.logo_sizes[1]}${company.logo_path}`,
          }}
        />
      );
    }
  });

  const spokenLanguages = movieDetails.spoken_languages.map(lang => (
    <InfoText key={lang.iso_639_1}>{lang.english_name}</InfoText>
  ));

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
            <Description fontFamily={dynamicStyles.fontFamily}>
              {movieDetails.overview}
            </Description>
          </DescriptionTextContainer>
          <WishListButton
            movie={movieDetails as Movie}
            buttonColor={dynamicStyles.buttonColor}
            borderRadius={dynamicStyles.borderRadius}
          />
        </DescriptionContainer>
      </TopContainer>

      <AdditionalInfo>
        <TaglineText fontFamily={dynamicStyles.fontFamily}>
          {movieDetails.tagline}
        </TaglineText>
        <InfoText>Release Date: {movieDetails.release_date}</InfoText>
        <InfoText>Rating: {movieDetails.vote_average}</InfoText>
        {movieDetails.budget > 0 && (
          <InfoText>Budget: {movieDetails.budget}</InfoText>
        )}
        <InfoText>Spoken Languages: {spokenLanguages}</InfoText>
        {movieDetails.homepage && (
          <LinkText onPress={() => Linking.openURL(movieDetails.homepage)}>
            Visit Homepage
          </LinkText>
        )}

        <SectionTitle>Production Companies</SectionTitle>
        <CompaniesContainer>{companyLogos}</CompaniesContainer>
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
  margin-bottom: 10px;
  height: ${responsiveScreenHeight(38)}px;
  position: relative;
`;

const FilmDetailPoster = styled(Poster)`
  height: 92%;
  aspect-ratio: 0.7;
  border-radius: 10px;
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
  padding: 10px;
`;

const TaglineText = styled.Text<{ fontFamily: string }>`
  font-family: ${props => props.fontFamily};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
  color: #333;
`;

const InfoText = styled.Text`
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
`;

const LinkText = styled.Text`
  font-size: 14px;
  color: #1e90ff;
  text-decoration-line: underline;
  margin-bottom: 5px;
`;

const SectionTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const CompaniesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

const CompanyLogo = styled.Image`
  width: 80px;
  height: 40px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const CompanyName = styled.Text`
  font-size: 14px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const getStylesByIndex = (index: number) => {
  const styles = [
    {
      fontFamily: 'Kanit-Regular',
      buttonColor: colors.primary,
      borderRadius: '5px',
    },
    {
      fontFamily: 'Montserrat-Regular',
      buttonColor: colors.variation,
      borderRadius: '10px',
    },
    {
      fontFamily: 'Roboto-Regular',
      buttonColor: colors.accent,
      borderRadius: '15px',
    },
  ];

  return styles[index % styles.length];
};
