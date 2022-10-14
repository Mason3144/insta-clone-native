import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import styled from "styled-components";
import { COMMENT_FRAGMENT } from "../fragments";
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
  query seePhotoComments($photoId: Int!) {
    seePhotoComments(photoId: $photoId) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;

export default function WriteComment({ photoId }) {
  const me = useMe();
  const client = useApolloClient();
  const navigation = useNavigation();
  const { setValue, register, handleSubmit, getValues } = useForm();
  const { payload } = getValues();
  useEffect(() => {
    register("payload", {
      required: true,
    });
  }, []);

  const onValid = async ({ payload }) => {
    if (!loading) {
      await createCommentMutation({
        variables: {
          photoId,
          payload,
        },
      });
    }
  };
  const [value, SetValue] = useState("");
  const onCompleted = async ({ createComment }) => {
    const { ok, id } = createComment;
    if (ok) {
      const { payload } = getValues();
      SetValue("");
      // const commentObj = {
      //   __typename: "Comment",
      //   createdAt: `${Date.now(new Date())}`,
      //   id,
      //   isMine: true,
      //   payload,
      //   updatedAt: `${Date.now(new Date())}`,
      //   user: {
      //     id: me.data.me.id,
      //     username: me.data.me.username,
      //     avatar: me.data.me.avatar,
      //   },
      // };
      // const commentFragment = client.cache.writeFragment({
      //   fragment: gql`
      //     fragment NewComment on Comment {
      //       createdAt
      //       id
      //       isMine
      //       payload
      //       updatedAt
      //       user {
      //         id
      //         username
      //         avatar
      //       }
      //     }
      //   `,
      //   data: commentObj,
      // });
      client.cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev + 1;
          },
          // comments(prev) {
          //   const existingComment = prev.find(
          //     (aComment) => aComment.__ref === commentFragment.__ref
          //   );
          //   if (existingComment) {
          //     return prev;
          //   }
          //   return [commentFragment, ...prev];
          // },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATECOMMENT_MUTATION,
    {
      onCompleted,
    }
  );

  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <Avatar resizeMode="cover" source={{ uri: me?.data?.me?.avatar }} />
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
  );
}
