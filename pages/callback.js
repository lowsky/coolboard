import Link from "next/link";
import React, { useEffect } from 'react';
import { Loader } from "semantic-ui-react";

import Auth from '../src/authentication/auth';

import { FullVerticalContainer } from "../src/common/FullVerticalContainer";

import { trackPage } from '../src/common/tracking';

export default function Callback() {
  trackPage('callback');

  // connect auth0 mechanism only in browser
  useEffect(() => {
    // automatically redirect to / after authentication...:
    new Auth()
  })

  return <FullVerticalContainer data-cy="full-container">
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
        Authenticating... please wait until you get automatically get redirected.
      </Loader>
    </div>
  </FullVerticalContainer>

}
