import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRouter } from 'next/router';

import { trackPage } from '../../src/common/tracking';
import { ProfileHeader } from '../../src/common/ProfileHeader';
import { GeneralErrorHandler } from '../../src/common/GeneralErrorHandler';
import FullPageWithApollo from '../../src/common/FullPageWithApollo';
import { CoolBoard } from '../../src/components/CoolBoard';

export default function Board() {
  const router = useRouter();
  const { id } = router.query;
  trackPage('board ' + id);

  return (
    <FullPageWithApollo>
      <ProfileHeader />
      <GeneralErrorHandler />
      <DndProvider backend={HTML5Backend}>
        {id && <CoolBoard boardId={id} />}
      </DndProvider>
    </FullPageWithApollo>
  );
}
