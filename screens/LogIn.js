import React, { useRef } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AythShared";

const LogIn = ({ navigation }) => {
  const passwordRef = useRef();
  const onNext = (next) => {
    next?.current?.focus();
  };
  const onDone = () => {
    alert("done");
  };
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
      />
      <TextInput
        placeholder="Password"
        ref={passwordRef}
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={onDone}
        blurOnSubmit={false}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        lastOne={true}
      />
      <AuthButton
        text="Log In"
        disabled={true}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        onPress={() => null}
      />
    </AuthLayout>
  );
};

export default LogIn;
