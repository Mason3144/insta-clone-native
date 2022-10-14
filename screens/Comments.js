import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  View,
  TextInput,
} from "react-native";
import { useForm } from "react-hook-form";
import { COMMENT_FRAGMENT } from "../fragments";
import CommentComponent from "../components/CommentComponent";
import styled from "styled-components";
import useMe from "../hooks/useMe";
const Avatar = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const CREATECOMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
    }
  }
`;

const SEEPHOTOCOMMENTS_QUERY = gql`
  query seePhotoComments($photoId: Int!, $offset: Int!) {
    seePhotoComments(photoId: $photoId, offset: $offset) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export default Comments = ({ route }) => {
  const me = useMe();
  const client = useApolloClient();
  const { setValue, register, handleSubmit, getValues } = useForm();
  useEffect(() => {
    register("payload", {
      required: true,
    });
  }, []);

  const onValid = async ({ payload }) => {
    if (!loading) {
      await createCommentMutation({
        variables: {
          photoId: route?.params?.photoId,
          payload,
        },
      });
    }
  };
  const [value, SetValue] = useState("");
  const onCompleted = async ({ createComment }) => {
    const { ok } = createComment;
    if (ok) {
      refetch();
      SetValue("");

      client.cache.modify({
        id: `Photo:${route?.params?.photoId}`,
        fields: {
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };

  const { data, loading, refetch, fetchMore } = useQuery(
    SEEPHOTOCOMMENTS_QUERY,
    {
      variables: {
        photoId: route?.params?.photoId,
        offset: 0,
      },
    }
  );
  const [createCommentMutation] = useMutation(CREATECOMMENT_MUTATION, {
    onCompleted,
  });
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
              onEndReachedThreshold={0}
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
                <CommentComponent
                  {...comment}
                  photoId={route?.params?.photoId}
                />
              )}
            />

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Avatar
                resizeMode="cover"
                source={{ uri: me?.data?.me?.avatar }}
              />
              <TextInput
                placeholder="Write a comment here"
                value={value}
                onChangeText={(text) => {
                  setValue("payload", text);
                  SetValue(text);
                }}
                returnKeyType="send"
                onSubmitEditing={handleSubmit(onValid)}
                style={{
                  backgroundColor: "white",
                  height: 40,
                  width: "80%",
                  padding: 10,
                  borderRadius: 10,
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
};
