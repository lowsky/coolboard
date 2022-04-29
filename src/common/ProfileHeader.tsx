import React, { ReactNode } from 'react';
import { Button, Container, Icon, Loader } from 'semantic-ui-react';
import Link from 'next/link';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignOutButton,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import { LoginButton } from './LoginButton';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';

const ProfileHeaderContainer = ({
  children,
  isBoardsPage,
}: {
  children: ReactNode;
  isBoardsPage?: boolean;
}) => (
  <Container
    fluid
    textAlign="right"
    style={{
      color: 'white',
      padding: '1em',
      background: 'lightgrey',
    }}>
    <div
      data-cy="profile-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        placeContent: 'space-between',
      }}>
      {isBoardsPage && (
        <Link href="/">
          <a>
            <Icon size="big" name="home" />
            Home
          </a>
        </Link>
      )}
      {!isBoardsPage && (
        <Link href="/boards">
          <a>
            <Icon size="big" name="list" />
            Boards
          </a>
        </Link>
      )}

      <Link href="/about">
        <a>
          <Icon size="big" name="question" />
          About
        </a>
      </Link>

      {children}
    </div>
  </Container>
);

export const ProfileHeader = ({ isBoardsPage }: { isBoardsPage?: boolean }) => {
  const apolloClient = useApolloClient();
  const { reload } = useRouter();

  return (
    <ProfileHeaderContainer isBoardsPage={isBoardsPage}>
      <ClerkLoading>
        <Loader active />
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
            <Button
              compact
              data-cy="sign-out-button"
              icon="sign out"
              content="Sign Out"
            />
          </SignOutButton>
        </div>
      </SignedIn>
    </ProfileHeaderContainer>
  );
};
