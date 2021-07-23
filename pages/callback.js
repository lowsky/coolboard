import Link from "next/link";
import React from 'react';
import { Loader } from "semantic-ui-react";

import Auth from '../src/authentication/auth';
import FullPageWithApollo from "../src/common/FullPageWithApollo";

import { trackPage } from '../src/common/tracking';
import { setupGraphQLClient } from "../src/setupGraphQLClient";

const client = setupGraphQLClient();

new Auth()
export default function Callback() {
  trackPage('callback');

  return <FullPageWithApollo client={client}>
    <p data-cy="login-in-progress">
      Please wait, logging-in ... You will
      be re-directed to the
      <Link href="/">
        <a>main page</a>
      </Link>
      automatically.
    </p>

    <div>
      <Loader active>
        Authenticating...
      </Loader>
    </div>
  </FullPageWithApollo>

}
