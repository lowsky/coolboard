import { useEffect } from 'react';
import { ApolloClient, useApolloClient } from '@apollo/client';
import { useAuth } from '@clerk/nextjs';

interface Props {
  client: ApolloClient<any>;
}

export function ClearCacheOnLogout({ client }: Props) {
  const apolloClient = useApolloClient(client);
  const { isSignedIn, sessionId } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      apolloClient.clearStore?.();
    }
  }, [isSignedIn, sessionId]);

  return null;
}
