import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import FeedPhoto from "../components/FeedPhoto";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
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

  const renderPhoto = ({ item: photo }) => {
    return <FeedPhoto {...photo}></FeedPhoto>;
  };

  const refresh = async () => {
    setRefreshing(true);
    await refetch().finally(() => setRefreshing(false));
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.0}
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
