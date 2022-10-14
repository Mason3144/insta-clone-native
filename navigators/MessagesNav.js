import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function MessagesNav() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerLeft: ({ tintColor }) => (
          <Ionicons
            color={tintColor}
            name="close"
            size={28}
            onPress={() => navigation.goBack()}
          />
        ),
        headerStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
