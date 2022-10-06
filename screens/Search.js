import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_PHOTOS = gql`
  query SearchPhoto($keyword: String!) {
    searchPhoto(keyword: $keyword) {
      id
      file
    }
  }
`;
const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 10px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput``;

export default Search = ({ navigation }) => {
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <TextInput
      style={{ backgroundColor: "white" }}
      placeholderTextColor="black"
      placeholder="Search Photos"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({ headerTitle: SearchBox });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword.</MessageText>
          </MessageContainer>
        ) : null}
        {(data?.searchPhoto === undefined && called && !loading) ||
        (data?.searchPhoto !== undefined && data?.searchPhoto?.length === 0) ? (
          <MessageContainer>
            <MessageText>Could not find anything.</MessageText>
          </MessageContainer>
        ) : null}
      </View>
    </DismissKeyboard>
  );
};
