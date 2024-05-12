import React, { type ReactNode } from 'react';
import Link from 'next/link';
import { Box, Container, Flex } from '@chakra-ui/react';
import Image from 'next/image';

import { UserProfileHeaderUIInstanaDb } from 'auth/UserProfileHeaderUIInstandDB';

import coolBoardLogo from '../../public/CoolBoardLogo100.png';

const ProfileHeaderContainer = ({
  children,
  isBoardsPage = false,
}: {
  children: ReactNode;
  isBoardsPage?: boolean;
}) => (
  <Container maxW="100%" variant="header">
    <Flex
      alignItems="center"
      placeContent="space-between"
      data-cy="profile-header">
      <Box gap="2rem" display="flex">
        {isBoardsPage && (
          <Flex direction="row" gap="1em" alignItems="center">
            <Link href="/" title="Home">
              <Image src={coolBoardLogo} height="40" alt="logo" />
            </Link>
          </Flex>
        )}
        {!isBoardsPage && (
          <Flex direction="row" gap="1em" alignItems="center">
            <Link href="/" title="Home">
              <Image src={coolBoardLogo} height="40" alt="logo" />
            </Link>
            <Link href="/boards">Boards</Link>
          </Flex>
        )}
      </Box>

      {children}
    </Flex>
  </Container>
);

export const ProfileHeader = ({
  isBoardsPage = false,
  isLoginInPage = false,
}: {
  isBoardsPage?: boolean;
  isLoginInPage?: boolean;
}) => {
  return (
    <ProfileHeaderContainer isBoardsPage={isBoardsPage}>
      <UserProfileHeaderUIInstanaDb isLoginInPage={isLoginInPage} />
    </ProfileHeaderContainer>
  );
};
