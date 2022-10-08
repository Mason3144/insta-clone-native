import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;
const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

export default function SelectPhoto() {
  const [ok, setOk] = useState(false);
  const getPhotos = async () => {};
  const getPermission = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(ture);
      }
    } else if (accessPrivileges !== "none") {
      setOk(ture);
    }
  };
  useEffect(() => {
    getPermission();
    getPhotos();
  }, []);
  return (
    <Container>
      <Top />
      <Bottom />
    </Container>
  );
}
