import React from 'react';

import {
  AddListButton,
  BoardContainer,
  DelAllListsButton,
} from './BoardContainer';
import { CardList } from './CardList';
import {
  useAddListMutation,
  useBoardQuery,
  useDeleteListOfBoardMutation,
  useDeleteListsOfBoardMutation,
} from '../generated/graphql';

const Board = (props) => {
  const { board = {}, addList, deleteLists, deleteList, boardId } = props;

  const { name, lists = [] } = board;

  const onBoardAddItem = () => {
    addList({
      variables: {
        boardId,
        name: 'new list',
      },
    });
  };

  return (
    <BoardContainer
      boardName={name}
      headerActions={
        <DelAllListsButton
          action={() => deleteLists(lists.map((list) => list.id))}>
          Delete All
        </DelAllListsButton>
      }>
      {lists.map((list) => (
        <CardList
          key={list.id}
          name={list.name}
          id={list.id}
          deleteListWithId={(id) => deleteList(id)}
        />
      ))}
      <AddListButton onAddNewList={onBoardAddItem} />
    </BoardContainer>
  );
};

export const CoolBoard = ({ boardId }) => {
  const { loading, error, data } = useBoardQuery({
    variables: { boardId },
  });

  const [addList] = useAddListMutation();

  const [deleteListsOfBoard] = useDeleteListsOfBoardMutation();

  const [deleteListOfBoard] = useDeleteListOfBoardMutation();

  if (loading) {
    return <div>Loading Board</div>;
  }

  if (error) {
    return null;
  }

  const { board } = data ?? {};
  if (!board) {
    return <div>Board does not exist.</div>;
  }

  const deleteLists = (ids) =>
    deleteListsOfBoard({
      variables: {
        boardId,
        listIds: ids,
      },
    });

  const deleteList = (listId) =>
    deleteListOfBoard({
      variables: {
        boardId,
        listId,
      },
    });

  return (
    <Board
      boardId={boardId}
      addList={addList}
      deleteLists={deleteLists}
      deleteList={deleteList}
      board={board}
    />
  );
};
