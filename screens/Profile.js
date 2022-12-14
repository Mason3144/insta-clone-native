import React, { useEffect } from "react";
import HeaderRight from "../components/HeaderRight";
import ProfileBody from "../components/ProfileBody";
import useMe from "../hooks/useMe";

export default Profile = ({ navigation, route }) => {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: route?.params?.username,
      headerRight: () => (
        <HeaderRight
          userInfo={route?.params?.username === data?.me?.username}
        />
      ),
    });
  }, [navigation]);
  return (
    <ProfileBody
      ownerName={
        route?.params?.username === data?.me?.username
          ? data?.me?.username
          : route?.params?.username
      }
    />
  );
};
