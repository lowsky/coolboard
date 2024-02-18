import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRouter } from 'next/router';

import { trackPage } from 'src/common/tracking';

import { ProfileHeader } from 'src/common/ProfileHeader';
import { GeneralErrorHandler } from 'src/common/GeneralErrorHandler';
import FullPageWithApollo from 'src/common/FullPageWithApollo';
import { Board } from 'components/Board/Board';

export default function BoardPage() {
  const router = useRouter();
  const { id } = router.query;

  const boardId = Array.isArray(id) ? id[0] : id;

  trackPage('board ' + id);

  return (
    <FullPageWithApollo>
      <ProfileHeader />
      <GeneralErrorHandler />
      <DndProvider backend={HTML5Backend}>
        {boardId && <Board boardId={boardId} />}
      </DndProvider>
    </FullPageWithApollo>
  );
}
