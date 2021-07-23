import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

const networkStatusNotifier = createNetworkStatusNotifier();
export const {
  useApolloNetworkStatus,
} = networkStatusNotifier;

export const setupGraphQLClient = () => {
  const GRAPHQL_URL = '/api/graphql';

  const uri = GRAPHQL_URL
  // Create a Http link
  let httpLink = createHttpLink({
    uri,
  });

  const middlewareAuthLink = new ApolloLink(
    (operation, forward) => {

      if(typeof localStorage !== 'undefined') {
        const token = localStorage?.getItem('id_token');

        operation.setContext({
          headers: {
            authorization: token
              ? `Bearer ${token}`
              : '',
          },
        });
      }
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
