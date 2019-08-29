import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';

export const setupGraphQLClient = () => {
  // eslint-disable-next-line no-undef
  const node_env = process.env.NODE_ENV;
  const SRV_HOST_PORT_DOMAIN =
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_SERVER_HOST;

  const IS_LOCALHOST =
    !SRV_HOST_PORT_DOMAIN ||
    SRV_HOST_PORT_DOMAIN.indexOf('localhost') >= 0;

  const IS_PROD = node_env === 'production';

  const secureConnection = IS_PROD || !IS_LOCALHOST;

  const uri =
    (secureConnection ? 'https://' : 'http://') +
    SRV_HOST_PORT_DOMAIN;
  // Create a Http link
  let httpLink = createHttpLink({
    uri:
      IS_LOCALHOST || IS_PROD
        ? '/.netlify/functions/graphql'
        : uri,
  });

  const middlewareAuthLink = new ApolloLink(
    (operation, forward) => {
      const token = localStorage.getItem(
        'access_token'
      );

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

  const client = new ApolloClient({
    link: middlewareAuthLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return { client };
};

export default setupGraphQLClient;
