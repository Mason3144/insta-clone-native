import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components";
import { colors } from "../colors";
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

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5};
  padding: 5px 10px;
  border-radius: 10px;
`;

export default Search = ({ navigation }) => {
  const numColumns = 4;
  const { width } = useWindowDimensions();
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
    <Input
      width={width}
      placeholderTextColor="rgba(0,0,0,0.8)"
      placeholder="Search Photos"
      selectionColor={`${colors.blue}`}
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
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );
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
        {data?.searchPhoto !== undefined && data?.searchPhoto?.length !== 0 ? (
          <FlatList
            numColumns={numColumns}
            data={data?.searchPhoto}
            keyExtractor={(photo) => "" + photo.id}
            renderItem={renderItem}
          />
        ) : null}
      </View>
    </DismissKeyboard>
  );
};
