import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";
import useMe from "../hooks/useMe";

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

export default Notifications = () => {
  const { data: myData } = useMe();

  const { data, loading, refetch } = useQuery(SEEFOLLOWERS_QUERY, {
    variables: {
      username: myData?.me?.username,
      page: 1,
    },
    skip: !myData?.me?.username,
  });
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFollowers?.followers}
        keyExtractor={(user) => "" + user.id}
        renderItem={({ item: user }) => (
          <UserRow notification={true} {...user} />
        )}
      ></FlatList>
    </ScreenLayout>
  );
};
