import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { Flex, Heading } from '@chakra-ui/react';
import { ProfileHeader } from 'common/ProfileHeader';
import { FullVerticalContainer } from 'common/FullVerticalContainer';

export default function SignInPage() {
  return (
    <FullVerticalContainer data-cy="full-container">
      <ProfileHeader />
      <Flex flexDir="column" align="center">
        <Heading as="h1" my={2}>
          Welcome to Coolboard
        </Heading>
        <SignUp />
      </Flex>
    </FullVerticalContainer>
  );
}
