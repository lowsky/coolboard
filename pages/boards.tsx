import React from 'react';

import { trackPage } from '../src/common/tracking';
import { ProfileHeader } from "../src/common/ProfileHeader";
import { GeneralErrorHandler } from "../src/common/GeneralErrorHandler";
import FullPageWithApollo from "../src/common/FullPageWithApollo";
import { Boards as BoardList } from "../src/components/Boards";

export default function Boards() {
  trackPage('boards');

  return (
    <FullPageWithApollo>
      <ProfileHeader isBoardsPage />
      <GeneralErrorHandler/>
      <BoardList />
    </FullPageWithApollo>
  );
}
