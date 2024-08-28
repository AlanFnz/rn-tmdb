import { Platform } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../theme/colors';

const HeaderContainer = styled.View`
  height: ${Platform.OS === 'android' ? '65px' : '100px'};
  background-color: ${colors.background};
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
  flex-direction: column;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.primary};
`;

const HeaderText = styled.Text`
  font-size: 24px;
  color: ${colors.secondary};
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
  bottom: 10px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background-color: ${colors.primary};
  display: flex;
  align-items: center;
`;

const BackButtonText = styled.Text`
  font-size: 22px;
  color: ${colors.background};
`;

export { HeaderContainer, HeaderText, BackButton, BackButtonText };
