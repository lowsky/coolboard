import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';
import { RetryLink } from '@apollo/client/link/retry';
import { REQ_HEADER_x_coolboard_readonly } from './headers';

const networkStatusNotifier = createNetworkStatusNotifier();
export const { useApolloNetworkStatus } = networkStatusNotifier;

export const setupGraphQLClient = (readOnly?: boolean) => {
  const headers = readOnly
    ? {
        [REQ_HEADER_x_coolboard_readonly]: 'true',
      }
    : {};
  const httpLink = createHttpLink({
    uri: '/api/graphql',
    headers,
  });

  const retryLink = new RetryLink({
    delay: { initial: 3000 },
    attempts: {
      max: 3,
    },
  });

  return new ApolloClient({
    link: ApolloLink.from([networkStatusNotifier.link, retryLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
