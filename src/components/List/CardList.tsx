import { gql } from '@apollo/client';
import { useSuspenseQuery, useMutation } from '@apollo/client/react';

import { createUpdateCachedListsAfterMovingCard } from './overrideCacheListsAfterMovingCard';
import { CardListWithDnd, type UIListData } from './ui/CardListWithDnd';
import { type MoveItemToFrom, useCardListDnd } from './ui/useCardListDnd';
import { CardCardDoc, CardListListDoc } from './list.graphql';
import { BoardBoardDoc } from 'components/Board/board.graphql';

const MoveCard2Doc = gql`
  mutation moveCard2($cardId: ID!, $toList: ID!, $fromListId: ID!) {
    moveCard(id: $cardId, toListId: $toList, fromListId: $fromListId) {
      ...Card_card
    }
  }
  ${CardCardDoc}
`;

const DeleteListOfBoardDoc = gql`
  mutation deleteListOfBoard($boardId: ID!, $listId: ID!) {
    updateBoard(
      data: { lists: { delete: { id: $listId } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
  ${BoardBoardDoc}
`;

const CardListDoc = gql`
  query CardList($cardListId: ID!) {
    list(where: { id: $cardListId }) {
      ...CardList_list
    }
  }
  ${CardListListDoc}
`;

const AddCardMutationDoc = gql`
  mutation addCardMutation($cardListId: ID!, $name: String!) {
    updateList(
      data: { cards: { create: { name: $name } } }
      where: { id: $cardListId }
    ) {
      ...CardList_list
    }
  }
  ${CardListListDoc}
`;

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

  // @ts-expect-error type mismatch. Type '({ __typename?: "List"; } & { ' $fragmentRefs'?: { CardList_ListFragment: CardList_ListFragment; }; }) | null | undefined' is not assignable to type 'UIListData'.
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
