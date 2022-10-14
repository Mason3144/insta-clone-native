import { gql, useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  useWindowDimensions,
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

export default function SearchPhotos({ route }) {
  const navigation = useNavigation();
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const [startQueryFn, { loading, data, called, refetch }] =
    useLazyQuery(SEARCH_PHOTOS);

  useEffect(() => {
    if (route?.params?.keyword) {
      startQueryFn({
        variables: {
          keyword: route?.params?.keyword,
        },
      });
    }
  }, [route]);
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Photo", { photoId: photo.id })}
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );
  const refresh = async () => {
    setRefreshing(true);
    await refetch().finally(() => setRefreshing(false));
  };
  const [refreshing, setRefreshing] = useState(false);
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refresh}
                tintColor="white"
                color="white"
              />
            }
            numColumns={numColumns}
            data={data?.searchPhoto}
            keyExtractor={(photo) => "" + photo.id}
            renderItem={renderItem}
          />
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
