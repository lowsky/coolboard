import React from 'react';
import { Container, Text } from '@chakra-ui/react';
import { ProfileHeader } from 'common/ProfileHeader';
import { GeneralErrorHandler } from 'common/GeneralErrorHandler';
import { FullVerticalContainer } from 'common/FullVerticalContainer';
import { Boards as BoardList } from 'components/Board/Boards';
import RichErrorBoundary from 'common/RichErrorBoundary';

export default function Boards() {
  // TODO
  const { isSignedIn, isLoaded } = {
    isLoaded: true,
    isSignedIn: true,
  };

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
