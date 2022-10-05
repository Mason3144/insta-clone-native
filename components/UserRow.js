import { useNavigation } from "@react-navigation/native";
import React from "react";
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

export default function UserRow({ avatar, username, isFollowing, isMe }) {
  return (
    <Wrapper>
      <Column onPress={() => navigation.navigate("Profile")}>
        <Avatar source={{ uri: avatar }} />
        <Username>{username}</Username>
      </Column>
      {!isMe ? (
        <FollowBtn isFollowing={isFollowing}>
          <FollowBtnText>{isFollowing ? "Unfollow" : "Follow"}</FollowBtnText>
        </FollowBtn>
      ) : null}
    </Wrapper>
  );
}
