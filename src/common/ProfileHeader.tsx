import React, { ReactNode } from 'react';
import { Container, Icon, Image, Loader } from 'semantic-ui-react';
import Link from 'next/link';

import { useUser } from '@auth0/nextjs-auth0';

import { AuthLoading, SignedIn, SignedOut } from '../auth/AuthControl';
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

const UserButton = () => {
  const { user } = useUser();
  if (!user) return null;

  const { picture, name } = user;
  return (
    <>
      <span>{name} </span>;
      {picture && <Image src={picture} avatar spaced alt="user avatar" />}
    </>
  );
};

export const ProfileHeader = ({ isBoardsPage }: { isBoardsPage?: boolean }) => {
  return (
    <ProfileHeaderContainer isBoardsPage={isBoardsPage}>
      <AuthLoading>
        <Loader active />
        Loading user...
      </AuthLoading>
      <SignedOut>
        <LoginButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/logout">
          <Icon size="big" name="sign out" />
          Logout
        </a>
      </SignedIn>
    </ProfileHeaderContainer>
  );
};
