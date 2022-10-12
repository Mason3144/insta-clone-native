import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components";

const MessageContainer = styled.View``;
const Author = styled.View``;
const Avatar = styled.Image``;
const Username = styled.Text`
  color: white;
`;
const Message = styled.Text`
  color: white;
`;
const TextInput = styled.TextInput`
  margin-bottom: 50px;
  width: 95%;
  background-color: white;
  padding: 10px 20px;
  border-radius: 1000px;
`;

const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          id
          username
          avatar
        }
        read
      }
    }
  }
`;

export default function Room({ route, navigation }) {
  const { data, loading } = useQuery(SEE_ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
      headerLeft: () => (
        <Ionicons
          color="white"
          name="chevron-back-outline"
          size={28}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);
  const renderItem = ({ item: message }) => (
    <MessageContainer>
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
        <Username>{message.user.username}</Username>
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      behavior="height"
      keyboardVerticalOffset={70}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%" }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
        />
        <TextInput
          placeholder="Write a message"
          returnKeyLabel="Send Message"
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}
