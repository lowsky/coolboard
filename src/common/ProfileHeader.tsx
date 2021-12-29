import React, { ReactNode } from 'react';
import { Container, Icon, Image, Loader } from 'semantic-ui-react';
import Link from 'next/link';

import { useUser } from '@auth0/nextjs-auth0';

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
  const { user, error, isLoading } = useUser();

  if (isLoading || (!error && !user)) {
    return (
      <ProfileHeaderContainer isBoardsPage={isBoardsPage}>
        <Loader active />
        Loading user...
      </ProfileHeaderContainer>
    );
  }

  if (error) {
    return (
      <ProfileHeaderContainer isBoardsPage={isBoardsPage}>
        <Link href="/api/auth/login">
          <a>
            <Icon size="big" name="sign in" />
            Log in
          </a>
        </Link>
      </ProfileHeaderContainer>
    );
  }

  if (!user) {
    return (
      <ProfileHeaderContainer isBoardsPage={isBoardsPage}>
        <Loader active />
        Loading user...
      </ProfileHeaderContainer>
    );
  }

  const { picture, name } = user;

  return (
    <ProfileHeaderContainer isBoardsPage={isBoardsPage}>
      <div>
        <span>{name} </span>
        {picture && <Image src={picture} avatar spaced alt="user avatar" />}
        <Link href="/api/auth/logout">
          <a>
            <Icon size="big" name="sign out" />
            Logout
          </a>
        </Link>
      </div>
    </ProfileHeaderContainer>
  );
};
