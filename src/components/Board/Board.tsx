import { BoardContainer } from './ui/BoardContainer';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql, TypedDocumentNode } from '@apollo/client';

import { BoardQuery, BoardQueryVariables } from '../../gql/graphql';
import { BoardBoardDoc } from 'components/Board/board.graphql';

const DeleteListsOfBoardDoc = gql`
  mutation deleteListsOfBoard($boardId: ID!, $listIds: [ID!]!) {
    updateBoard(
      data: { lists: { deleteMany: { id_in: $listIds } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
`);

const boardQuery: TypedDocumentNode<BoardQuery, BoardQueryVariables> = gql`
  query board($boardId: ID!) {
    board(where: { id: $boardId }) {
      ...Board_board
    }
  }
  ${BoardBoardDoc}
`;

const AddListDoc = gql`
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
  const { error, data } = useQuery<BoardQuery, BoardQueryVariables>(
    boardQuery,
    {
      variables: { boardId },
    }
  );

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

  if (!board) {
    return <div>Board does not exist.</div>;
  }

  return (
    <BoardContainer
      addListToBoard={addList}
      deleteLists={deleteLists}
      // @ts-expect-error  Type error: Type '{ __typename?: "Board"; } & { ' $fragmentRefs'?: { Board_BoardFragment: Board_BoardFragment; }; }' is not assignable to type 'never'.
      board={board}
      readonly={readonly}
    />
  );
};
