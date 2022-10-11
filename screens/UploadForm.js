import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_PHOTO } from "../fragments";
import { ReactNativeFile } from "apollo-upload-client";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

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

export default function UploadForm({ route, navigation }) {
  const [uploadPhotoMutation, { loading }] = useMutation(UPLOAD_PHOTO_MUTATION);
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <Text
        style={{
          color: colors.blue,
          fontSize: 17,
          fontWeight: "600",
        }}
      >
        Next
      </Text>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" />
  );
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("caption");
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const onValid = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route?.params?.file,
      name: "1.jpg",
      type: "image/jpeg",
    });
    uploadPhotoMutation({
      variables: {
        caption,
        file,
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route?.params?.file }} />
        <CaptionContainer>
          <Caption
            returnKeyType="done"
            placeholder="Write a caption"
            placeholderTextColor="rgba(0,0,0,0.3)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("caption", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
