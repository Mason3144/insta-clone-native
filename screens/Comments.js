import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT } from "../fragments";

import { useNavigation } from "@react-navigation/native";
import deleteComment from "../components/DeleteComment";
import DeleteComment from "../components/DeleteComment";

const SEEPHOTOCOMMENTS_QUERY = gql`
  query seePhotoComments($photoId: Int!) {
    seePhotoComments(photoId: $photoId) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export default Comments = ({ route }) => {
  const { data, loading, refetch } = useQuery(SEEPHOTOCOMMENTS_QUERY, {
    variables: {
      photoId: route?.params?.photoId,
    },
    skip: !route?.params?.photoId,
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch().finally(() => setRefreshing(false));
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <View style={{ backgroundColor: "black", flex: 1, padding: 20 }}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor="white"
              color="white"
            />
          }
          data={data?.seePhotoComments}
          keyExtractor={(comment) => "" + comment.id}
          renderItem={({ item: comment }) => <DeleteComment {...comment} />}
        />
      )}
    </View>
  );
};
