import React from 'react';
import Link from 'next/link';

import {
  Button,
  Icon,
  Message,
} from 'semantic-ui-react';

import { useApolloNetworkStatus } from '../setupGraphQLClient';
import {
  hasExpirationSet,
  isExpired,
} from '../authentication/checkExpiration';

const ErrorMessage = ({ children }) => (
  <Message error style={{ flexShrink: 0 }}>
    {children}
  </Message>
);

export const GeneralErrorHandler = ({
  authRefresh,
}) => {
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

    const Relogin = () =>
      !!authRefresh &&
      hasExpirationSet() &&
      isExpired() && (
        <div>
          <Button
            compact={true}
            onClick={async () => {
              await authRefresh();
              window.history.go(0); // refresh page
            }}>
            Refresh
          </Button>{' '}
          the security token.
        </div>
      );

    if (graphQLErrors) {
      const registrationFailed = graphQLErrors.find(
        (err) => err.name === 'RegistrationFailed'
      );

      if (registrationFailed) {
        return (
          <ErrorMessage>
            <p>
              You will need to be authenticated to see
              or create Boards or change any items...
            </p>
            <strong>
              Registration failed. One reason may be
              that another user already exist with the
              same email.
            </strong>
            <p>
              Please try to
              <Link href="/login">
                <a>
                  <Icon size="big" name="sign in"/>
                  Log in
                </a>
              </Link>{' '}
              again or <br/>
              <strong>contact the support</strong>
            </p>
          </ErrorMessage>
        );
      }
      const notAuthErr = (graphQLErrors || []).find(
        (err) =>
          err.extension?.exception?.name === 'NotAuthorizedError' ||
          err.message?.startsWith('Not authorized')
      );

      if (notAuthErr) {
        return (
          <ErrorMessage>
            <Relogin />
            <strong>
              You will need to be authenticated to see
              or create Boards or change any items.
            </strong>
            <p>
              Please
              <Link href="/login">
                <a>
                  <Icon size="big" name="sign in"/>
                  Log in
                </a>
              </Link>
            </p>
          </ErrorMessage>
        );
      }

      const errorMsgs = graphQLErrors
        .filter((error) => error.message)
        .map((error) => error.message);

      return (
        <ErrorMessage>
          {errorMsgs.filter(
            (msg) => msg.indexOf('jwt expired') >= 0
          ).length > 0 && <Relogin />}
          <strong>Error:</strong>{' '}
          {errorMsgs.map((message, idx) => (
            <span key={idx}>{message}</span>
          ))}
        </ErrorMessage>
      );
    } else if (networkError) {
      return (
        <ErrorMessage>
          <Relogin />
          <p>
            <strong>Network Error:</strong>
            {networkError.message}
          </p>
        </ErrorMessage>
      );
    }

    console.error(
      'unknown general error, do not know how to handle:',
      { queryError, mutationError }
    );
  }

  // do not render anything, when there is no error above
  return false;
};
