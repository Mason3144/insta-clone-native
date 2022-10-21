import React, { useEffect, useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AythShared";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { Alert, Text } from "react-native";
import styled from "styled-components";

const ErrorText = styled.Text`
  color: tomato;
  margin: 0 10px 10px 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $username: String!
    $email: String!
    $password: String!
    $lastName: String
  ) {
    createAccount(
      firstName: $firstName
      username: $username
      email: $email
      password: $password
      lastName: $lastName
    ) {
      ok
      error
    }
  }
`;

const CreateAccount = ({ navigation }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({ mode: "all" });
  const onCompleted = ({ createAccount }) => {
    const { ok, error } = createAccount;
    const { username, password } = getValues();
    if (!ok) {
      Alert.alert("Error", error);
    }
    if (ok) {
      navigation.navigate("LogIn", {
        username,
        password,
      });
    }
  };
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onNext = (next) => {
    next?.current?.focus();
  };

  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );
  useEffect(() => {
    register("firstName", {
      requrired: true,
    });
    register("lastName", { requrired: true });
    register("username", { requrired: true, minLength: 3 });
    register("email", { requrired: true });
    register("password", { requrired: true, minLength: 8 });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="First Name"
        maxLength={10}
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
        maxLength={10}
        onSubmitEditing={() => onNext(usernameRef)}
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        onChangeText={(text) => setValue("lastName", text)}
      />
      <TextInput
        placeholder="Username"
        ref={usernameRef}
        maxLength={10}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
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
      {watch("email") ? (
        !/^[a-zA-Z0-9_.-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(
          watch("email")
        ) ? (
          <ErrorText>Email must be email type</ErrorText>
        ) : null
      ) : null}

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
        text="Create Account"
        disabled={
          !watch("username") ||
          !watch("password") ||
          !watch("firstName") ||
          !watch("lastName") ||
          !watch("email")
        }
        loading={loading}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
