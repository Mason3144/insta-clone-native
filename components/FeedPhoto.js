import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { gql, useMutation } from "@apollo/client";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;
const Username = styled.Text`
  color: white;
  font-weight: 700;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;

const ExtraContainer = styled.View`
  padding: 10px;
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;
export default function FeedPhoto({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
  fullView,
}) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight(height / 3);
    });
  }, [file]);

  const updateToggleLike = (cache, { data }) => {
    const {
      toggleLike: { ok },
    } = data;
    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            return !prev;
          },
          likes(prev) {
            return isLiked ? prev - 1 : prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      id: user.id,
    });
  };

  return (
    <Container>
      <Header onPress={() => goToProfile()}>
        <UserAvatar resizeMode="cover" source={{ uri: user?.avatar }} />
        <Username>{user?.username}</Username>
      </Header>
      <TouchableOpacity
        onPress={() => navigation.navigate("Photo", { photoId: id })}
      >
        <File
          resizeMode="contain"
          style={{ width, height: imageHeight }}
          source={{ uri: file }}
        />
      </TouchableOpacity>
      <ExtraContainer>
        <Actions>
          <Action onPress={() => toggleLikeMutation()}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "white"}
              size={22}
            />
          </Action>
          <Action
            onPress={() => navigation.navigate("Comments", { photoId: id })}
          >
            <Ionicons name="chatbubble-outline" color="white" size={22} />
          </Action>
        </Actions>
        <TouchableOpacity
          onPress={() => navigation.navigate("Likes", { photoId: id })}
        >
          <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <TouchableOpacity onPress={() => goToProfile()}>
            <Username>{user?.username}</Username>
          </TouchableOpacity>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
}
