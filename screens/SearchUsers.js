import { gql, useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components";
import DismissKeyboard from "../components/DismissKeyboard";

const SEARCH_USERS = gql`
  query SearchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      username
      id
      avatar
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

export default function SearchUsers({ route }) {
  const navigation = useNavigation();
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const [startQueryFn, { loading, data, called, refetch }] =
    useLazyQuery(SEARCH_USERS);

  useEffect(() => {
    if (route?.params?.keyword) {
      console.log(route?.params?.keyword);
      startQueryFn({
        variables: {
          keyword: route?.params?.keyword,
        },
      });
    }
  }, [route]);
  const renderItem = ({ item: user }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Profile", { id: user.id, username: user.username })
      }
      style={{
        width: width / numColumns,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: user.avatar }}
        style={{ width: 70, height: 70, borderRadius: "50%" }}
      />
      <Text style={{ color: "white" }}>{user.username}</Text>
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
            <MessageText>Search by username.</MessageText>
          </MessageContainer>
        ) : null}
        {(data?.searchUsers === undefined && called && !loading) ||
        (data?.searchUsers !== undefined && data?.searchUsers?.length === 0) ? (
          <MessageContainer>
            <MessageText>Could not find anything.</MessageText>
          </MessageContainer>
        ) : null}

        {data?.searchUsers !== undefined && data?.searchUsers?.length !== 0 ? (
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
            data={data?.searchUsers}
            keyExtractor={(photo) => "" + photo.id}
            renderItem={renderItem}
          />
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
