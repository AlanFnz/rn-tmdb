import React from 'react';
import styled from 'styled-components/native';
import colors from '../../theme/colors';

interface MessageDisplayProps {
  message: string;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({ message }) => {
  return (
    <Container>
      <MessageText>{message}</MessageText>
    </Container>
  );
};

export default MessageDisplay;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MessageText = styled.Text`
  text-align: center;
  font-size: 18px;
  color: ${colors.secondary};
`;
