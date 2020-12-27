/* eslint-disable react/prop-types */
import React, { lazy, Suspense } from 'react';

import { Loader } from 'semantic-ui-react';

import { ApolloProvider } from "@apollo/client";

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
import { trackPage } from './common/tracking';

const CoolBoard = lazy(() =>
  import('./components/CoolBoard').then((module) => ({
    default: module.CoolBoard,
  }))
);

const Boards = lazy(() =>
  import('./components/Boards').then((module) => ({
    default: module.Boards,
  }))
);

let client = setupGraphQLClient();

const auth = new Auth();

const authRefresh = async () => {
  return auth.refresh();
};

const FullPageWithApollo = ({ children }) => {
  return (
    <FullVerticalContainer data-cy="callback-full-container">
      <ApolloProvider client={client}>
        {children}
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
            render={() => {
              trackPage('boards');
              return (
                <FullPageWithApollo client={client}>
                  <ProfileHeader isBoardsPage />
                  <GeneralErrorHandler
                    authRefresh={authRefresh}
                  />
                  <Boards />
                </FullPageWithApollo>
              );
            }}
          />

          <Route
            exact
            path="/board/:id"
            render={({ match }) => {
              trackPage('board ' + match.params.id);
              return (
                <FullPageWithApollo client={client}>
                  <ProfileHeader />
                  <GeneralErrorHandler
                    authRefresh={authRefresh}
                  />
                  <DndProvider backend={HTML5Backend}>
                    <CoolBoard
                      boardId={match.params.id}
                    />
                  </DndProvider>
                </FullPageWithApollo>
              );
            }}
          />

          <Route
            exact
            path="/login"
            render={() => {
              trackPage('login');
              client.resetStore().then(() => {
                auth.login();
              }).catch(ignoredError => {
                auth.login();
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
            render={() => {
              trackPage('root');
              return <Home />;
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
              trackPage('logout');
              localStorage.removeItem('token');

              client.resetStore().then(() => {
                auth.logout();
                history.push(`/`);
              });

              return (
                <FullVerticalContainer data-cy="logout-full-container">
                  <p>
                    Please wait, logging-out in
                    progress ... If it did not work,
                    back to the
                    <Link to="/">main page</Link>
                  </p>
                </FullVerticalContainer>
              );
            }}
          />
          <Route
            path="/callback"
            render={() => (
              <FullPageWithApollo client={client}>
                <p data-cy="login-in-progress">
                  Please wait, logging-in ... You will
                  be re-directed to the
                  <Link to="/">main page</Link>
                  automatically.
                </p>

                <div>
                  <Loader active>
                    Authenticating...
                  </Loader>
                </div>
              </FullPageWithApollo>
            )}
          />
          <Route
            exact
            path="/about"
            render={() => {
              trackPage('about');
              return (
                <ApolloProvider client={client}>
                  <About />
                </ApolloProvider>
              );
            }}
          />
        </Switch>
      </Suspense>
    </BrowserRouter>
  </div>
);
