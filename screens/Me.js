import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { logUserOut } from "../apollo";
import HeaderRight from "../components/HeaderRight";
import ProfileBody from "../components/ProfileBody";
import useMe from "../hooks/useMe";

export default Me = ({ navigation }) => {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
      headerRight: () => <HeaderRight userInfo={true} />,
    });
  });
  return <ProfileBody ownerName={data?.me?.username} />;
};
