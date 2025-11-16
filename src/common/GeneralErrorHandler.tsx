import { type ReactNode } from 'react';
import type { ServerError, ServerParseError } from '@apollo/client';
import { Alert } from '@chakra-ui/react';

//import { useApolloNetworkStatus } from '../setupGraphQLClient';
import { LoginButton } from 'auth/LoginButton';

const ErrorMessage = ({
  children,
  status = 'error',
}: {
  children: ReactNode;
  status?: 'error' | 'info' | 'warning' | 'success' | 'neutral' | undefined;
}) => (
  <Alert.Root status={status}>
    <Alert.Indicator />
    <Alert.Content>{children}</Alert.Content>
  </Alert.Root>
);

export const GeneralErrorHandler = () => {
  // @ts-expect-error xxx
  const { queryError, mutationError } = {}; //useApolloNetworkStatus();
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
            <Alert.Title>
              Registration failed. One reason may be that another user already
              exist with the same email.
            </Alert.Title>
            <Alert.Description>
              You will need to be authenticated to see or create Boards or
              change any items...
            </Alert.Description>
            <Alert.Description>
              Retry to <LoginButton /> or <br />
              <strong>contact the support</strong>
            </Alert.Description>
          </ErrorMessage>
        );
      }
      const notAuthErr = (graphQLErrors || []).find(
        (err) =>
          // _@ts-expect-error name is not defined
          err.extensions?.exception?.name === 'NotAuthorizedError' ||
          err.message?.startsWith('Not authorized')
      );

      if (notAuthErr) {
        return (
          <ErrorMessage status="info">
            <Alert.Title>
              You will need to be authenticated to see or create Boards or
              change any items.
            </Alert.Title>
            <LoginButton />
          </ErrorMessage>
        );
      }

      const errorMsgs = graphQLErrors
        .filter((error) => error.message)
        .map((error) => error.message);

      return (
        <ErrorMessage>
          <Alert.Title>Error:</Alert.Title>
          <Alert.Description>
            {errorMsgs.map((message, idx) => (
              <span key={idx}>{message}</span>
            ))}
          </Alert.Description>
        </ErrorMessage>
      );
    } else if (networkError) {
      console.log({ networkError });

      if (
        (networkError as ServerError | ServerParseError)?.statusCode === 401
      ) {
        return (
          <ErrorMessage status="error">
            <Alert.Title>User not authorized!</Alert.Title>
            <Alert.Description>
              <LoginButton />
            </Alert.Description>
          </ErrorMessage>
        );
      }

      return (
        <ErrorMessage>
          <Alert.Title>
            Communication with the GraphQL server failed!
          </Alert.Title>
          <Alert.Description>
            <span>- find technical details in browser console</span>
            <br />
            Please, retry by reloading the page.
          </Alert.Description>
        </ErrorMessage>
      );
    }

    console.error('unknown general error, do not know how to handle:', {
      queryError,
      mutationError,
    });
  }

  // Do not render anything, when there is no error above
  return null;
};
