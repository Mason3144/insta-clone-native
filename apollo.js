import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { BACK_SERVER_IP } from "@env";

export const isLoggedInVar = makeVar(false);

const client = new ApolloClient({
  uri: `https://${BACK_SERVER_IP}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
