import React from 'react';
import { BoardContainer } from './ui/BoardContainer';
import { useQuery, useMutation } from '@apollo/client/react';
import { graphql } from '../../gql';

const DeleteListsOfBoardDoc = graphql(`
  mutation deleteListsOfBoard($boardId: ID!, $listIds: [ID!]!) {
    updateBoard(
      data: { lists: { deleteMany: { id_in: $listIds } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
`);

const BoardDoc = graphql(`
  query board($boardId: ID!) {
    board(where: { id: $boardId }) {
      ...Board_board
    }
  }
`);

const AddListDoc = graphql(`
  mutation addList($boardId: ID!, $name: String!) {
    updateBoard(
      data: { lists: { create: { name: $name } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
`);

interface BoardProps {
  boardId: string;
  readonly?: boolean;
}

export const Board = ({ boardId, readonly = false }: BoardProps) => {
  const { error, data } = useQuery(BoardDoc, {
    variables: { boardId },
  });

  const [deleteListsOfBoard] = useMutation(DeleteListsOfBoardDoc);

  const deleteLists = (ids: string[]) =>
    deleteListsOfBoard({
      variables: {
        boardId,
        listIds: ids,
      },
    });

  const [addListToBoard] = useMutation(AddListDoc);
  const addList = () =>
    addListToBoard({
      variables: { name: 'new list', boardId },
    });

  if (error) {
    return null;
  }

  if (!data?.board) {
    return <div>Board does not exist.</div>;
  }

  const { board } = data;

  return (
    <BoardContainer
      addListToBoard={addList}
      deleteLists={deleteLists}
      board={board}
      readonly={readonly}
    />
  );
};
