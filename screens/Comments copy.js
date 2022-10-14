import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { COMMENT_FRAGMENT } from "../fragments";
import CommentComponent from "../components/CommentComponent";
import WriteComment from "../components/WriteComment";

const SEEPHOTOCOMMENTS_QUERY = gql`
  query seePhotoComments($photoId: Int!, $offset: Int!) {
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
  useEffect(() => {
    refetch();
  }, []);
  return (
    <View
      style={{
        backgroundColor: "black",
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
              showsVerticalScrollIndicator={false}
              data={data?.seePhotoComments}
              keyExtractor={(comment) => "" + comment.id}
              renderItem={({ item: comment }) => (
                <CommentComponent
                  {...comment}
                  photoId={route?.params?.photoId}
                />
              )}
            />

            <WriteComment photoId={route?.params?.photoId} />
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};
