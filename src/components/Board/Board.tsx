import React from 'react';

import { BoardContainer } from './ui/BoardContainer';
import {
  useAddListMutation,
  useBoardQuery,
  useDeleteListOfBoardMutation,
  useRunDignosis,
} from 'components/persistence';
import { TransactionResult } from '@instantdb/core';

interface BoardProps {
  boardId: string;
  readonly?: boolean;
}

export const Board = ({ boardId, readonly = false }: BoardProps) => {
  const [deleteListsOfBoard] = useDeleteListOfBoardMutation();
  const { data, error, isLoading } = useBoardQuery(boardId);
  useRunDignosis();

  const deleteLists: (ids: string[]) => Promise<TransactionResult> = (ids) =>
    deleteListsOfBoard({
      variables: {
        boardId,
        listIds: ids,
      },
    });

  const [addListToBoard] = useAddListMutation();
  const addList = () =>
    addListToBoard({
      variables: { name: 'new list', boardId },
    });

  if (error) {
    return null;
  }

  if (isLoading || !data?.boards || data?.boards.length === 0) {
    return <div>Board does not exist.</div>;
  }

  const board = data.boards[0];

  return (
    <BoardContainer
      addListToBoard={addList}
      deleteLists={deleteLists}
      board={board}
      readonly={readonly}
    />
  );
};
