import React from 'react';
import { ServerError, ServerParseError } from '@apollo/client';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

import { useApolloNetworkStatus } from '../setupGraphQLClient';
import { LoginButton } from './LoginButton';

const ErrorMessage = ({ children }) => (
  <Alert status="error" style={{ flexShrink: 0 }}>
    <AlertIcon />
    {children}
  </Alert>
);

export const GeneralErrorHandler = () => {
  const { queryError, mutationError } = useApolloNetworkStatus();

  if (queryError || mutationError) {
    const { networkError, graphQLErrors } = {
      ...mutationError,
      ...queryError,
    };

    if (graphQLErrors) {
      const registrationFailed = graphQLErrors.find(
        (err) => err.name === 'RegistrationFailed'
      );

      if (registrationFailed) {
        return (
          <ErrorMessage>
            <AlertTitle>
              Registration failed. One reason may be that another user already
              exist with the same email.
            </AlertTitle>
            <AlertDescription>
              You will need to be authenticated to see or create Boards or
              change any items...
            </AlertDescription>
            <AlertDescription>
              Retry to <LoginButton /> or <br />
              <strong>contact the support</strong>
            </AlertDescription>
          </ErrorMessage>
        );
      }
      const notAuthErr = (graphQLErrors || []).find(
        (err) =>
          // @ts-ignore
          err.extensions?.exception?.name === 'NotAuthorizedError' ||
          err.message?.startsWith('Not authorized')
      );

      if (notAuthErr) {
        return (
          <Alert status="info" style={{ flexShrink: 0, gap: '0.5rem' }}>
            <AlertTitle>
              You will need to be authenticated to see or create Boards or
              change any items.
            </AlertTitle>
            <LoginButton />
          </Alert>
        );
      }

      const errorMsgs = graphQLErrors
        .filter((error) => error.message)
        .map((error) => error.message);

      return (
        <ErrorMessage>
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>
            {errorMsgs.map((message, idx) => (
              <span key={idx}>{message}</span>
            ))}
          </AlertDescription>
        </ErrorMessage>
      );
    } else if (networkError) {
      console.log({ networkError });

      if (
        (networkError as ServerError | ServerParseError)?.statusCode === 401
      ) {
        return (
          <ErrorMessage>
            <AlertTitle>User not authorized!</AlertTitle>
            <LoginButton />
          </ErrorMessage>
        );
      }

      return (
        <ErrorMessage>
          <AlertTitle>Communication with the GraphQL server failed!</AlertTitle>
          <AlertDescription>
            <span>- find technical details in browser console</span>
            <br />
            Please, retry by reloading the page.
          </AlertDescription>
        </ErrorMessage>
      );
    }

    console.error('unknown general error, do not know how to handle:', {
      queryError,
      mutationError,
    });
  }

  // do not render anything, when there is no error above
  return null;
};
