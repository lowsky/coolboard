import React from 'react';
import { useApolloClient } from '@apollo/client';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useRouter } from 'next/router';
import { Button, Flex, Spinner, useColorMode } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { LoginButton } from 'auth/LoginButton';

export const UserProfileHeaderUI = () => {
  const apolloClient = useApolloClient();
  const { signOut } = useClerk();
  const { replace } = useRouter();
  const { colorMode } = useColorMode();

  const clerkAppearance = colorMode === 'dark' ? { baseTheme: dark } : {};

  async function awaitLogoutAndCacheClear(event: MouseEvent) {
    event.preventDefault();
    await apolloClient.clearStore?.();
    await signOut();
    await replace('/boards');
  }

  return (
    <>
      <ClerkLoading>
        <Spinner />
        Loading user...
      </ClerkLoading>

      <ClerkLoaded>
        <SignedOut>
          <LoginButton />
        </SignedOut>
      </ClerkLoaded>

      <SignedIn>
        <Flex alignItems="center" gap="0.5em">
          <UserButton appearance={clerkAppearance} afterSignOutUrl="/" />
          <Button
            // @ts-expect-error it is an async function.
            onClick={awaitLogoutAndCacheClear}
            data-cy="sign-out-button"
            leftIcon={<FaSignOutAlt />}
            color="unset">
            Sign Out
          </Button>
        </Flex>
      </SignedIn>
    </>
  );
};
