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
  buttonColor?: string;
  borderRadius?: string;
}

export default function WishListButton({
  movie,
  buttonColor = '#3b5998',
  borderRadius = '5px',
}: WishListButtonProps) {
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
    <Button
      onPress={handleToggleWishList}
      buttonColor={buttonColor}
      borderRadius={borderRadius}>
      <ButtonText isInWishList={isInWishList}>
        {isInWishList ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity<{
  buttonColor: string;
  borderRadius: string;
}>`
  background-color: ${props => props.buttonColor};
  padding: 10px;
  border-radius: ${props => props.borderRadius};
  align-items: center;
  justify-content: center;
  height: 48px;
`;

const ButtonText = styled.Text<{ isInWishList: boolean }>`
  color: white;
  font-size: ${props => (props.isInWishList ? '12px' : '16px')};
  font-weight: bold;
  text-align: center;
`;
