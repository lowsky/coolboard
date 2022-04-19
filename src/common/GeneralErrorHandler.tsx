import React from 'react';
import { ServerError, ServerParseError } from '@apollo/client';

import { Message } from 'semantic-ui-react';
import { useApolloNetworkStatus } from '../setupGraphQLClient';
import LoginButton from '../auth/LoginButton';

const ErrorMessage = ({ children }) => (
  <Message error style={{ flexShrink: 0 }}>
    {children}
  </Message>
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
            <p>
              You will need to be authenticated to see or create Boards or
              change any items...
            </p>
            <strong>
              Registration failed. One reason may be that another user already
              exist with the same email.
            </strong>
            <p>
              Retry to <LoginButton /> or <br />
              <strong>contact the support</strong>
            </p>
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
          <Message style={{ flexShrink: 0, gap: '0.5rem' }}>
            <strong>
              You will need to be authenticated to see or create Boards or
              change any items.
            </strong>
            <LoginButton />
          </Message>
        );
      }

      const errorMsgs = graphQLErrors
        .filter((error) => error.message)
        .map((error) => error.message);

      return (
        <ErrorMessage>
          <strong>Error:</strong>{' '}
          {errorMsgs.map((message, idx) => (
            <span key={idx}>{message}</span>
          ))}
        </ErrorMessage>
      );
    } else if (networkError) {
      console.log({ networkError });

      if (
        (networkError as ServerError | ServerParseError)?.statusCode === 401
      ) {
        return (
          <ErrorMessage>
            <p>
              <strong>User not authorized!</strong>
            </p>
            <p>
              <LoginButton />
            </p>
          </ErrorMessage>
        );
      }

      return (
        <ErrorMessage>
          <p>
            <strong>Communication with the GraphQL server failed!</strong>
            <span>
              {' '}
              {/*(networkError typeof ServerError) ?
                "(Status: {networkError?.statusCode}" :
                ""
                 */}
              - find technical details in browser console)
            </span>
            <br />
            Please, retry by reloading the page.
          </p>
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
