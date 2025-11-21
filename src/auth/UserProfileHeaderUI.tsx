'use client';

import { useApolloClient } from '@apollo/client/react';
import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Button, Flex } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { LoginButton } from 'auth/LoginButton';
import { ColorModeButton } from 'components/ui/color-mode';

export const UserProfileHeaderUI = () => {
  const apolloClient = useApolloClient();
  const { signOut } = useClerk();
  const { replace } = useRouter();

  async function awaitLogoutAndCacheClear(event: MouseEvent) {
    event.preventDefault();
    await signOut();
    await apolloClient.clearStore?.();
    await replace('/boards');
  }

  return (
    <>
      <SignedOut>
        <LoginButton />
        <ColorModeButton />
      </SignedOut>
      <SignedIn>
        <Flex alignItems="center" gap="0.5em">
          <ColorModeButton />
          <UserButton />
          <Button
            // @ts-expect-error it is an async function.
            onClick={awaitLogoutAndCacheClear}
            data-cy="sign-out-button">
            <FaSignOutAlt />
            Sign Out
          </Button>
        </Flex>
      </SignedIn>
    </>
  );
};
