import React from 'react';
import styled from 'styled-components/native';
import { useAppSelector } from '../../store';

interface PosterProps {
  posterPath: string;
  sizeIndex: number;
  style?: object;
}

export default function Poster({ posterPath, sizeIndex, style }: PosterProps) {
  const imageConfig = useAppSelector(state => state.config.images);

  if (
    !imageConfig ||
    !imageConfig.secure_base_url ||
    !imageConfig.poster_sizes[sizeIndex]
  ) {
    return null;
  }

  const selectedSize = imageConfig.poster_sizes[sizeIndex];

  const imageUrl = `${imageConfig.secure_base_url}${selectedSize}/${posterPath}`;

  return <PosterImage source={{ uri: imageUrl }} style={style} />;
}

const PosterImage = styled.Image`
  border-radius: 8px;
`;
