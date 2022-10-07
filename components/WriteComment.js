import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, TextInput, View } from "react-native";
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
    const { ok } = createComment;
    if (ok) {
      await refetch();
      SetValue("");
    }
  };

  const { data, refetch } = useQuery(SEEPHOTOCOMMENTS_QUERY, {
    variables: {
      id: photoId,
    },
  });

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
