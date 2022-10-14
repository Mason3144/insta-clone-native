import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components";
import { colors } from "../colors";

const Message = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 8px;
  border-radius: 5px;
  width: 45%;
  justify-content: center;
  align-items: center;
`;

const CREATE_ROOM_MUTATION = gql`
  mutation createRoom($userId: Int!) {
    createRoom(userId: $userId) {
      ok
      id
    }
  }
`;

export default function ProfileMessage({ id, avatar, username, children }) {
  const navigation = useNavigation();
  const onCompleted = ({ createRoom }) => {
    const talkingTo = {
      id,
      avatar,
      username,
    };
    navigation.navigate("MessagesNav", {
      screen: "Room",
      params: { id: createRoom.id, talkingTo },
    });
  };

  const [CreateRoomMutation] = useMutation(CREATE_ROOM_MUTATION, {
    variables: { userId: id },
    onCompleted,
  });

  return <Message onPress={CreateRoomMutation}>{children}</Message>;
}
