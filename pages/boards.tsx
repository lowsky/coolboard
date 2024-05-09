import React, { Suspense } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Container, Text } from '@chakra-ui/react';

import { trackPage } from 'common/tracking';
import { ProfileHeader } from 'common/ProfileHeader';
import { GeneralErrorHandler } from 'common/GeneralErrorHandler';
import { FullVerticalContainer } from 'common/FullVerticalContainer';
import { Boards as BoardList } from 'components/Board/Boards';
import RichErrorBoundary from 'common/RichErrorBoundary';

export default function Boards() {
  trackPage('boards');

  const { isSignedIn, isLoaded } = useAuth();

  return (
    <FullVerticalContainer data-cy="full-container">
      <ProfileHeader isBoardsPage />
      <GeneralErrorHandler />
      <RichErrorBoundary>
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
      </RichErrorBoundary>
    </FullVerticalContainer>
  );
}
