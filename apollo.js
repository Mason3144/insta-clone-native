import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { SERVER } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const isLoggedInVar = makeVar(false);

export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["token", JSON.stringify(token)],
    ["loggedin", JSON.stringify("yes")],
  ]);
  isLoggedInVar(true);
};

const client = new ApolloClient({
  uri: `${SERVER}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
