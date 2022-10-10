import React from "react";
import useMe from "../hooks/useMe";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const LoggedInNav = () => {
  const navigation = useNavigation();
  const { data } = useMe();
  return (
    <Stack.Navigator screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="Tabs"
        component={TabNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Upload"
        component={UploadNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadForm"
        component={UploadForm}
        options={{
          headerLeft: ({ tintColor }) => (
            <Ionicons
              color={tintColor}
              name="close"
              size={28}
              onPress={() => navigation.goBack()}
            />
          ),
          title: "Upload",
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
