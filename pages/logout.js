import Link from "next/link";
import { useRouter } from "next/router";
import React from 'react';

import { auth } from "../src/App";
import { FullVerticalContainer } from "../src/common/FullVerticalContainer";

import { trackPage } from '../src/common/tracking';
import { setupGraphQLClient } from "../src/setupGraphQLClient";

const client = setupGraphQLClient();

export default function Logout( ) {
  const router = useRouter();
  trackPage('logout');

  if(typeof localStorage !== 'undefined') {
    localStorage.removeItem('token');
  }

  client.resetStore().then(() => {
    auth.logout();
    router.push(`/`);
  });

  return (
    <FullVerticalContainer data-cy="logout-full-container">
      <p>
        Please wait, logging-out in
        progress ... If it did not work,
        back to the
        <Link href="/">
          <a>main page</a>
        </Link>
      </p>
    </FullVerticalContainer>
  );
}
