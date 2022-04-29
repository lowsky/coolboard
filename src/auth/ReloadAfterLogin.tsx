import { useEffect } from 'react';
import { ApolloClient, useApolloClient } from '@apollo/client';
import { useAuth } from '@clerk/nextjs';

interface Props {
  client: ApolloClient<any>;
}

export function ReloadAfterLogin({ client }: Props) {
  const apolloClient = useApolloClient(client);
  const { isSignedIn, isLoaded, sessionId } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && sessionId) {
        apolloClient.refetchQueries({
          include: 'all',
        });
      }
    }
  }, [isSignedIn, isLoaded, sessionId]);

  return null;
}
