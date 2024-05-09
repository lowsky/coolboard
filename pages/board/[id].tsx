import React, { Suspense } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRouter } from 'next/router';

import { trackPage } from 'src/common/tracking';

import { ProfileHeader } from 'src/common/ProfileHeader';
import { GeneralErrorHandler } from 'src/common/GeneralErrorHandler';
import { FullVerticalContainer } from 'common/FullVerticalContainer';
import { Board } from 'components/Board/Board';

export default function BoardPage() {
  const router = useRouter();
  const { id } = router.query;

  const boardId = Array.isArray(id) ? id[0] : id;

  trackPage('board ' + id);

  return (
    <FullVerticalContainer data-cy="full-container">
      <ProfileHeader />
      <GeneralErrorHandler />
      <DndProvider backend={HTML5Backend}>
        <Suspense fallback={<div>Loading Board</div>}>
          {boardId && <Board boardId={boardId} />}
        </Suspense>
      </DndProvider>
    </FullVerticalContainer>
  );
}
