import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { Flex, Heading } from '@chakra-ui/react';
import { ProfileHeader } from 'common/ProfileHeader';
import FullPageWithApollo from 'common/FullPageWithApollo';

export default function SignInPage() {
  return (
    <FullPageWithApollo data-cy="about-full-container">
      <ProfileHeader />
      <Flex flexDir="column" align="center">
        <Heading as="h1" my={2}>
          Welcome to Coolboard
        </Heading>
        <SignUp />
      </Flex>
    </FullPageWithApollo>
  );
}
