import { gql, useMutation } from "@apollo/client";
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
  const { data } = useMe();
  const { setValue, register, handleSubmit } = useForm();
  useEffect(() => {
    register("payload", {
      required: true,
    });
  }, []);
  const onValid = ({ payload }) => {
    if (!loading) {
      createCommentMutation({
        variables: {
          photoId,
          payload,
        },
      });
    }
  };
  const [value, SetValue] = useState("");
  const onCompleted = ({ createComment }) => {
    const { ok } = createComment;
    if (ok) {
      SetValue("");
    }
  };

  const [createCommentMutation, { loading }] = useMutation(
    CREATECOMMENT_MUTATION,
    {
      onCompleted,
      refetchQueries: [{ query: SEEPHOTOCOMMENTS_QUERY }, "seePhotoComments"],
    }
  );

  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <Avatar resizeMode="cover" source={{ uri: data?.me?.avatar }} />
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
