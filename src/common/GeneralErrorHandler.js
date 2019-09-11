import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Icon, Message } from 'semantic-ui-react';

// Error name, used on the server side, too
const NotAuthorizedError = 'NotAuthorizedError';

export const GeneralErrorHandler = ({
  NetworkStatusNotifier,
  auth,
}) => (
  <NetworkStatusNotifier
    render={({ error }) => {
      if (error) {
        const { graphQLErrors, networkError } = error;

        const Relogin = () => (!auth.isAuthenticated()) &&<div>
          <span>Not authenticated.</span>
          <Button onClick={() => {
            auth.refresh()
          }}>
            Please re-login / refresh auth
          </Button>
        </div>

        if (graphQLErrors) {
          const notAuthErr = graphQLErrors.find(
            err => err.name === NotAuthorizedError
          );

          if (notAuthErr) {
            debugger

            return (
              <Message error>
                <Relogin />
                <strong>
                  You will need to be authenticated
                  to see or create Boards or change
                  any items.
                </strong>
                <p>
                  Please
                  <Link to="/login">
                    <Icon size="big" name="sign in" />Log in
                  </Link>
                </p>
              </Message>
            );
          }

          return (
            <Message error>
              <Relogin />
              {
                graphQLErrors
                .filter(error => error.message)
                .map(error => error.message)
                .map((message, idx) => (
                  <p key={idx}>{message}</p>
                ))
              }
            </Message>
          );
        } else if (networkError) {
          return (
            <Message error>
              <Relogin />
              <p>
                <strong>Network Error:</strong>{' '}
                {networkError.message}
              </p>
            </Message>
          );
        }

        console.log('unknown error!', error);
        return (
          <Message error>
            <Relogin />
            <strong>Unknown error!</strong>
            <p>
              You could find more details in the
              browser console.
            </p>
          </Message>
        );
      }
      // do not render anything, when there is no error above
      return false;
    }}
  />
);
