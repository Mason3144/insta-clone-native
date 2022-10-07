import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import ProfilePhoto from "./ProfilePhoto";
import ProfileUserInfo from "./ProfileUserInfo";

const SEEPROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      avatar
      bio
      photos {
        id
        file
      }
      totalFollowing
      totalFollowers
      isFollowing
      isMe
      following {
        username
        avatar
        id
        isFollowing
        isMe
      }
      followers {
        username
        avatar
        id
        isFollowing
        isMe
      }
    }
  }
`;
export default function ProfileBody({ ownerName }) {
  const { data, loading } = useQuery(SEEPROFILE_QUERY, {
    variables: {
      username: ownerName,
    },
  });
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      {!loading ? (
        <View>
          <ProfileUserInfo {...data} />

          <View>
            <ProfilePhoto {...data} />
          </View>
        </View>
      ) : null}
    </View>
  );
}
