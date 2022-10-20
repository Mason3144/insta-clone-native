import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
  split,
  useApolloClient,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import {
  getMainDefinition,
  offsetLimitPagination,
  relayStylePagination,
} from "@apollo/client/utilities";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const TOKEN = "token";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar(null);
export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, JSON.stringify(token));
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
  const client = useApolloClient();
  await client.resetStore();
};

const serverUri = "instagram-clone-coding-backend.herokuapp.com";

const uploadHttpLink = createUploadLink({
  uri: `https://${serverUri}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${serverUri}/graphql`,
    connectionParams: () => ({
      token: tokenVar(),
    }),
  })
);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("GQL", graphQLErrors);
  }
  if (networkError) {
    console.log("NTW", networkError);
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
        seePhotoComments: offsetLimitPagination(),
      },
    },
  },
});

const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLinks
);

const client = new ApolloClient({
  link: splitLink,
  cache,
});

export default client;
