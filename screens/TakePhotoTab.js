import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Actions = styled.View`
  flex: 0.3;
  align-items: center;
  padding: 0px 50px;
  justify-content: space-around;
`;
const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
`;
const SliderContainer = styled.View``;
const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 15px;
`;

const PhotoActions = styled(Actions)`
  flex-direction: row;
`;
const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 10px 25px;
  border-radius: 4px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;
export default function TakePhotoTab({ navigation }) {
  const camera = useRef();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const getPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setOk(status === "granted");
  };
  useEffect(() => {
    getPermissions();
  }, [ok]);
  const OnCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };
  const onZoomValueChange = (e) => {
    setZoom(e);
  };
  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };
  const onCameraReady = () => {
    setCameraReady(true);
  };
  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("UploadForm", { file: takenPhoto });
  };
  const onUpload = () => {
    Alert.alert("Upload photo", "Upload photo or Save & Upload?", [
      {
        text: "Save & Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Upload only",
        onPress: () => goToUpload(false),
      },
      {
        text: "Cancel",
      },
    ]);
  };
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });

      setTakenPhoto(uri);
    }
  };
  const onDismiss = () => {
    setTakenPhoto("");
  };
  return (
    <Container>
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseBtn>
            <Ionicons
              color="white"
              name="chevron-back-outline"
              size={28}
              onPress={() => navigation.goBack()}
            />
          </CloseBtn>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255,255,255,0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashChange}
                style={{ marginRight: 30 }}
              >
                <Ionicons
                  color="white"
                  size={30}
                  name={
                    flashMode === Camera.Constants.FlashMode.off
                      ? "flash-off"
                      : flashMode === Camera.Constants.FlashMode.on
                      ? "flash"
                      : flashMode === Camera.Constants.FlashMode.auto
                      ? "eye"
                      : null
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => OnCameraSwitch()}>
                <Ionicons
                  color="white"
                  size={30}
                  name={
                    cameraType === Camera.Constants.Type.back
                      ? "camera"
                      : "camera-reverse"
                  }
                />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        <PhotoActions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dissmiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </PhotoActions>
      )}
    </Container>
  );
}
