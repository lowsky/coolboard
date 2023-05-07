import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useApolloClient } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Flex,
  Spinner,
  useColorMode,
} from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  useClerk,
  UserButton,
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { LoginButton } from './LoginButton';

const ProfileHeaderContainer = ({
  children,
  isBoardsPage = false,
}: {
  children: ReactNode;
  isBoardsPage?: boolean;
}) => (
  <Container maxW="100%" variant="header">
    <Flex
      alignItems="center"
      placeContent="space-between"
      data-cy="profile-header">
      <Box gap="2rem" display="flex">
        {isBoardsPage && <Link href="/">Home</Link>}
        {!isBoardsPage && <Link href="/boards">Boards</Link>}
        <Link href="/about">About</Link>
      </Box>

      {children}
    </Flex>
  </Container>
);

export const ProfileHeader = ({
  isBoardsPage = false,
}: {
  isBoardsPage?: boolean;
}) => {
  const { replace } = useRouter();

  const apolloClient = useApolloClient();
  const { signOut } = useClerk();

  const { colorMode } = useColorMode();
  const clerkAppearance = colorMode === 'dark' ? { baseTheme: dark } : {};

  return (
    <ProfileHeaderContainer isBoardsPage={isBoardsPage}>
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
          <UserButton appearance={clerkAppearance} showName />
          <Button
            onClick={async (event) => {
              event.preventDefault();
              await apolloClient.clearStore?.();
              await signOut();
              await replace('/boards');
            }}>
            <Button
              data-cy="sign-out-button"
              leftIcon={<FaSignOutAlt />}
              color="unset">
              Sign Out
            </Button>
          </Button>
        </Flex>
      </SignedIn>
    </ProfileHeaderContainer>
  );
};
