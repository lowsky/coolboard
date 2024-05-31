import React from 'react';
import { SignInButton } from '@clerk/nextjs';
import { Button } from '@chakra-ui/react';
import { FaSignInAlt } from 'react-icons/fa';

export function LoginButton() {
  return (
    <SignInButton>
      <Button data-cy="sign-in-button">
        <FaSignInAlt />
        Log in
      </Button>
    </SignInButton>
  );
}
