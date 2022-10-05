import React, { useEffect } from "react";
import { Text, View } from "react-native";

export default Profile = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route?.params?.username,
    });
  });
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
