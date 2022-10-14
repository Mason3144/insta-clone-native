import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components/native";

const Images = styled.Image`
  width: ${(props) => props.width / 4}px;
  height: 100px;
`;

export default ProfilePhoto = ({ seeProfile }) => {
  const navigation = useNavigation();
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { photos } = seeProfile;

  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Photo", { photoId: photo.id })}
    >
      <Images source={{ uri: photo.file }} width={width} />
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
