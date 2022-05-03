import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useApolloClient } from "@apollo/client";
import { Box, Button, Container, Spinner } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";

import { LoginButton } from "./LoginButton";

const ProfileHeaderContainer = ({
  children,
  isBoardsPage,
}: {
  children: ReactNode;
  isBoardsPage?: boolean;
}) => (
  <Container
    maxW='100%'
    style={{
      padding: '1em',
      background: 'lightgrey',
    }}>
    <Box
      data-cy="profile-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        placeContent: 'space-between',
      }}>
      <Box gap='2rem' display='flex'>
        {isBoardsPage && (
          <Link href="/">
            <a>Home</a>
          </Link>
        )}
        {!isBoardsPage && (
          <Link href="/boards">
            <a>Boards</a>
          </Link>
        )}
        <Link href="/about">
          <a>About</a>
        </Link>
      </Box>

      {children}
    </Box>
  </Container>
);

export const ProfileHeader = ({ isBoardsPage }: { isBoardsPage?: boolean }) => {
  const apolloClient = useApolloClient();
  const { reload } = useRouter();

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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
          }}>
          <UserButton showName />
          <SignOutButton
            signOutCallback={async () => {
              await apolloClient.clearStore?.();
              reload();
            }}>
            <Button data-cy="sign-out-button" leftIcon={<FaSignOutAlt />}>
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </SignedIn>
    </ProfileHeaderContainer>
  );
};
