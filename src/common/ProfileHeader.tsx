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
  SignOutButton,
  UserButton,
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';

import { LoginButton } from './LoginButton';

const ProfileHeaderContainer = ({
  children,
  isBoardsPage,
}: {
  children: ReactNode;
  isBoardsPage?: boolean;
}) => (
  <Container maxW="100%" variant="header">
    <Box
      data-cy="profile-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        placeContent: 'space-between',
      }}>
      <Box gap="2rem" display="flex">
        {isBoardsPage && <Link href="/">Home</Link>}
        {!isBoardsPage && <Link href="/boards">Boards</Link>}
        <Link href="/about">About</Link>
      </Box>

      {children}
    </Box>
  </Container>
);

export const ProfileHeader = ({ isBoardsPage }: { isBoardsPage?: boolean }) => {
  const apolloClient = useApolloClient();
  const { reload } = useRouter();

  const { colorMode } = useColorMode();
  const clerkAppearance = colorMode === 'dark' ? { baseTheme: dark }: {};

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
          <SignOutButton
            signOutCallback={async () => {
              await apolloClient.clearStore?.();
              reload();
            }}>
            <Button
              data-cy="sign-out-button"
              leftIcon={<FaSignOutAlt />}
              color={'unset'}>
              Sign Out
            </Button>
          </SignOutButton>
        </Flex>
      </SignedIn>
    </ProfileHeaderContainer>
  );
};
