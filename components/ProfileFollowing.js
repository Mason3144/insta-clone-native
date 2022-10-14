import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";

const SEEFOLLOWING_QUERY = gql`
  query SeeFollowing($username: String!, $lastId: Int) {
    seeFollowing(username: $username, lastId: $lastId) {
      ok
      following {
        id
        isMe
        username
        isFollowing
        avatar
      }
    }
  }
`;

export default ProfileFollowing = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.username}' following`,
    });
  });

  const { data, loading, refetch } = useQuery(SEEFOLLOWING_QUERY, {
    variables: {
      username: route?.params?.username,
    },
    skip: !route?.params?.username,
  });
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFollowing?.following}
        keyExtractor={(user) => "" + user.id}
        renderItem={({ item: user }) => <UserRow {...user} />}
      ></FlatList>
    </ScreenLayout>
  );
};
