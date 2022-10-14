import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { ROOM_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import RoomItem from "../components/rooms/RoomItem";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RooParts
      messages {
        payload
      }
    }
  }
  ${ROOM_FRAGMENT}
`;
export default function Rooms() {
  const { data, loading, refetch } = useQuery(SEE_ROOMS_QUERY);
  const renderItem = ({ item: room }) => {
    return <RoomItem {...room}></RoomItem>;
  };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
