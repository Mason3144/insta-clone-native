import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
`;
const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;
const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

export default function EditPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoLocal, setPhotoLocal] = useState("");
  const [chosenPhoto, setChosenPhoto] = useState("");
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    const assetInfo = await MediaLibrary.getAssetInfoAsync(photos[0].id);
    setChosenPhoto(photos[0]?.uri);
    setPhotoLocal(assetInfo.localUri);
  };
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("EditProfile", { avatar: photoLocal })}
    >
      <Text
        style={{
          color: colors.blue,
          fontSize: 17,
          fontWeight: "600",
        }}
      >
        Next
      </Text>
    </TouchableOpacity>
  );

  const getPermission = async () => {
    const { accessPrivileges, canAskAgain, status } =
      await MediaLibrary.getPermissionsAsync();
    if (status !== "granted") {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (status === "granted") {
      setOk(true);
      getPhotos();
    }
  };

  useEffect(() => {
    getPermission();
  }, [ok]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto, photoLocal]);
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = async (id) => {
    const assetInfo = await MediaLibrary.getAssetInfoAsync(id);
    setPhotoLocal(assetInfo.localUri);
    setChosenPhoto(assetInfo.uri);
  };
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo?.id)}>
      <Image
        source={{ uri: photo?.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? colors.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{
              width: 200,
              height: 200,
              resizeMode: "cover",
              borderRadius: 100,
              backgroundColor: "gray",
            }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
