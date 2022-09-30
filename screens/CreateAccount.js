import React, { useEffect, useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AythShared";
import { useForm } from "react-hook-form";

const CreateAccount = () => {
  const { register, handleSubmit, setValue } = useForm();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const onNext = (next) => {
    next?.current?.focus();
  };
  const onValid = (data) => {
    console.log(data);
  };
  useEffect(() => {
    register("firstName", { requrired: true });
    register("lastName", { requrired: true });
    register("username", { requrired: true });
    register("email", { requrired: true });
    register("password", { requrired: true });
  }, [register]);

  return (
    <AuthLayout>
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
        onSubmitEditing={() => onNext(usernameRef)}
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        onChangeText={(text) => setValue("lastName", text)}
      />
      <TextInput
        placeholder="Username"
        ref={usernameRef}
        autoCapitalize="none"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        onChangeText={(text) => setValue("username", text)}
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
        text="Create Account"
        disabled={false}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        loading={false}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default CreateAccount;
