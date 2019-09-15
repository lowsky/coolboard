import React from 'react';

import { Link } from 'react-router-dom';

import {
  Button,
  Icon,
  Message,
} from 'semantic-ui-react';

import { useApolloNetworkStatus } from 'react-apollo-network-status';

// Error name, used on the server side, too
const NotAuthorizedError = 'NotAuthorizedError';

export const GeneralErrorHandler = ({ auth }) => {
  const {
    // numPendingQueries,
    // numPendingMutations,
    queryError,
    mutationError,
  } = useApolloNetworkStatus();

  if (queryError || mutationError) {
    const { networkError, graphQLErrors } = {
      ...mutationError,
      ...queryError,
    };

    const Relogin = () => (
      <div>
        <span>
          Or just after{' '}
          <strong>some time of inactivity</strong>,
          simply
        </span>
        <Button
          onClick={() => {
            auth.refresh();
          }}>
          auto-refresh security token
        </Button>
      </div>
    );

    if (graphQLErrors) {
      const notAuthErr = graphQLErrors.find(
        err =>
          err.name === NotAuthorizedError ||
          err.message === 'Not authorized'
      );

      if (notAuthErr) {
        return (
          <Message error>
            {<Relogin />
            }
            {(
              <>
                <strong>
                  You will need to be authenticated to
                  see or create Boards or change any
                  items.
                </strong>
                <p>
                  Please
                  <Link to="/login">
                    <Icon size="big" name="sign in" />
                    Log in
                  </Link>
                </p>
              </>
            )}
          </Message>
        );
      }

      return (
        <Message error>
          {graphQLErrors
            .filter(error => error.message)
            .map(error => error.message)
            .map((message, idx) => (
              <p key={idx}>{message}</p>
            ))}
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

    console.log('unknown general error, do not know how to handle:', {queryError, mutationError});
  }

  // do not render anything, when there is no error above
  return false;
};
