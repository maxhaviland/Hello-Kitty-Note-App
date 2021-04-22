import styled from "styled-components/native";

interface BoxProps {
  backgroundColor: string;
}

export const Box = styled.View<BoxProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 30px;
  height: 300px;
  width: 90%;
  margin: 10px 5px 10px 5px;
  border: solid 2px;
  border-radius: 2px;
  border-color: #ff7b7b;
  border-style: dotted;
`;

export const NoteText = styled.Text`
  color: #700000;
  font-size: 17px;
  z-index: 8;
`;
