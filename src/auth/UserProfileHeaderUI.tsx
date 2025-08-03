import React from 'react';
import { useApolloClient } from '@apollo/client';
import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useRouter } from 'next/router';
import { Button, Flex } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { LoginButton } from 'auth/LoginButton';
import { useTheme } from 'next-themes';
import { ColorModeButton } from 'components/ui/color-mode';

export const UserProfileHeaderUI = () => {
  const apolloClient = useApolloClient();
  const { signOut } = useClerk();
  const { replace } = useRouter();
  const colorMode = useTheme().resolvedTheme;

  const clerkAppearance = colorMode === 'dark' ? { baseTheme: dark } : {};

  async function awaitLogoutAndCacheClear(event: MouseEvent) {
    event.preventDefault();
    await apolloClient.clearStore?.();
    await signOut();
    await replace('/boards');
  }

  return (
    <>
      <>
        {
          // @ts-expect-error Its return type 'Promise<any>' is not a valid JSX element.
          <SignedOut>
            <LoginButton />
            <ColorModeButton />
          </SignedOut>
        }
      </>
      {
        // @ts-expect-error Its return type 'Promise<any>' is not a valid JSX element.
        <SignedIn>
          <Flex alignItems="center" gap="0.5em">
            <ColorModeButton />
            <UserButton appearance={clerkAppearance} afterSignOutUrl="/" />
            <Button
              // @ts-expect-error it is an async function.
              onClick={awaitLogoutAndCacheClear}
              data-cy="sign-out-button">
              <FaSignOutAlt />
              Sign Out
            </Button>
          </Flex>
        </SignedIn>
      }
    </>
  );
};
