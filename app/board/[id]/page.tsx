'use client';

import BoardPageImpl from '../../../pages/board/[id]';

export default function Page({ params }: { params: { id: string | string[] } }) {
  return <BoardPageImpl params={params} />;
}
