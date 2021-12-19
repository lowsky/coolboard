import Link from 'next/link';
import React, { useState } from 'react';

import { Button, Icon, Message, } from 'semantic-ui-react';
import { hasExpirationSet, isExpired, } from '../authentication/checkExpiration';
import { useApolloNetworkStatus } from '../setupGraphQLClient';
import {authRefresh} from "../App";

const ErrorMessage = ({ children }) => (
  <Message error style={{ flexShrink: 0 }}>
    {children}
  </Message>
);

function ReLoginButton({ authRefresh }) {
  const [loading, setLoading] = useState(false);
  if(!!authRefresh &&
    hasExpirationSet() &&
    isExpired() ) {
    return <div>
      <Button
        loading={loading}
        compact={true}
        onClick={async() => {
          setLoading(true)
          try {
            await authRefresh();
            setLoading(false);
            window.history.go(0); // refresh page
          } catch(e) {
            console.error(e);
          }
          setLoading(false)
        }}>
        Refresh
      </Button>{' '}
      the security token.
    </div>
  }
  return null;
}

export const GeneralErrorHandler = () => {
  const {
    queryError,
    mutationError,
  } = useApolloNetworkStatus();

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
          // @ts-ignore
          err.extensions?.exception?.name === 'NotAuthorizedError' ||
          err.message?.startsWith('Not authorized')
      );

      if (notAuthErr) {
        if(!localStorage.getItem('expires_at')) {
          return <Message  style={{ flexShrink: 0 }}>
            <strong>
              You will need to be authenticated to see
              or create Boards or change any items.
            </strong>
            <p>
              You can <Link href="/login">
                <a>
                  <Icon size="big" name="sign in"/>
                  Sign in
                </a>
              </Link>
              via Auth0 service.
            </p>
          </Message>
        }

        return (
          <ErrorMessage>
            <ReLoginButton authRefresh={authRefresh} />
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
          ).length > 0 && <ReLoginButton authRefresh={authRefresh} />}
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
          <ReLoginButton authRefresh={authRefresh} />
          <p>
            <strong>Communication with the GraphQL server failed!</strong>
            <span>
              {' '}
              {
                /*(networkError typeof ServerError) ?
                "(Status: {networkError?.statusCode}" :
                ""
                 */
              }
              - find technical details in browser console)
              </span>
            <br/>
            Please, retry by reloading the page.
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
  return null;
};
