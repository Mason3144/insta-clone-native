import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";
import { USER_FRAGMENT } from "../fragments";

const LIKES_QUERY = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default Likes = ({ route }) => {
  const { data, loading, refetch } = useQuery(LIKES_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route?.params?.photoId,
  });
  refetch();
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seePhotoLikes}
        keyExtractor={(user) => "" + user.id}
        renderItem={({ item: user }) => <UserRow {...user} />}
      ></FlatList>
    </ScreenLayout>
  );
};
