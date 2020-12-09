import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

const networkStatusNotifier = createNetworkStatusNotifier();
export const {
  useApolloNetworkStatus,
} = networkStatusNotifier;

export const setupGraphQLClient = () => {
  const GRAPHQL_URL =
    process.env.REACT_APP_GRAPHQL_URL ??
    '/api/graphql';

  // const IS_LOCALHOST = !SRV_HOST_PORT_DOMAIN || SRV_HOST_PORT_DOMAIN.indexOf('localhost') >= 0;
  // const node_env = process.env.NODE_ENV;
  // const IS_PROD = node_env === 'production';

  const uri = GRAPHQL_URL
  // Create a Http link
  let httpLink = createHttpLink({
    uri,
  });

  const middlewareAuthLink = new ApolloLink(
    (operation, forward) => {
      const token = localStorage.getItem('id_token');

      operation.setContext({
        headers: {
          authorization: token
            ? `Bearer ${token}`
            : '',
        },
      });
      return forward(operation);
    }
  );

  return new ApolloClient({
    link: ApolloLink.from([
      networkStatusNotifier.link,
      middlewareAuthLink,
      httpLink,
    ]),
    cache: new InMemoryCache(),
  });
};
