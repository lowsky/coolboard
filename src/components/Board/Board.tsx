import { useState } from 'react';
import { BoardContainer } from './ui/BoardContainer';
import { useQuery, useMutation } from '@apollo/client/react';
import { gql, TypedDocumentNode } from '@apollo/client';
import {
  DragDropProvider,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/react';

import type { BoardQuery, BoardQueryVariables, Card } from 'src/gql/graphql';
import { BoardBoardDoc } from 'components/Board/board.graphql';
import { CardCardDoc } from 'components/List/list.graphql';
import { createUpdateCachedListsAfterMovingCard } from 'components/List/overrideCacheListsAfterMovingCard';
import { CardComponent } from 'components/Card/ui/CardComponent';
import { CardForDraggingProps } from 'components/Card/useCardDragHook';

const MoveCard2Doc = gql`
  mutation moveCard2($cardId: ID!, $toList: ID!, $fromListId: ID!) {
    moveCard(id: $cardId, toListId: $toList, fromListId: $fromListId) {
      ...Card_card
    }
  }
  ${CardCardDoc}
`;

const DeleteListsOfBoardDoc = gql`
  mutation deleteListsOfBoard($boardId: ID!, $listIds: [ID!]!) {
    updateBoard(
      data: { lists: { deleteMany: { id_in: $listIds } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
  ${BoardBoardDoc}
`;

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
  ${BoardBoardDoc}
`;

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

  const [moveCard] = useMutation(MoveCard2Doc);


  const [activeCard, setActiveCard] = useState<Card | undefined>();

  function handleDragStart(event: DragStartEvent) {
    setActiveCard(event.operation.source?.data.current as Card);
  }

  function handleDragEnd(event: DragEndEvent) {
    if (event.canceled) return;
    const source = event.operation.source;
    const target = event.operation.target;

    if (target && source && source.id !== target.id && source.data.current) {
      const card = source.data.current as CardForDraggingProps;
      const cardId = card.id;
      const fromListId = card.cardListId;
      const toListId = target.id as string;

      if (cardId && fromListId && toListId && fromListId !== toListId) {
        moveCard({
          variables: { fromListId, toList: toListId, cardId },
          update: createUpdateCachedListsAfterMovingCard(
            cardId,
            toListId,
            fromListId
          ),
        });
      }
    }
    setActiveCard(undefined);
  }

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
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      <BoardContainer
        addListToBoard={addList}
        deleteLists={deleteLists}
        // @ts-expect-error  Type error: Type '{ __typename?: "Board"; } & { ' $fragmentRefs'?: { Board_BoardFragment: Board_BoardFragment; }; }' is not assignable to type 'never'.
        board={board}
        readonly={readonly}
      />

      <DragOverlay>
        {activeCard ? (
          <CardComponent
            {...activeCard}
            storeCard={async () => ({}) as any}
            readonly
          />
        ) : null}
      </DragOverlay>
    </DragDropProvider>
  );
};
