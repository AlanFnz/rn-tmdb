import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { Movie } from '../../store/services/tmdbApi';
import { removeFromWishList } from '../../store/slices/wishlistSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Poster from '../../components/Poster';
import colors from '../../theme/colors';
import MessageDisplay from '../../components/MessageDisplay';
import {
  MovieContainer,
  MovieInfo,
  MovieTitle,
  RemoveButton,
  RemoveButtonText,
  WishListPoster,
} from './styles';

export default function WishListScreen() {
  const dispatch = useAppDispatch();
  const wishList = useAppSelector(state => state.wishlist.items);
  const insets = useSafeAreaInsets();

  const handleRemove = (movieId: number) => {
    dispatch(removeFromWishList(movieId));
  };

  if (wishList.length === 0)
    return <MessageDisplay message={'Your wishlist is empty'} />;

  return (
    <View style={{ paddingTop: insets.top }}>
      <ScrollView>
        {wishList.map((movie: Movie) => (
          <MovieContainer key={movie.id}>
            <WishListPoster posterPath={movie.poster_path} sizeIndex={1} />
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <RemoveButton onPress={() => handleRemove(movie.id)}>
                <RemoveButtonText>Remove</RemoveButtonText>
              </RemoveButton>
            </MovieInfo>
          </MovieContainer>
        ))}
      </ScrollView>
    </View>
  );
}
