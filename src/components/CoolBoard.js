/* eslint-disable react/prop-types */
import React from 'react';

import { gql, useMutation, useQuery } from "@apollo/client";

import {
  BoardContainer,
  AddListButton,
  DelListButton,
} from './BoardContainer';
import { CardList } from './CardList';

const Board = (props) => {
  const {
    board = {},
    addList,
    deleteLists,
    deleteList,
    boardId,
  } = props;

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
    <BoardContainer boardName={name}>
      <DelListButton
        action={() =>
          deleteLists(lists.map(list => list.id))
        }>
        Delete All
      </DelListButton>
      {lists.map(list => (
        <CardList
          key={list.id}
          name={list.name}
          id={list.id}
          deleteListWithId={id => deleteList(id)}
        />
      ))}
      <AddListButton onAddNewList={onBoardAddItem}/>
    </BoardContainer>
  );
};

Board.fragments = {
  board: gql`
    fragment Board_board on Board {
      name
      id
      lists {
        name
        id
      }
    }
  `,
};

const BoardQuery = gql`
  query board($boardId: ID) {
    board(where: { id: $boardId }) {
      ...Board_board
    }
  }
  ${Board.fragments.board}
`;

const addListMutation = gql`
  mutation($boardId: ID!, $name: String!) {
    updateBoard(
      data: { lists: { create: { name: $name } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
  ${Board.fragments.board}
`;

const deleteListsOfBoardMutation = gql`
  mutation deleteListsOfBoard(
    $boardId: ID!
    $listIds: [ID!]!
  ) {
    updateBoard(
      data: { lists: { deleteMany: { id_in: $listIds } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
  ${Board.fragments.board}
`;

const deleteListOfBoardMutation = gql`
  mutation deleteListOfBoard(
    $boardId: ID!
    $listId: ID!
  ) {
    updateBoard(
      data: { lists: { delete: { id: $listId } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
  ${Board.fragments.board}
`;

export const CoolBoard = ({ boardId }) => {
  const { loading, error, data } = useQuery(
    BoardQuery,
    { variables: { boardId } });

  const [addList] = useMutation(
    addListMutation,
  );

  const [deleteListsOfBoard] = useMutation(
    deleteListsOfBoardMutation,
  );

  const [deleteListOfBoard] = useMutation(
    deleteListOfBoardMutation,
  );

  if(loading) {
    return <div>Loading Board</div>;
  }

  if(error) {
    return false;
  }

  const { board } = data;
  if(!board) {
    return <div>Board does not exist.</div>;
  }

  const deleteLists = ids =>
    deleteListsOfBoard({
      variables: {
        boardId,
        listIds: ids,
      },
    });

  const deleteList = listId =>
    deleteListOfBoard({
      variables: {
        boardId,
        listId
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
