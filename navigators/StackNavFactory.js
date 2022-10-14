import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import Photo from "../screens/Photo";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Me from "../screens/Me";
import { Image } from "react-native";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";
import EditProfile from "../screens/EditProfile";
import ProfileFollowers from "../components/ProfileFollowers";
import ProfileFollowing from "../components/ProfileFollowing";
import useMe from "../hooks/useMe";
import Notifications from "../screens/Notifications";
import EditPhoto from "../screens/EditPhoto";

const Stack = createNativeStackNavigator();

export default function StackNavFactory({ screenName }) {
  const { data } = useMe();
  return (
    <Stack.Navigator
      screenOptions={{
        navigationBarColor: "white",
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
        headerBackTitleVisible: false,
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"Feed"}
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  maxHeight: 50,
                  maxWidth: 150,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name={"Notifications"} component={Notifications} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name={"Likes"} component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditPhoto" component={EditPhoto} />
      <Stack.Screen name="ProfileFollowers" component={ProfileFollowers} />
      <Stack.Screen name="ProfileFollowing" component={ProfileFollowing} />
    </Stack.Navigator>
  );
}
