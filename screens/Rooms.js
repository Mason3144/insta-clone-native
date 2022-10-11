import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { ROOM_FRAGMENT } from "../fragments";
import styled from "styled-components";
import ScreenLayout from "../components/ScreenLayout";

const RoomContainer = styled.View``;
const RoomText = styled.Text`
  color: white;
`;

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
  console.log(data);
  const renderItem = ({ item: room }) => (
    <RoomContainer>
      <RoomText>
        {room.unreadTotal === "0" ? "Name" : `${room.unreadTotal} messages`}
      </RoomText>
    </RoomContainer>
  );

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
