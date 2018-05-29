import React from 'react';

import { Link } from 'react-router-dom';

import { Message } from 'semantic-ui-react';

// Error name, used on the server side, too
const NotAuthorizedError = 'NotAuthorizedError';

export const GeneralErrorHandler = ({
  NetworkStatusNotifier,
}) => (
  <NetworkStatusNotifier
    render={({ error }) => {
      if (error) {
        const { graphQLErrors, networkError } = error;
        if (graphQLErrors) {
          const notAuthErr = graphQLErrors.find(
            err => err.name === NotAuthorizedError
          );

          if (notAuthErr) {
            return (
              <React.Fragment>
                <Message error>
                  <strong>
                    You will need to be authenticated
                    to see or create Boards or change
                    any items.
                  </strong>
                  <p>
                    Please click
                    <Link to="/login">Log in</Link>
                    to log-in!
                  </p>
                  <p></p>
                </Message>

                <div style={{
                    border: 'solid 1px grey',
                    background: '#ddd',
                    textAlign: 'left',
                    padding: '8px',
                }}>
                  <p>
                    We are using the service of
                    <a href="https://auth0.com/">
                      Auth0
                    </a>
                    to allow signing-in via OAuth using
                    Google/Twitter or email/password
                    automatically.
                  </p>
                  <p>
                    <b>About Privacy:</b>
                    <br/>We will
                    use your account information for
                    authenticating
                    and storing your boards under your
                    account.
                    <br/>
                    We might rarely send any emails
                    for notifying about
                    changes related to providing
                    this service (e.g. news, any case
                    of outage or maintenance time) or
                    updated to this.
                  </p>
                </div>
              </React.Fragment>
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
              <p>
                <strong>Network Error:</strong>{' '}
                {networkError.message}
              </p>
            </Message>
          );
        } else {
          console.log('unknown error!', error);
          return (
            <Message error>
              <strong>Unknown error!</strong>
              <p>
                You could find more details in the
                browser console.
              </p>
            </Message>
          );
        }
      }
      // do not render anything, when there is no error above
      return false;
    }}
  />
);
