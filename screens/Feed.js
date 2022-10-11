import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import FeedPhoto from "../components/FeedPhoto";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";
import { Ionicons } from "@expo/vector-icons";
const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      commentNumber
      user {
        id
        username
        avatar
      }
      caption
      createdAt
      isMine
      ...PhotoFragment
      comments {
        ...CommentFragment
      }
    }
  }
  ${COMMENT_FRAGMENT}
  ${PHOTO_FRAGMENT}
`;

export default FEED = ({ navigation }) => {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  refetch();
  const renderPhoto = ({ item: photo }) => {
    return <FeedPhoto {...photo}></FeedPhoto>;
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch().finally(() => setRefreshing(false));
  };
  const [refreshing, setRefreshing] = useState(false);
  const MessagesButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate("MessagesNav")}>
      <Ionicons name="paper-plane" color="white" size={24} />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({ headerRight: MessagesButton });
  }, []);
  return (
    <ScreenLayout loading={loading}>
      <StatusBar barStyle={"light-content"} />
      <FlatList
        onEndReachedThreshold={0.2}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="white"
            color="white"
          />
        }
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(photo) => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  );
};
