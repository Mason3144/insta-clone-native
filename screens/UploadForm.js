import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import DismissKeyboard from "../components/DismissKeyboard";

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

export default function UploadForm({ route }) {
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route?.params?.file }} />
        <CaptionContainer>
          <Caption
            placeholder="Write a caption"
            placeholderTextColor="rgba(0,0,0,0.3)"
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
