import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { ROOM_FRAGMENT } from "../fragments";
import styled from "styled-components";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { colors } from "../colors";
import RoomItem from "../components/rooms/RoomItem";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RooParts
    }
  }
  ${ROOM_FRAGMENT}
`;
export default function Rooms() {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const renderItem = ({ item: room }) => {
    return <RoomItem {...room}></RoomItem>;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          ></View>
        }
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
