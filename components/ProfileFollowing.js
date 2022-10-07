import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import UserRow from "../components/UserRow";
import { USER_FRAGMENT } from "../fragments";

export default ProfileFollowing = ({ route }) => {
  return (
    <ScreenLayout loading={false}>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={route?.params?.following}
        keyExtractor={(user) => "" + user.id}
        renderItem={({ item: user }) => <UserRow {...user} />}
      ></FlatList>
    </ScreenLayout>
  );
};
