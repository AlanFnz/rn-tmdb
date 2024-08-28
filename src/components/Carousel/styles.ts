import { responsiveScreenHeight } from 'react-native-responsive-dimensions';
import styled from 'styled-components/native';
import colors from '../../theme/colors';
import Poster from '../Poster';

const Container = styled.View`
  margin-bottom: 4px;
  padding-horizontal: 5px;
  height: ${responsiveScreenHeight(26)}px;
`;

const GenreName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.secondary};
  margin-bottom: 6px;
  padding-left: 4px;
`;

const MovieCard = styled.TouchableOpacity`
  margin-right: 6px;
  align-items: center;
`;

const CarouselPoster = styled(Poster)`
  height: ${responsiveScreenHeight(16)}px;
  aspect-ratio: 0.6;
  border-radius: 8px;
`;

const MovieTitle = styled.Text`
  text-align: center;
  color: ${colors.secondary};
  width: 100px;
  margin-top: 5px;
`;

export { Container, GenreName, MovieCard, CarouselPoster, MovieTitle };
