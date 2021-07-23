import React, { lazy, Suspense } from 'react';
import { Loader } from 'semantic-ui-react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import Auth from './authentication/auth';
import Home from '../pages/home/Home';
import { setupGraphQLClient } from './setupGraphQLClient';
import { trackPage } from './common/tracking';

let client = setupGraphQLClient();

export const auth = new Auth();

export const authRefresh = async () => {
  return auth.refresh();
};

export const App = () => (
  <div className="App">
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Switch>
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
              */
          }


        </Switch>
      </Suspense>
    </BrowserRouter>
  </div>
);
