import React from 'react';
import { SignInButton } from '@clerk/nextjs';
import { Button } from 'semantic-ui-react';

export function LoginButton() {
  return (
    <SignInButton mode="modal" redirectUrl={window.location.href}>
      <Button
        compact
        data-cy="sign-in-button"
        icon="sign in"
        content="Log in"
      />
    </SignInButton>
  );
}
