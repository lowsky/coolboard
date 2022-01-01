import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

const networkStatusNotifier = createNetworkStatusNotifier();
export const { useApolloNetworkStatus } = networkStatusNotifier;

export const setupGraphQLClient = () => {
  const GRAPHQL_URL = '/api/graphql';

  const uri = process.env.NEXT_PUBLIC_RELAY_ENDPOINT ?? GRAPHQL_URL;

  let httpLink = createHttpLink({
    uri,
  });

  return new ApolloClient({
    link: ApolloLink.from([networkStatusNotifier.link, httpLink]),
    cache: new InMemoryCache(),
  });
};
