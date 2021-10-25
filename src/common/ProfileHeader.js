import React from 'react';
import { gql, useQuery } from "@apollo/client";
import {
  Container,
  Icon,
  Image,
  Loader,
} from 'semantic-ui-react';
import Link  from 'next/link';


const ProfileHeaderContainer = ({
  children,
  isBoardsPage,
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
      data-cy="profil-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        placeContent: 'space-between',
      }}>
      {isBoardsPage && (
        <Link href="/">
          <a><Icon size="big" name="home" />Home</a>
        </Link>
      )}
      {!isBoardsPage && (
        <Link href="/boards">
          <a><Icon size="big" name="list" />Boards</a>
        </Link>
      )}

      <Link href="/about">
        <a><Icon size="big" name="question" />About</a>
      </Link>

      {children}
    </div>
  </Container>
);

export const ProfileHeader = ({ isBoardsPage }) => {
  // LATER: { options: { fetchPolicy: 'network-only' } }
  const { loading, error, data } = useQuery(
    gql`
      {
          me {
              email
              id
              name
              avatarUrl
          }
      }
    `
  );

  if(loading) {
    return (
      <ProfileHeaderContainer
        isBoardsPage={isBoardsPage}>
        <Loader active />
        Loading user...
      </ProfileHeaderContainer>
    );
  }

  if (error) {
    return (
      <ProfileHeaderContainer
        isBoardsPage={isBoardsPage}>
        <Link href="/login">
          <a><Icon size="big" name="sign in" />Log in
          </a>
        </Link>
      </ProfileHeaderContainer>
    );
  }

  const { me= {} } = data;

  const { avatarUrl, name } = me;

  return (
    <ProfileHeaderContainer
      isBoardsPage={isBoardsPage}>
      <div>
        <span>{name} </span>
        {avatarUrl && (
          <Image src={avatarUrl} avatar spaced alt="user avatar" />
        )}

        <Link href="/logout">
          <a>
            <Icon size="big" name="sign out" />
            Logout
          </a>
        </Link>
      </div>
    </ProfileHeaderContainer>
  );
};
