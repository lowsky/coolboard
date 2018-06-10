/* eslint-disable react/prop-types */
import React, { Component } from 'react';

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

/**/

import {
  Switch,
  Route,
  BrowserRouter,
  Link,
} from 'react-router-dom';

import './App.css';

import Auth from './auth/auth';
import Auth0Callback from './components/Auth0Callback';

import { CoolBoard } from './components/CoolBoard';
import Boards from './components/Boards';
import { FullVerticalContainer } from './components/FullVerticalContainer';
import { ProfileHeader } from './components/ProfileHeader';
import { GeneralErrorHandler } from './components/GeneralErrorHandler';

const node_env = process.env.NODE_ENV;
const SRV_HOST_PORT_DOMAIN =
  process.env.REACT_APP_SERVER_HOST;
// Create a Http link
let httpLink = createHttpLink({
  uri:
    (node_env === 'production'
      ? 'https://'
      : 'http://') + SRV_HOST_PORT_DOMAIN,
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
const wsLink = new WebSocketLink({
  uri:
    (node_env === 'production' ? 'wss://' : 'ws://') +
    SRV_HOST_PORT_DOMAIN,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: `Bearer ${localStorage.getItem(
        'access_token'
      )}`,
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

const handleAuthentication = (nextState, replace) => {
  if (
    /access_token|id_token|error/.test(
      nextState.location.hash
    )
  ) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <ApolloProvider client={client}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <FullVerticalContainer>
                    <ProfileHeader />
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
                  <FullVerticalContainer>
                    <ProfileHeader />
                    <GeneralErrorHandler
                      NetworkStatusNotifier={
                        NetworkStatusNotifier
                      }
                    />
                    <CoolBoard
                      boardId={match.params.id}
                    />
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
                    <FullVerticalContainer>
                      <p>
                        Please wait, trying to authenticate ...
                        If it did not work, you can go back to the
                        <Link to="/">main page</Link>
                      </p>
                    </FullVerticalContainer>
                  );
                }}
              />

              { /*
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
                */
              }

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
                    <p>
                      Please wait, logging out ...
                      You will be re-directed to the
                      <Link to="/">main page</Link>
                    </p>
                  );
                }}
              />
              <Route
                path="/callback"
                render={props => {
                  handleAuthentication(props);
                  return (
                    <FullVerticalContainer>
                      <ProfileHeader />
                      <GeneralErrorHandler
                        NetworkStatusNotifier={
                          NetworkStatusNotifier
                        }
                      />
                      <Auth0Callback {...props} />;
                    </FullVerticalContainer>
                  );
                }}
              />
            </Switch>
          </ApolloProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
