import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";

const SEE_ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          id
          username
          avatar
        }
        read
      }
    }
  }
`;

export default function Room({ route, navigation }) {
  const { data, loading } = useQuery(SEE_ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  console.log(data);
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.username}`,
      headerLeft: () => (
        <Ionicons
          color="white"
          name="chevron-back-outline"
          size={28}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, []);
  return (
    <View>
      <Text>Room List</Text>
    </View>
  );
}
