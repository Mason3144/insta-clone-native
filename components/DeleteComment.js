import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
//cashe and mutation
//keyboard dismiss, tab on outside
//textinput and keyboard dismiss, tab on outside
const Container = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;
const Action = styled.TouchableOpacity``;

const Avatar = styled.Image`
  margin-right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Username = styled.Text`
  color: white;
  font-weight: 700;
  margin-right: 10px;
`;
const Time = styled.Text`
  color: white;
  margin-right: 10px;
`;
const Payload = styled.Text`
  color: white;
`;

const DELETECOMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

export default function DeleteComment({
  id,
  user,
  payload,
  isMine,
  updatedAt,
}) {
  const navigation = useNavigation();
  const deleteComment = (cache, { data }) => {
    const {
      deleteComment: { ok },
    } = data;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
    }
  };

  const btn = () => {
    Alert.alert(
      "Delete",
      "Confirm to delete",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => deleteCommentMutation(),
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  };
  const timeCalculate = (createdAt) => {
    const currentTime = Date.parse(new Date());
    const gap = currentTime - createdAt;
    const day = Math.ceil(gap / (24 * 60 * 60 * 1000));
    const hour = Math.ceil(gap / (60 * 60 * 1000));
    if (hour >= 24) {
      return `${day}d ago`;
    } else {
      return `${hour}h ago`;
    }
  };

  const [deleteCommentMutation] = useMutation(DELETECOMMENT_MUTATION, {
    variables: {
      id,
    },
    update: deleteComment,
  });
  return (
    <Container>
      <Action onPress={() => navigation.navigate("Profile")}>
        <Avatar resizeMode="cover" source={{ uri: user?.avatar }} />
      </Action>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Action onPress={() => navigation.navigate("Profile")}>
            <Username>{user?.username}</Username>
          </Action>
          <Time>{timeCalculate(updatedAt)}</Time>
          {isMine ? (
            <TouchableOpacity onPress={btn}>
              <Ionicons color={"white"} name={"trash-outline"} size={18} />
            </TouchableOpacity>
          ) : null}
        </View>
        <Payload>{payload}</Payload>
      </View>
    </Container>
  );
}
