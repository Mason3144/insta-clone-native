import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: `https://eager-poets-attend-175-211-17-8.loca.lt/graphql`,
  cache: new InMemoryCache(),
});

export default client;
