'use client';

import { Suspense, use } from 'react';

import { trackPage } from 'src/common/tracking';

import { ProfileHeader } from 'src/common/ProfileHeader';
import { GeneralErrorHandler } from 'src/common/GeneralErrorHandler';
import FullPageWithApollo from 'src/common/FullPageWithApollo';
import { Board } from 'components/Board/Board';
import { ParamMap } from '.next/types/routes';

export default function Page({
  params,
}: {
  params: PromiseLike<ParamMap['/board/[id]']>;
}) {
  const { id } = use(params);

  const boardId = Array.isArray(id) ? id[0] : id;

  trackPage('board ' + id);

  return (
    <FullPageWithApollo>
      <ProfileHeader />
      <GeneralErrorHandler />
      <Suspense fallback={<div>Loading Board</div>}>
        {boardId && <Board boardId={boardId} />}
      </Suspense>
    </FullPageWithApollo>
  );
}
