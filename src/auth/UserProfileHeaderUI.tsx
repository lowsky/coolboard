import React from 'react';
import { SignedIn, SignedOut, useClerk, UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useRouter } from 'next/router';
import { Button, Flex, useColorMode } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { LoginButton } from 'auth/LoginButton';

export const UserProfileHeaderUI = () => {
  const { signOut } = useClerk();
  const { replace } = useRouter();
  const { colorMode } = useColorMode();

  const clerkAppearance = colorMode === 'dark' ? { baseTheme: dark } : {};

  async function awaitLogoutAndCacheClear(event: MouseEvent) {
    event.preventDefault();
    await signOut();
    await replace('/boards');
  }

  return (
    <>
      <>
        {
          <SignedOut>
            <LoginButton />
          </SignedOut>
        }
      </>
      {
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
      }
    </>
  );
};
