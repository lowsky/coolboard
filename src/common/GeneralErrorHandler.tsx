import React from 'react';

import { Icon, Message } from 'semantic-ui-react';
import { useApolloNetworkStatus } from '../setupGraphQLClient';

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
              Please try to
              <a href="/api/auth/login?returnTo=/boards">
                <Icon size="big" name="sign in" />
                Log in
              </a>{' '}
              again or <br />
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
        if (!localStorage.getItem('expires_at')) {
          return (
            <Message style={{ flexShrink: 0 }}>
              <strong>
                You will need to be authenticated to see or create Boards or
                change any items.
              </strong>
              <p>
                You can{' '}
                <a href="/api/auth/login?returnTo=/boards">
                  <Icon size="big" name="sign in" />
                  Sign in
                </a>
                via Auth0 service.
              </p>
            </Message>
          );
        }

        return (
          <ErrorMessage>
            <strong>
              You will need to be authenticated to see or create Boards or
              change any items.
            </strong>
            <p>
              Please
              <a href="/api/auth/login?returnTo=/boards">
                <Icon size="big" name="sign in" />
                Log in
              </a>
            </p>
          </ErrorMessage>
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
