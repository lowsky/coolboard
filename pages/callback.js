import React from 'react';

import Home from './home/Home';
import { trackPage } from '../src/common/tracking';
import Link from "next/link";
import { Loader } from "semantic-ui-react";
import { setupGraphQLClient } from "../src/setupGraphQLClient";
import FullPageWithApollo from "../src/common/FullPageWithApollo";

const client = setupGraphQLClient();

import Auth from '../src/authentication/auth';

new Auth()
export default function Callback() {
  trackPage('Home');

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
