import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import { useDb } from '../../src/setupInstaWeb';
import { Login } from 'auth/AuthUI';

import { ProfileHeader } from 'common/ProfileHeader';
import { FullVerticalContainer } from 'common/FullVerticalContainer';

export default function SignInPage() {
  const db = useDb();

  return (
    <FullVerticalContainer data-cy="full-container">
      <ProfileHeader isBoardsPage />
      <Flex flexDir="column" align="center">
        <Heading as="h1" my={2}>
          Welcome to Coolboard
        </Heading>
        <Login db={db} />
      </Flex>
    </FullVerticalContainer>
  );
}
