import React, { ReactNode } from 'react';
import { Container, Icon, Loader } from 'semantic-ui-react';
import Link from 'next/link';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignOutButton,
  SignedOut,
} from '@clerk/clerk-react';
import { UserButton } from '@clerk/nextjs';

import LoginButton from '../auth/LoginButton';

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

export const ClerkProfileHeader = () => {
  return (
    <>
      <SignedOut>Logout</SignedOut>
      <UserButton />
    </>
  );
};
export const ProfileHeader = ({ isBoardsPage }: { isBoardsPage?: boolean }) => {
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
        <div>
          <UserButton />
          <SignOutButton>Logout</SignOutButton>
        </div>
      </SignedIn>
    </ProfileHeaderContainer>
  );
};
