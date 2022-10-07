import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import useMe from "../hooks/useMe";
import { logUserOut } from "../apollo";
export default function HeaderRight({ userInfo }) {
  const me = useMe();

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity>
        {userInfo ? (
          <Ionicons name={"image-outline"} color={"white"} size={30} />
        ) : (
          <Ionicons name={"send-outline"} color={"white"} size={30} />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => logUserOut()}>
        {userInfo ? (
          <Ionicons name={"log-out-outline"} color={"white"} size={30} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
