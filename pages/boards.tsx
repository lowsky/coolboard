import React from 'react';

import { trackPage } from '../src/common/tracking';
import { ProfileHeader } from '../src/common/ProfileHeader';
import { GeneralErrorHandler } from '../src/common/GeneralErrorHandler';
import FullPageWithApollo from '../src/common/FullPageWithApollo';
import { Boards as BoardList } from '../src/components/Boards';
import { useAuth } from '@clerk/nextjs';
import { Container, Text } from '@chakra-ui/react';

export default function Boards() {
  trackPage('boards');

  const { isSignedIn, isLoaded } = useAuth();

  return (
    <FullPageWithApollo>
      <ProfileHeader isBoardsPage />
      <GeneralErrorHandler />
      {isLoaded && (
        <>
          {isSignedIn && <BoardList />}
          {!isSignedIn && (
            <Container>
              <Text>Please, login to see your boards.</Text>
            </Container>
          )}
        </>
      )}
    </FullPageWithApollo>
  );
}
