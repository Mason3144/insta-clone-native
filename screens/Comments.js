import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  RefreshControl,
  View,
} from "react-native";
import { COMMENT_FRAGMENT } from "../fragments";
import CommentComponent from "../components/CommentComponent";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WriteComment from "../components/WriteComment";

const SEEPHOTOCOMMENTS_QUERY = gql`
  query SeePhotoComments($photoId: Int!, $offset: Int!) {
    seePhotoComments(photoId: $photoId, offset: $offset) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export default Comments = ({ route }) => {
  const { data, loading, fetchMore, refetch } = useQuery(
    SEEPHOTOCOMMENTS_QUERY,
    {
      variables: {
        photoId: route?.params?.photoId,
        offset: 0,
      },
    }
  );
  // refetch();
  return (
    <View
      style={{
        backgroundColor: "black",
        // flex: 1,
        padding: 20,
        height: "100%",
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View>
          <KeyboardAvoidingView
            style={{ width: "100%", height: "100%" }}
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
          >
            <FlatList
              onEndReachedThreshold={0.2}
              onEndReached={() =>
                fetchMore({
                  variables: {
                    offset: data?.seePhotoComments?.length,
                  },
                })
              }
              showsVerticalScrollIndicator={false}
              data={data?.seePhotoComments}
              keyExtractor={(comment) => "" + comment.id}
              renderItem={({ item: comment }) => (
                <CommentComponent {...comment} />
              )}
            />

            <WriteComment photoId={route?.params?.photoId} />
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};
