import React from 'react';
import { ImageBackground, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Movie, useGetMovieDetailsQuery } from '../../store/services/tmdbApi';
import { selectImageConfig } from '../../store/slices/configurationSlice';
import WishListButton from '../WishListScreen/components/WishListButton';
import MessageDisplay from '../../components/MessageDisplay';
import LoadingDisplay from '../../components/LoadingDisplay';
import {
  AdditionalInfo,
  backdropImageStyles,
  CompaniesContainer,
  CompanyLogo,
  Container,
  Description,
  DescriptionContainer,
  DescriptionTextContainer,
  FilmDetailPoster,
  getStylesByIndex,
  InfoText,
  LinkText,
  SectionTitle,
  TaglineText,
  TopContainer,
} from './styles';

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

  if (isLoading) return <LoadingDisplay />;
  if (error || !movieDetails || !imageConfig)
    return (
      <MessageDisplay
        message={'Failed to load movie details.'}
        testID="message-display"
      />
    );

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
