import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;
const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

export default function SelectPhoto() {
  return (
    <Container>
      <Top />
      <Bottom />
    </Container>
  );
}
