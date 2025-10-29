import React from 'react';

import { createUpdateCachedListsAfterMovingCard } from './overrideCacheListsAfterMovingCard';
import { CardListWithDnd, type UIListData } from './ui/CardListWithDnd';
import { type MoveItemToFrom, useCardListDnd } from './ui/useCardListDnd';
import { useSuspenseQuery, useMutation } from '@apollo/client/react';
import { graphql } from '../../gql';

const MoveCard2Doc = graphql(`
  mutation moveCard2($cardId: ID!, $toList: ID!, $fromListId: ID!) {
    moveCard(id: $cardId, toListId: $toList, fromListId: $fromListId) {
      ...Card_card
    }
  }
`);

const DeleteListOfBoardDoc = graphql(`
  mutation deleteListOfBoard($boardId: ID!, $listId: ID!) {
    updateBoard(
      data: { lists: { delete: { id: $listId } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
`);

const CardListDoc = graphql(`
  query CardList($cardListId: ID!) {
    list(where: { id: $cardListId }) {
      ...CardList_list
    }
  }
`);

const AddCardMutationDoc = graphql(`
  mutation addCardMutation($cardListId: ID!, $name: String!) {
    updateList(
      data: { cards: { create: { name: $name } } }
      where: { id: $cardListId }
    ) {
      ...CardList_list
    }
  }
`);

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
  const { error, data } = useSuspenseQuery(CardListDoc, {
    variables: { cardListId: id },
  });

  const [addCardWithName] = useMutation(AddCardMutationDoc);

  const [deleteListOfBoard] = useMutation(DeleteListOfBoardDoc);

  const deleteList = () =>
    deleteListOfBoard({
      variables: {
        boardId,
        listId: id,
      },
    });

  const addCard = (cardListId, name) =>
    addCardWithName({
      variables: { name, cardListId },
    });

  const [moveCard] = useMutation(MoveCard2Doc);
  const moveCardToList: MoveItemToFrom = (cardId, toList, fromListId) =>
    moveCard({
      variables: { fromListId, toList, cardId },
      update: createUpdateCachedListsAfterMovingCard(
        cardId,
        toList,
        fromListId
      ),
    });

  const [dndProps, ref] = useCardListDnd(id, moveCardToList);

  if (error) {
    return <span>Load error!</span>;
  }

  const list: UIListData = data?.list;

  return (
    <div ref={ref}>
      <CardListWithDnd
        {...dndProps}
        deleteList={deleteList}
        addCard={addCard}
        list={list}
        name={name}
        id={id}
        readonly={readonly}
      />
    </div>
  );
};
