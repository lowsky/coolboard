import React from 'react';

import { trackPage } from '../src/common/tracking';
import { FullVerticalContainer } from '../src/common/FullVerticalContainer';
import Link from 'next/link';
import { login } from '../src/App';
import { setupGraphQLClient } from '../src/setupGraphQLClient';

const client = setupGraphQLClient();

export default function Login() {
  trackPage('login');
  client
    .resetStore()
    .then(async () => {
      await login();
    })
    .catch((ignoredError) => {
      console.error('error while loggin in will be ignored', ignoredError);
      // noinspection JSIgnoredPromiseFromCall - just trigger login, without waiting for result
      login();
    });

  return (
    <FullVerticalContainer data-cy="login-full-container">
      <p>
        Please wait, trying to authenticate ...
        <br />
        If it did not work, you can go back to the{' '}
        <Link href={'/'}>
          <a>main page</a>
        </Link>{' '}
        or reload the page.
      </p>
    </FullVerticalContainer>
  );
}
