import styled from 'styled-components/native';
import Poster from '../../components/Poster';
import colors from '../../theme/colors';

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

export {
  MovieContainer,
  WishListPoster,
  MovieInfo,
  MovieTitle,
  RemoveButton,
  RemoveButtonText,
};
