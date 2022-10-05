import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "./StackNavFactory";
import useMe from "../hooks/useMe";

const Tabs = createBottomTabNavigator();

const LoggedInNav = () => {
  const { data } = useMe();
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
        name="FeedTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} iconName={"home"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="SearchTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} iconName={"search"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="CameraTab"
        component={View}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} iconName={"camera"} focused={focused} />
          ),
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="NotificationsTab"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon color={color} iconName={"heart"} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="MeTab"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data.me.avatar }}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: "50%",
                  ...(focused && {
                    height: 24,
                    width: 24,
                    borderColor: "white",
                    borderWidth: "1",
                  }),
                }}
              />
            ) : (
              <TabIcon color={color} iconName={"person"} focused={focused} />
            ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default LoggedInNav;
