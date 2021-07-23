import React from 'react';

import { trackPage } from '../src/common/tracking';
import { FullVerticalContainer } from "../src/common/FullVerticalContainer";
import Link from "next/link";
import { auth } from "../src/App";
import { setupGraphQLClient } from "../src/setupGraphQLClient";

const client = setupGraphQLClient();

export default function Login () {
  trackPage('login');
  client.resetStore().then(() => {
    auth.login();
  }).catch(ignoredError => {
    auth.login();
  });

  return (
    <FullVerticalContainer data-cy="login-full-container">
      <p>
        Please wait, trying to authenticate
        ... If it did not work, you can go
        back to the
        <Link href={"/"}>
          <a>main page</a>
        </Link>
      </p>
    </FullVerticalContainer>
  );
}
