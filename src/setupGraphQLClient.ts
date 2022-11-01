import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';
import { RetryLink } from '@apollo/client/link/retry';

const networkStatusNotifier = createNetworkStatusNotifier();
export const { useApolloNetworkStatus } = networkStatusNotifier;

export const setupGraphQLClient = () => {
  const GRAPHQL_URL = '/api/graphql';

  const uri = GRAPHQL_URL;

  let httpLink = createHttpLink({
    uri,
    credentials: 'same-origin',
  });

  const retryLink = new RetryLink({
    delay: { initial: 2000 },
    attempts: {
      max: 3,
    },
  });

  return new ApolloClient({
    link: ApolloLink.from([networkStatusNotifier.link, retryLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
