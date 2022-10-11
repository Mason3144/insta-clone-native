import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import {
  offsetLimitPagination,
  relayStylePagination,
} from "@apollo/client/utilities";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";

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
  await client.resetStore();
  isLoggedInVar(false);
  tokenVar(null);
};

const httpLink = createHttpLink({
  uri: `https://sixty-camels-argue-175-211-17-8.loca.lt/graphql`,
});

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
        // seePhotoComments: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(httpLink),
  cache,
});

export default client;
