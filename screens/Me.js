import React, { useEffect } from "react";
import HeaderRight from "../components/HeaderRight";
import ProfileBody from "../components/ProfileBody";
import useMe from "../hooks/useMe";

export default Me = ({ navigation }) => {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
      headerRight: () => <HeaderRight userInfo={true} />,
    });
  }, [navigation]);
  return <ProfileBody ownerName={data?.me?.username} />;
};
