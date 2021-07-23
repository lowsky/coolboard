import React from 'react';

import { trackPage } from '../src/common/tracking';
import { ProfileHeader } from "../src/common/ProfileHeader";
import { GeneralErrorHandler } from "../src/common/GeneralErrorHandler";
import FullPageWithApollo from "../src/common/FullPageWithApollo";
import { authRefresh } from "../src/App";
import { Boards as BoardList } from "../src/components/Boards";
import { setupGraphQLClient } from "../src/setupGraphQLClient";

const client = setupGraphQLClient();

export default function Boards() {
  trackPage('boards');

  return (
    <FullPageWithApollo client={client}>
      <ProfileHeader isBoardsPage />
      <GeneralErrorHandler
        authRefresh={authRefresh}
      />
      <BoardList />
    </FullPageWithApollo>
  );
}
