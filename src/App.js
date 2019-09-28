/* eslint-disable react/prop-types */
import React, { lazy, Suspense } from 'react';

import { Loader } from 'semantic-ui-react';

import { ApolloProvider } from 'react-apollo';
import { ApolloNetworkStatusProvider } from 'react-apollo-network-status';

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

import { setupGraphQLClient } from './setupGraphQLClient';

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

let client = setupGraphQLClient();

const auth = new Auth();

const FullPageWithApollo = ({ children }) => {
  return (
    <FullVerticalContainer data-cy="callback-full-container">
      <ApolloProvider client={client}>
        <ApolloNetworkStatusProvider>{children}</ApolloNetworkStatusProvider>
      </ApolloProvider>
    </FullVerticalContainer>
  );
};

export const App = () => (
  <div className="App">
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route
            exact
            path="/boards"
            render={() => (
              <FullPageWithApollo client={client}>
                <ProfileHeader />
                <GeneralErrorHandler auth={auth} />
                  <Boards />
              </FullPageWithApollo>
            )}
          />

          <Route
            exact
            path="/board/:id"
            render={({ match }) => (
              <FullPageWithApollo client={client}>
                <ProfileHeader />
                <GeneralErrorHandler auth={auth}
                />
                <DndProvider backend={HTML5Backend}>
                  <CoolBoard
                    boardId={match.params.id}
                  />
                </DndProvider>
              </FullPageWithApollo>
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
            render={() => (
              <FullPageWithApollo client={client}>
                <ProfileHeader/>
                <GeneralErrorHandler auth={auth}/>
                <div>
                  <Loader active>Authenticating...</Loader>
                </div>
              </FullPageWithApollo>
            )}
          />
          <Route
            exact
            path="/about"
            render={() => (
              <ApolloProvider client={client}>
                <About />
              </ApolloProvider>
            )}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </div>
);
