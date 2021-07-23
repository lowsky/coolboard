import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from 'react';

import { auth } from "../src/App";
import { FullVerticalContainer } from "../src/common/FullVerticalContainer";

import { trackPage } from '../src/common/tracking';
import { setupGraphQLClient } from "../src/setupGraphQLClient";

const client = setupGraphQLClient();

export default function Logout() {
  const router = useRouter();

  trackPage('logout');

  useEffect(() => {
    async function removeToken() {
      localStorage?.removeItem('token');

      await client.resetStore().then(() => {
        auth.logout();
        router.push(`/`);
      });
    }

    return removeToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
