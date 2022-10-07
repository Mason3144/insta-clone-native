import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";

const SEEFOLLOWERS_QUERY = gql`
  query seeFollowers($username: String!, $page: Int!) {
    seeFollowers(username: $username, page: $page) {
      ok
      followers {
        isFollowing
        avatar
        username
        id
        isMe
      }
    }
  }
`;

export default ProfileFollowers = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.username}' followers`,
    });
  });

  const { data, loading, refetch } = useQuery(SEEFOLLOWERS_QUERY, {
    variables: {
      username: route?.params?.username,
      page: 1,
    },
    skip: !route?.params?.username,
  });
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFollowers?.followers}
        keyExtractor={(user) => "" + user.id}
        renderItem={({ item: user }) => <UserRow {...user} />}
      ></FlatList>
    </ScreenLayout>
  );
};
