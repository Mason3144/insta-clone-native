import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { COMMENT_FRAGMENT } from "../fragments";
import CommentComponent from "../components/CommentComponent";
import styled from "styled-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WriteComment from "../components/WriteComment";

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

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        padding: 20,
      }}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 160 : 0}
        >
          <FlatList
            data={data?.seePhotoComments}
            keyExtractor={(comment) => "" + comment.id}
            renderItem={({ item: comment }) => (
              <CommentComponent {...comment} />
            )}
          />
          <WriteComment photoId={route?.params?.photoId} />
        </KeyboardAvoidingView>
      )}
    </View>
  );
};
