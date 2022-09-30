import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
  padding: 0 40px;
`;
const Logo = styled.Image`
  max-width: 50%;
  height: 100px;
`;
const CreateAccount = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 13px 10px;
  margin-top: 20px;
  border-radius: 3px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : 1)};
`;
const CreateAccountText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 15px;
  text-align: center;
`;

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  font-size: 15px;
`;

const Welcome = ({ navigation }) => {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("LogIn");
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")}></Logo>
      <CreateAccount disabled={false} onPress={goToCreateAccount}>
        <CreateAccountText>Create Account</CreateAccountText>
      </CreateAccount>
      <TouchableOpacity>
        <LoginLink onPress={goToLogin}>Log In</LoginLink>
      </TouchableOpacity>
    </Container>
  );
};

export default Welcome;
