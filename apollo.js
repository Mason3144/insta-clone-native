import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { SERVER } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const logUserIn = async (token) => {
  await AsyncStorage.multiSet([
    ["token", JSON.stringify(token)],
    ["loggedin", JSON.stringify("yes")],
  ]);
  isLoggedInVar(true);
  tokenVar(token);
};

const client = new ApolloClient({
  uri: `https://icy-animals-change-175-211-17-8.loca.lt/graphql`,
  cache: new InMemoryCache(),
});

export default client;
