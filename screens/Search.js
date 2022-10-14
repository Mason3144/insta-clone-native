import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import styled from "styled-components";
import { colors } from "../colors";

import SearchPhotos from "./SearchPhotos";
import SearchUsers from "./SearchUsers";

const Input = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5};
  padding: 5px 10px;
  border-radius: 10px;
`;
const Tab = createMaterialTopTabNavigator();
export default Search = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const { setValue, register, handleSubmit } = useForm();
  const onValid = ({ keyword }) => {
    navigation.navigate("SearchUsers", { keyword });
    navigation.navigate("SearchPhotos", { keyword });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0,0,0,0.8)"
      placeholder="Search Photos and Users"
      selectionColor={`${colors.blue}`}
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({ headerTitle: SearchBox });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "black", padding: 2 },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen
        name="SearchPhotos"
        component={SearchPhotos}
        options={{ title: "Photos" }}
      />
      <Tab.Screen
        name="SearchUsers"
        component={SearchUsers}
        options={{ title: "Users" }}
      />
    </Tab.Navigator>
  );
};
