import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

const LoggedInNav = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "rgba(255,255,255,0.5)",
        },
      }}
    >
      <Tabs.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="search" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notification"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="heart" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person" color={color} size={focused ? 24 : 20} />
          ),
        }}
      />
      {/* <Tabs.Screen name="Feed" component={Feed} /> */}
    </Tabs.Navigator>
  );
};

export default LoggedInNav;
