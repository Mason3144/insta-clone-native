import React, { useEffect, useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AythShared";
import { useForm } from "react-hook-form";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserIn } from "../apollo";
import { Alert } from "react-native";

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
        onSubmitEditing={() => onNext(passwordRef)}
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        onChangeText={(text) => setValue("username", text)}
      />
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
