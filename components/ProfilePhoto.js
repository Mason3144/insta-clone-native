import { gql, useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";

export default ProfilePhoto = ({ seeProfile }) => {
  const navigation = useNavigation();
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { photos } = seeProfile;

  console.log(photos);
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Photo", { photoId: photo.id })}
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      numColumns={numColumns}
      data={photos}
      keyExtractor={(photo) => "" + photo.id}
      renderItem={renderItem}
    />
  );
};
