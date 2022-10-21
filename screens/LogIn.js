import React, { useEffect, useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AythShared";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { Alert } from "react-native";
import styled from "styled-components";

const ErrorText = styled.Text`
  color: tomato;
  margin: 0 10px 10px 10px;
`;
const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const LogIn = ({ route: { params } }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
  const passwordRef = useRef();
  const onCompleted = async ({ login }) => {
    const { ok, token, error } = login;

    if (!ok) {
      Alert.alert("Error", error);
    }
    if (ok) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onNext = (next) => {
    next?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        returnKeyType="next"
        autoCapitalize="none"
        maxLength={10}
        onSubmitEditing={() => onNext(passwordRef)}
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        onChangeText={(text) => setValue("username", text)}
      />
      {watch("username") ? (
        watch("username")?.length < 3 ? (
          <ErrorText>Username must be more than 2 characters</ErrorText>
        ) : null
      ) : null}
      <TextInput
        value={watch("password")}
        placeholder="Password"
        ref={passwordRef}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onValid)}
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        onChangeText={(text) => setValue("password", text)}
        lastOne={true}
      />
      {watch("password") ? (
        !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d#?!@$%^&*-]{8,}$/.test(
          watch("password")
        ) ? (
          <ErrorText>
            Password must be more than 7 characters, at least one letter and one
            number
          </ErrorText>
        ) : null
      ) : null}
      <AuthButton
        text="Log In"
        disabled={!watch("username") || !watch("password")}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default LogIn;
