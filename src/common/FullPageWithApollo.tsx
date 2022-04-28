import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { FullVerticalContainer } from './FullVerticalContainer';
import { setupGraphQLClient } from '../setupGraphQLClient';
import { ReloadAfterLogin } from '../auth/ReloadAfterLogin';

const client = setupGraphQLClient();

const FullPageWithApollo = ({ children }) => (
  <FullVerticalContainer data-cy="full-container">
    <ReloadAfterLogin client={client} />
    <ApolloProvider client={client}>{children}</ApolloProvider>
  </FullVerticalContainer>
);

export default FullPageWithApollo;
