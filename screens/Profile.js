import React, { useEffect } from "react";
import { Text, View } from "react-native";
import HeaderRight from "../components/HeaderRight";
import useMe from "../hooks/useMe";

export default Profile = ({ navigation, route }) => {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: route?.params?.username,
      headerRight: () => (
        <HeaderRight
          userInfo={route?.params?.username === data?.me?.username}
        />
      ),
    });
  }, [navigation]);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Someones Profile</Text>
    </View>
  );
};
