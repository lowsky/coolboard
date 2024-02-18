import React from 'react';
import {
  useBoardSuspenseQuery,
  useDeleteListsOfBoardMutation,
} from 'generated/graphql';

import { BoardContainer } from './BoardContainer';

interface BoardProps {
  boardId: string;
  readonly?: boolean;
}

export const Board = ({ boardId, readonly = false }: BoardProps) => {
  const { error, data } = useBoardSuspenseQuery({
    variables: { boardId },
  });

  const [deleteListsOfBoard] = useDeleteListsOfBoardMutation();

  if (error) {
    return null;
  }

  if (!data?.board) {
    return <div>Board does not exist.</div>;
  }

  const { board } = data;

  const deleteLists = (ids: string[]) =>
    deleteListsOfBoard({
      variables: {
        boardId,
        listIds: ids,
      },
    });

  return (
    <BoardContainer
      deleteLists={deleteLists}
      board={board}
      readonly={readonly}
    />
  );
};
