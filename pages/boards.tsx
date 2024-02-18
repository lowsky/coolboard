import React, { Suspense } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Container, Text } from '@chakra-ui/react';

import { trackPage } from 'common/tracking';
import { ProfileHeader } from 'common/ProfileHeader';
import { GeneralErrorHandler } from 'common/GeneralErrorHandler';
import FullPageWithApollo from 'common/FullPageWithApollo';
import { Boards as BoardList, BoardsSkeleton } from 'components/Board/Boards';

export default function Boards() {
  trackPage('boards');

  const { isSignedIn, isLoaded } = useAuth();

  return (
    <FullPageWithApollo>
      <ProfileHeader isBoardsPage />
      <GeneralErrorHandler />
      {isLoaded && (
        <>
          {isSignedIn && (
            <Suspense fallback={<BoardsSkeleton />}>
              <BoardList />
            </Suspense>
          )}
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
