import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";

const Stack = createNativeStackNavigator();

const LoggedOutNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen
        name="LogIn"
        options={{
          headerTitle: () => false,
          headerTransparent: true,
          headerTintColor: "white",
          headerBackTitle: "",
        }}
        component={LogIn}
      />
      <Stack.Screen
        name="CreateAccount"
        options={{
          headerTitle: () => false,
          headerTransparent: true,
          headerTintColor: "white",
          headerBackTitle: "",
        }}
        component={CreateAccount}
      />
    </Stack.Navigator>
  );
};

export default LoggedOutNav;
