import React from 'react';

import { Link } from 'react-router-dom';

import {
  Button,
  Icon,
  Message,
} from 'semantic-ui-react';

import { useApolloNetworkStatus } from 'react-apollo-network-status';
import { isExpired } from '../authentication/checkExpiration';

// Error name, used on the server side, too
const NotAuthorizedError = 'NotAuthorizedError';

export const GeneralErrorHandler = ({ authRefresh }) => {
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
        <Button compact={true}
          onClick={async () => {
            await authRefresh();
             window.history.go(0)
          }}>
          Refresh
        </Button> the security token.
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
            {
              isExpired() && <Relogin />
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

      const errorMsgs = graphQLErrors
        .filter(error => error.message)
        .map(error => error.message);

      console.log(errorMsgs);

      return (
        <Message error>
          {errorMsgs.filter(msg=>(msg.indexOf('jwt expired')>=0)).length>0 && <Relogin />}
          <strong>Error:</strong>
          {errorMsgs
            .map((message, idx) => (
              <span key={idx}>{message}</span>
            ))}
        </Message>
      );
    } else if (networkError) {
      return (
        <Message error>
          {isExpired() && <Relogin />}
          <p>
            <strong>Network Error:</strong>{' '}
            {networkError.message}
          </p>
        </Message>
      );
    }

    console.error('unknown general error, do not know how to handle:', {queryError, mutationError});
  }

  // do not render anything, when there is no error above
  return false;
};
