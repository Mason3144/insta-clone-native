import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const LogIn = ({ navigation }) => {
  return (
    <View>
      <Text>LogIn</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LogIn;
