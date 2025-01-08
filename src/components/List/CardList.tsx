import React from 'react';
import { TransactionResult } from '@instantdb/core';

import {
  useAddCardMutation,
  useCardListQuery,
  useDeleteListOfBoardMutation,
  useMoveCard2Mutation,
} from 'components/persistence';

import { MoveItemFromTo, useCardListDnd } from './ui/useCardListDnd';
import { CardListWithDnd, UICardsData } from './ui/CardListWithDnd';
import { CardListSkeleton } from 'components/List/ui/CardListSkeleton';

interface CardListProps {
  id: string;
  boardId: string;
  name: string;
  readonly: boolean | undefined;
}

export const CardList = ({
  id,
  name,
  boardId,
  readonly = false,
}: CardListProps) => {
  const { error, data, isLoading } = useCardListQuery({
    variables: { cardListId: id },
  });

  const [addCardWithName] = useAddCardMutation();

  const [deleteListOfBoard] = useDeleteListOfBoardMutation();

  const deleteList = () =>
    deleteListOfBoard({
      variables: {
        boardId,
        listIds: [id],
      },
    });

  const addCard: (id: string, name: string) => Promise<TransactionResult> = (
    id: string,
    name: string
  ) => addCardWithName({ variables: { cardListId: id, name } });

  const [moveCard] = useMoveCard2Mutation();
  const moveCardToList: MoveItemFromTo = (cardId, fromListId, toList) =>
    moveCard({
      variables: { fromListId, toList, cardId },
    });

  const [dndProps, ref] = useCardListDnd(id, moveCardToList);

  if (error) {
    return <span>Load error!</span>;
  }

  if (isLoading) {
    return <CardListSkeleton name={name} id={id} />;
  }

  const cards = data.cardList?.[0].cards as UICardsData[];

  return (
    // @ts-expect-error TS2322: Type ConnectDragSource not assignable to type LegacyRef<HTMLDivElement> | undefined.
    <div ref={ref}>
      <CardListWithDnd
        {...dndProps}
        deleteList={deleteList}
        addCard={addCard}
        cards={cards}
        name={name}
        id={id}
        readonly={readonly}
      />
    </div>
  );
};
