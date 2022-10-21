import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { logUserOut } from "../apollo";
import { useApolloClient } from "@apollo/client";
export default function HeaderRight({ userInfo }) {
  const client = useApolloClient();
  const logout = async () => {
    await client.resetStore();
    logUserOut();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => logout()}>
        {userInfo ? (
          <Ionicons name={"log-out"} color={"white"} size={30} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
