import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhotoTab from "../screens/TakePhotoTab";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { colors } from "../colors";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function UploadNav() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black", padding: 5 },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: { backgroundColor: "white", top: 0 },
      }}
    >
      <Tab.Screen name="SelectPhotoTab" options={{ title: "Select photo" }}>
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerRight: () => (
                <TouchableOpacity>
                  <Text
                    style={{
                      color: colors.blue,
                      fontSize: 17,
                      fontWeight: "600",
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
              headerLeft: ({ tintColor }) => (
                <Ionicons
                  color={tintColor}
                  name="close"
                  size={28}
                  onPress={() => navigation.navigate("FeedTab")}
                />
              ),
              headerStyle: {
                backgroundColor: "black",
              },
            }}
          >
            <Stack.Screen
              name="Select"
              option={{ title: "Select a Photo" }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="TakePhotoTab"
        component={TakePhotoTab}
        options={{ title: "Take photo" }}
      />
    </Tab.Navigator>
  );
}
