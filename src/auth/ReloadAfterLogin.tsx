import { useEffect } from 'react';
import { ApolloClient } from '@apollo/client';
import { useAuth } from '@clerk/nextjs';

interface Props {
  client: ApolloClient<any>;
}

export function ReloadAfterLogin({ client }: Props) {
  const { isSignedIn, isLoaded, sessionId } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && sessionId) {
        client?.refetchQueries({
          include: 'all',
        });
      }
    }
  }, [isSignedIn, isLoaded, sessionId, client]);

  return null;
}
