import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { Flex, Heading } from '@chakra-ui/react';
import { ProfileHeader } from 'common/ProfileHeader';
import FullPageWithApollo from 'common/FullPageWithApollo';

export default function SignInPage() {
  return (
    <FullPageWithApollo data-cy="about-full-container">
      <ProfileHeader isBoardsPage />
      <Flex flexDir="column" align="center">
        <Heading as="h1" my={2}>
          Welcome to Coolboard
        </Heading>
        <SignIn />
      </Flex>
    </FullPageWithApollo>
  );
}
