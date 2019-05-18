import React from 'react';

import gql from 'graphql-tag';
import {
  Container,
  Icon,
  Image,
  Loader,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

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
        <Link to="/">
          <Icon size="big" name="home" />Home
        </Link>
      )}
      {!isBoardsPage && (
        <Link to="/boards">
          <Icon size="big" name="list" />Boards
        </Link>
      )}

      <Link to="/about">
        <Icon size="big" name="question" />About
      </Link>

      {children}
    </div>
  </Container>
);

export const ProfileHeader = ({ isBoardsPage }) => (
  // { options: { fetchPolicy: 'network-only' } }
  <Query
    query={gql`
      {
        me {
          email
          id
          name
          avatarUrl
        }
      }
    `}>
    {({ loading, error, data }) => {
      if (loading) {
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
            <Link to="/login">
              <Icon size="big" name="sign in" />Log in
            </Link>
          </ProfileHeaderContainer>
        );
      }

      const { me } = data;
      const { avatarUrl, name } = me;

      return (
        <ProfileHeaderContainer
          isBoardsPage={isBoardsPage}>
          <div>
            <span>{name} </span>
            {avatarUrl && (
              <Image src={avatarUrl} avatar spaced />
            )}

            <Link to="/logout">
              <Icon size="big" name="sign out" />Logout
            </Link>
          </div>
        </ProfileHeaderContainer>
      );
    }}
  </Query>
);
