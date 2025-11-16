import {
  useAddCardMutationMutation,
  useCardListSuspenseQuery,
  useDeleteListOfBoardMutation,
  useMoveCard2Mutation,
} from 'generated/graphql';

import { createUpdateCachedListsAfterMovingCard } from './overrideCacheListsAfterMovingCard';
import { CardListWithDnd, type UIListData } from './ui/CardListWithDnd';
import { type MoveItemToFrom, useCardListDnd } from './ui/useCardListDnd';

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
  const { error, data } = useCardListSuspenseQuery({
    variables: { cardListId: id },
  });

  const [addCardWithName] = useAddCardMutationMutation();

  const [deleteListOfBoard] = useDeleteListOfBoardMutation();

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

  const [moveCard] = useMoveCard2Mutation();
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
