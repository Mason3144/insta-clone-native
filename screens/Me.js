import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default Me = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Me</Text>
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>logout</Text>
      </TouchableOpacity>
    </View>
  );
};
