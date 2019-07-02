/* eslint-disable react/prop-types */
import React from 'react';

import { Loader } from 'semantic-ui-react';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
/* http link */
import { createHttpLink } from 'apollo-link-http';
/* ws link */
import { WebSocketLink } from 'apollo-link-ws';

import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';

import { createNetworkStatusNotifier } from 'react-apollo-network-status';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

/**/

import {
  Switch,
  Route,
  BrowserRouter,
  Link,
} from 'react-router-dom';

import Auth from './authentication/auth';

import { About } from './pages/about/About';
import Home from './pages/home/Home';
import { CoolBoard } from './components/CoolBoard';
import { Boards } from './components/Boards';
import { FullVerticalContainer } from './common/FullVerticalContainer';
import { ProfileHeader } from './common/ProfileHeader';
import { GeneralErrorHandler } from './common/GeneralErrorHandler';

const node_env = process.env.NODE_ENV;
const SRV_HOST_PORT_DOMAIN =
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
    const token = localStorage.getItem('access_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
    return forward(operation);
  }
);

// Create a WebSocket link:
const websocketUrl =
  (secureConnection ? 'wss://' : 'ws://') +
  SRV_HOST_PORT_DOMAIN;

const token = localStorage.getItem('access_token');

const wsLink = new WebSocketLink({
  uri: websocketUrl,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${token}`,
    },
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const returnTrueIfSubscription = ({ query }) => {
  const { kind, operation } = getMainDefinition(query);
  return (
    kind === 'OperationDefinition' &&
    operation === 'subscription'
  );
};

// split based on operation type
const link = split(
  returnTrueIfSubscription,
  wsLink,
  middlewareAuthLink.concat(httpLink)
);

const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink,
} = createNetworkStatusNotifier();

const client = new ApolloClient({
  link: networkStatusNotifierLink.concat(link),
  cache: new InMemoryCache(),
});

const auth = new Auth(
  result => console.log('auth result', result),
  client
);

export const App = () => (
  <div className="App">
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Switch>
          <Route
            exact
            path="/boards"
            render={() => (
              <FullVerticalContainer data-cy="boards-full-container">
                <ProfileHeader isBoardsPage />
                <GeneralErrorHandler
                  NetworkStatusNotifier={
                    NetworkStatusNotifier
                  }
                />
                <Boards />
              </FullVerticalContainer>
            )}
          />

          <Route
            exact
            path="/board/:id"
            render={({ match }) => (
              <FullVerticalContainer data-cy="board-full-container">
                <ProfileHeader />
                <GeneralErrorHandler
                  NetworkStatusNotifier={
                    NetworkStatusNotifier
                  }
                />
                  <DndProvider backend={HTML5Backend}>
                      <CoolBoard boardId={match.params.id} />
                  </DndProvider>
              </FullVerticalContainer>
            )}
          />

          <Route
            exact
            path="/login"
            render={({ history }) => {
              auth.login();

              client.resetStore().then(() => {
                history.push(`/`);
              });

              return (
                <FullVerticalContainer data-cy="login-full-container">
                  <p>
                    Please wait, trying to authenticate
                    ... If it did not work, you can go
                    back to the
                    <Link to="/">main page</Link>
                  </p>
                </FullVerticalContainer>
              );
            }}
          />

          {/*
              <Route
              exact
              path="/signup"
              render={({ history }) => (
                <FullVerticalContainer>
                  <SignupForm
                    successfulSignup={() => {
                      history.push('/login');
                    }}
                  />
                </FullVerticalContainer>
              )}
            />
              */}

          <Route
            exact
            path="/logout"
            render={({ history }) => {
              localStorage.removeItem('token');

              auth.logout();

              client.resetStore().then(() => {
                history.push(`/`);
              });
              return (
                <p data-cy="login-in-progress">
                  Please wait, logging out ... You will
                  be re-directed to the
                  <Link to="/">main page</Link>
                </p>
              );
            }}
          />
          <Route
            path="/callback"
            render={() => {
              return (
                <FullVerticalContainer data-cy="callback-full-container">
                  <ProfileHeader />
                  <GeneralErrorHandler
                    NetworkStatusNotifier={
                      NetworkStatusNotifier
                    }
                  />
                  <div>
                    <Loader active>
                      Authenticating...
                    </Loader>
                  </div>
                </FullVerticalContainer>
              );
            }}
          />
          <Route
            exact
            path="/about"
            render={() => <About />}
          />
          <Route path="/" render={() => <Home />} />
        </Switch>
      </ApolloProvider>
    </BrowserRouter>
  </div>
);
