import React from 'react';
import { Container, Text } from '@chakra-ui/react';
import { ProfileHeader } from 'common/ProfileHeader';
import { FullVerticalContainer } from 'common/FullVerticalContainer';
import { Boards as BoardList } from 'components/Board/Boards';
import RichErrorBoundary from 'common/RichErrorBoundary';
import { useAuth } from 'src/setupInstaWeb';

export default function Boards() {
  // TODO
  const auth = useAuth();
  const { isSignedIn, isLoaded } = {
    isLoaded: true, // auth.isLoading,
    isSignedIn: !auth.isLoading && !auth.error && auth.user?.id,
  };

  return (
    <FullVerticalContainer data-cy="full-container">
      <ProfileHeader isBoardsPage />
      <RichErrorBoundary>
        {isLoaded && (
          <>
            {isSignedIn && <BoardList />}
            {!isSignedIn && (
              <Container>
                <Text>
                  You will need to be authenticated once, to sync your boards on
                  this machine and browser.
                </Text>
              </Container>
            )}
          </>
        )}
      </RichErrorBoundary>
    </FullVerticalContainer>
  );
}
