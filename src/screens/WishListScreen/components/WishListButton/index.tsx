import React from 'react';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  addToWishList,
  removeFromWishList,
} from '../../../../store/slices/wishlistSlice';
import { Movie } from '../../../../store/services/tmdbApi';

interface WishListButtonProps {
  movie: Movie;
}

export default function WishListButton({ movie }: WishListButtonProps) {
  const dispatch = useAppDispatch();
  const wishList = useAppSelector(state => state.wishlist.items);

  const isInWishList = wishList.some(
    wishListItem => wishListItem.id === movie.id,
  );

  const handleToggleWishList = () => {
    if (isInWishList) {
      dispatch(removeFromWishList(movie.id));
    } else {
      dispatch(addToWishList(movie));
    }
  };

  return (
    <Button onPress={handleToggleWishList}>
      <ButtonText isInWishList={isInWishList}>
        {isInWishList ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  background-color: #3b5998;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  height: 48px;
  justify-content: center;
`;

const ButtonText = styled.Text<{ isInWishList: boolean }>`
  color: white;
  font-size: ${props => (props.isInWishList ? '12px' : '16px')};
  font-weight: bold;
  text-align: center;
`;
