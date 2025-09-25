import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { Defer20220824Handler } from '@apollo/client/incremental';
import { LocalState } from '@apollo/client/local-state';

//import { createNetworkStatusNotifier } from 'react-apollo-network-status';

import { RetryLink } from '@apollo/client/link/retry';
import { REQ_HEADER_x_coolboard_readonly } from './headers';

//const networkStatusNotifier = createNetworkStatusNotifier();
//export const { useApolloNetworkStatus } = networkStatusNotifier;

import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

// See apollo error messages
// https://www.apollographql.com/docs/react/errors#%7B%22version%22%3A%223.10.1%22%2C%22message%22%3A39%2C%22args%22%3A%5B%22Payload%22%2C%22cyclic%20object%20value%22%5D%7D
if (process.env.NODE_ENV !== 'production') {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

export const setupGraphQLClient = (readOnly?: boolean) => {
  const headers = readOnly
    ? {
        [REQ_HEADER_x_coolboard_readonly]: 'true',
      }
    : {};
  const httpLink = new HttpLink({
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
    link: ApolloLink.from([
      //  networkStatusNotifier.link,
      retryLink,
      httpLink,
    ]),
    cache: new InMemoryCache(),

    /*
    Inserted by Apollo Client 3->4 migration codemod.
    If you are not using the `@client` directive in your application,
    you can safely remove this option.
    */
    localState: new LocalState({}),

    /*
    Inserted by Apollo Client 3->4 migration codemod.
    If you are not using the `@defer` directive in your application,
    you can safely remove this option.
    */
    incrementalHandler: new Defer20220824Handler(),
  });
};
