import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store';
import { Movie } from '../../store/services/tmdbApi';
import { removeFromWishList } from '../../store/slices/wishlistSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Poster from '../../components/Poster';
import colors from '../../theme/colors';

export default function WishListScreen() {
  const dispatch = useAppDispatch();
  const wishList = useAppSelector(state => state.wishlist.items);
  const insets = useSafeAreaInsets();

  const handleRemove = (movieId: number) => {
    dispatch(removeFromWishList(movieId));
  };

  if (wishList.length === 0) {
    return (
      <NoItemsContainer>
        <NoItemsText>Your wishlist is empty.</NoItemsText>
      </NoItemsContainer>
    );
  }

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

const MovieContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const WishListPoster = styled(Poster)`
  width: 80px;
  height: 120px;
  border-radius: 8px;
`;

const MovieInfo = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const MovieTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.secondary};
`;

const RemoveButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 10px;
  align-items: center;
`;

const RemoveButtonText = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const NoItemsContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoItemsText = styled.Text`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
`;
