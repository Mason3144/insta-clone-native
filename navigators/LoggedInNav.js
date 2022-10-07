import React from "react";
import useMe from "../hooks/useMe";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "./TabsNav";
import UploadNav from "./UploadNav";

const Stack = createNativeStackNavigator();

const LoggedInNav = () => {
  const { data } = useMe();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="Tabs" component={TabNav} />
      <Stack.Screen name="Upload" component={UploadNav} />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
