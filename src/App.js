/* eslint-disable react/prop-types */
import React, { lazy, Suspense } from 'react';

import { Loader } from 'semantic-ui-react';

import { ApolloProvider } from 'react-apollo';
import { ApolloNetworkStatusProvider } from 'react-apollo-network-status';

import { setupGraphQLClient } from './setupGraphQLClient';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import Auth from './authentication/auth';

import { About } from './pages/about/About';
import Home from './pages/home/Home';
import { FullVerticalContainer } from './common/FullVerticalContainer';
import { ProfileHeader } from './common/ProfileHeader';
import { GeneralErrorHandler } from './common/GeneralErrorHandler';

const CoolBoard = lazy(() =>
  import('./components/CoolBoard').then(module => ({
    default: module.CoolBoard,
  }))
);
const Boards = lazy(() =>
  import('./components/Boards').then(module => ({
    default: module.Boards,
  }))
);

const {
  client,
  NetworkStatusNotifier,
} = setupGraphQLClient();

const auth = new Auth(client);

export const App = () => (
  <div className="App">
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ApolloProvider client={client}>
          <ApolloNetworkStatusProvider>
          <Switch>
            <Route
              exact
              path="/boards"
              render={() => (
                <FullVerticalContainer data-cy="boards-full-container">
                  <ProfileHeader isBoardsPage />
                  <GeneralErrorHandler auth={auth}
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
                <GeneralErrorHandler auth={auth}
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
            <Route
              path="/"
              exact
              render={() => <Home />}
            />
          </Switch>

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
                  <ApolloProvider client={client}>
                    <ApolloNetworkStatusProvider>
                    <ProfileHeader />
                    <GeneralErrorHandler auth={auth}
                      NetworkStatusNotifier={
                        NetworkStatusNotifier
                      }
                    />
                    <div>
                      <Loader active>
                        Authenticating...
                      </Loader>
                    </div>
                    </ApolloNetworkStatusProvider>
                  </ApolloProvider>
                </FullVerticalContainer>
              );
            }}
          />
          <Route
            exact
            path="/about"
            render={() => <About />}
          />
          </ApolloNetworkStatusProvider>
        </ApolloProvider>
      </Suspense>
    </BrowserRouter>
  </div>
);
