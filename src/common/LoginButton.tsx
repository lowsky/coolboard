import React from 'react';
import { SignInButton } from '@clerk/nextjs';
import { Button, Icon } from 'semantic-ui-react';
import { FaSignInAlt } from 'react-icons/fa';

export function LoginButton() {
  return (
    <SignInButton mode="modal" redirectUrl={window.location.href}>
      <Button data-cy="sign-in-button" compact>
        <Icon>
          <FaSignInAlt />
        </Icon>
        Log in
      </Button>
    </SignInButton>
  );
}
