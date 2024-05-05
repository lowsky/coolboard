import React from 'react';
import {
  useAddListMutation,
  useBoardSuspenseQuery,
  useDeleteListsOfBoardMutation,
} from 'generated/graphql';

import { BoardContainer } from './ui/BoardContainer';

interface BoardProps {
  boardId: string;
  readonly?: boolean;
}

export const Board = ({ boardId, readonly = false }: BoardProps) => {
  const { error, data } = useBoardSuspenseQuery({
    variables: { boardId },
  });

  const [deleteListsOfBoard] = useDeleteListsOfBoardMutation();

  const deleteLists = (ids: string[]) =>
    deleteListsOfBoard({
      variables: {
        boardId,
        listIds: ids,
      },
    });
  const [addListToBoard] = useAddListMutation();

  if (error) {
    return null;
  }

  if (!data?.board) {
    return <div>Board does not exist.</div>;
  }

  const { board } = data;

  const addList = (name?: string) => {
    const vars: { variables: { name: string; boardId: string } } = {
      variables: {
        boardId: board.id,
        name: name ?? 'new list',
      },
    };
    return addListToBoard(vars);
  };

  return (
    <BoardContainer
      addListToBoard={addList}
      deleteLists={deleteLists}
      board={board}
      readonly={readonly}
    />
  );
};
