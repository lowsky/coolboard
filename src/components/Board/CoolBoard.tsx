import React from 'react';
import {
  Board,
  useAddListMutation,
  useBoardQuery,
  useDeleteListOfBoardMutation,
  useDeleteListsOfBoardMutation,
} from '../../generated/graphql';

import { BoardContainer } from './BoardContainer';

export const CoolBoard = ({ boardId }) => {
  const { loading, error, data } = useBoardQuery({
    variables: { boardId },
  });
  const [addListToBoard] = useAddListMutation();
  const [deleteListsOfBoard] = useDeleteListsOfBoardMutation();
  const [deleteListOfBoard] = useDeleteListOfBoardMutation();

  if (loading) {
    return <div>Loading Board</div>;
  }

  if (error) {
    return null;
  }

  if (!data || !data.board) {
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

  const deleteList = (listId: string) =>
    deleteListOfBoard({
      variables: {
        boardId,
        listId,
      },
    });

  const addList = () =>
    addListToBoard({
      variables: {
        boardId,
        name: 'new list',
      },
    });

  return (
    <BoardContainer
      addList={addList}
      deleteLists={deleteLists}
      deleteList={deleteList}
      board={board as Board}
    />
  );
};
