import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { colors } from "../colors";

const Name = styled.Text`
  color: white;
  font-weight: 700;
  margin-right: 5px;
`;
const Bio = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Avatar = styled.Image`
  width: 100;
  height: 100;
  border-radius: 50%;
  background-color: gray;
`;

const Number = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: 700;
`;
const TextBox = styled.Text`
  color: white;
  font-size: 15px;
  font-weight: 600;
`;

const NumberBox = styled.View`
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

const Touch = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
const FollowMessage = styled.TouchableOpacity`
  background-color: ${(props) => (props.isFollowing ? `${colors.blue}` : gray)};
  padding: 8px;
  border-radius: 5px;
  width: 45%;
  justify-content: center;
  align-items: center;
`;
const Edit = styled.Text`
  color: white;
  font-weight: 700;
  font-size: 18px;
`;
export default function ProfileUserInfo({ seeProfile, loading }) {
  const {
    firstName,
    lastName,
    avatar,
    bio,
    photos,
    totalFollowing,
    totalFollowers,
    isMe,
    following,
    followers,
    isFollowing,
    username,
  } = seeProfile;
  const navigation = useNavigation();
  return (
    <View style={{ paddingTop: 30, paddingLeft: 30, paddingBottom: 30 }}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Avatar source={{ uri: avatar }} />
          <View style={{ flexDirection: "row", padding: 5 }}>
            <Name>{firstName}</Name>
            <Name>{lastName}</Name>
          </View>
          <Bio>{bio}</Bio>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            flex: 1,
            paddingBottom: 40,
          }}
        >
          <NumberBox>
            <Number>{photos?.length}</Number>
            <TextBox>{photos?.length === 1 ? "Post" : "Posts"}</TextBox>
          </NumberBox>
          <NumberBox>
            <Touch
              onPress={() =>
                navigation.navigate("ProfileFollowers", {
                  followers,
                  username,
                  loading,
                })
              }
            >
              <Number>{totalFollowers}</Number>
              <TextBox>
                {totalFollowers === 1 ? "Follower" : "Followers"}
              </TextBox>
            </Touch>
          </NumberBox>
          <NumberBox>
            <Touch
              onPress={() =>
                navigation.navigate("ProfileFollowing", { following, username })
              }
            >
              <Number>{totalFollowing}</Number>
              <TextBox>Following</TextBox>
            </Touch>
          </NumberBox>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingRight: 30,
          paddingTop: 20,
        }}
      >
        {isMe ? (
          <TouchableOpacity
            style={{
              backgroundColor: "gray",
              padding: 8,
              borderRadius: 5,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Edit>Edit profile</Edit>
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <FollowMessage isFollowing={isFollowing}>
              <Edit>{isFollowing ? "Follow" : "Unfollow"}</Edit>
            </FollowMessage>
            <View style={{ width: "3%" }}></View>
            <FollowMessage isFollowing={true}>
              <Edit>Message</Edit>
            </FollowMessage>
          </View>
        )}
      </View>
    </View>
  );
}
