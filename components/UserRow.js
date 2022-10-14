import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const Column = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
`;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
`;

const FollowBtn = styled.TouchableOpacity`
  width: 100px;
  height: 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: ${(props) =>
    props.isFollowing ? "gray" : `${colors.blue}`};
  border-radius: 5px;
`;
const FollowBtnText = styled.Text`
  font-weight: 600;
  color: white;
`;

const FOLLOW_MUTATION = gql`
  mutation followUser($username: String) {
    followUser(username: $username) {
      ok
    }
  }
`;

export default function UserRow({
  notification,
  avatar,
  username,
  id,
  isFollowing,
  isMe,
}) {
  const navigation = useNavigation();
  const updateFollowers = (cache, { data }) => {
    const {
      followUser: { ok },
    } = data;
    if (ok) {
      const userId = `User:${id}`;
      cache.modify({
        id: userId,
        fields: {
          isFollowing(prev) {
            return !prev;
          },
        },
      });
    }
  };
  const [followUserMutation] = useMutation(FOLLOW_MUTATION, {
    variables: {
      username,
    },
    update: updateFollowers,
  });
  return (
    <Wrapper>
      <Column onPress={() => navigation.navigate("Profile", { username, id })}>
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
        {notification ? (
          <Text style={{ color: "rgba(255,255,255,0.7)", marginLeft: 5 }}>
            has started following you
          </Text>
        ) : null}
      </Column>

      {!isMe ? (
        <FollowBtn
          isFollowing={isFollowing}
          onPress={() => followUserMutation()}
        >
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}
