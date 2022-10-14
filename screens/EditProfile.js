import React, { useEffect, useRef, useState } from "react";
import AuthButton from "../components/auth/AuthButton";
import { TextInput } from "../components/auth/AythShared";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import DismissKeyboard from "../components/DismissKeyboard";
import styled from "styled-components/native";
import { ReactNativeFile } from "apollo-upload-client";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0px 20px;
`;

const Avatar = styled.Image`
  background-color: gray;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-bottom: 30px;
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $firstName: String
    $lastName: String
    $username: String
    $email: String
    $password: String
    $bio: String
    $avatar: Upload
  ) {
    editProfile(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
      bio: $bio
      avatar: $avatar
    ) {
      ok
      error
      user {
        id
        firstName
        lastName
        bio
        avatar
      }
    }
  }
`;
export default function EditProfile({ navigation, route }) {
  const { register, handleSubmit, setValue, watch, getValues } = useForm();
  const [avatar, setAvatar] = useState();
  const [detectAvatarChange, setDetectAvatarChange] = useState();
  const lastNameRef = useRef();
  const bioRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onNext = (next) => {
    next?.current?.focus();
  };

  const onValid = (data) => {
    const avatarUri = new ReactNativeFile({
      uri: avatar,
      name: "1.jpg",
      type: "image/jpeg",
    });
    if (!loading) {
      editProfileMutation({
        variables: {
          ...data,
          avatar: avatarUri,
        },
      });
    }
  };

  const updateProfile = (cache, { data }) => {
    const { editProfile } = data;
    if (!editProfile.ok) {
      alert(editProfile.error);
    }

    cache.modify({
      id: `User:${editProfile?.user?.id}`,
      fields: {
        firstName(prev) {
          return editProfile.user.firstName;
        },
        lastName(prev) {
          return editProfile.user.lastName;
        },
        bio(prev) {
          return editProfile.user.bio;
        },
        avatar(prev) {
          return editProfile.avatar;
        },
      },
    });
    navigation.goBack();
  };
  const [editProfileMutation, { loading }] = useMutation(
    EDIT_PROFILE_MUTATION,
    { update: updateProfile }
  );
  useEffect(() => {
    register("firstName", { requrired: true });
    register("lastName", { requrired: true });
    register("bio", { requrired: true });
    register("email", { requrired: true });
    register("password", { requrired: true });
  }, [register]);
  useEffect(() => {
    setAvatar(route?.params?.avatar);
  }, [route?.params?.avatar]);
  useEffect(() => {
    setDetectAvatarChange(route?.params?.avatar);
  }, []);

  return (
    <DismissKeyboard>
      <Container>
        <TouchableOpacity onPress={() => navigation.navigate("EditPhoto")}>
          <Avatar source={{ uri: avatar }} />
        </TouchableOpacity>
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
        >
          <TextInput
            autoFocus
            placeholder="First Name"
            returnKeyType="next"
            onSubmitEditing={() => onNext(lastNameRef)}
            blurOnSubmit={false}
            placeholderTextColor={"rgba(255,255,255,0.5)"}
            onChangeText={(text) => setValue("firstName", text)}
          />
          <TextInput
            placeholder="Last Name"
            ref={lastNameRef}
            returnKeyType="next"
            onSubmitEditing={() => onNext(bioRef)}
            blurOnSubmit={false}
            placeholderTextColor={"rgba(255,255,255,0.5)"}
            onChangeText={(text) => setValue("lastName", text)}
          />
          <TextInput
            placeholder="Bio"
            ref={bioRef}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => onNext(emailRef)}
            blurOnSubmit={false}
            placeholderTextColor={"rgba(255,255,255,0.5)"}
            onChangeText={(text) => setValue("bio", text)}
          />
          <TextInput
            placeholder="Email"
            ref={emailRef}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => onNext(passwordRef)}
            blurOnSubmit={false}
            placeholderTextColor={"rgba(255,255,255,0.5)"}
            onChangeText={(text) => setValue("email", text)}
          />
          <TextInput
            placeholder="Password"
            ref={passwordRef}
            secureTextEntry
            returnKeyType="done"
            blurOnSubmit={false}
            placeholderTextColor={"rgba(255,255,255,0.5)"}
            lastOne={true}
            onChangeText={(text) => setValue("password", text)}
            onSubmitEditing={handleSubmit(onValid)}
          />
          <AuthButton
            text="Edit Account"
            disabled={
              !watch("bio") &&
              !watch("password") &&
              !watch("firstName") &&
              !watch("lastName") &&
              !watch("email") &&
              detectAvatarChange === avatar
            }
            loading={loading}
            placeholderTextColor={"rgba(255,255,255,0.5)"}
            onPress={handleSubmit(onValid)}
          />
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
}
