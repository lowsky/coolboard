import type { ApolloCache } from '@apollo/client';

import { CardListDocument, type CardListQuery } from 'src/gql/graphql';

export const createUpdateCachedListsAfterMovingCard: (
  cardId: string,
  newCardListId: string,
  oldCardListId: string
) => (store: ApolloCache) => void = (
  cardId: string,
  newCardListId: string,
  oldCardListId: string
) => {
  return (store: ApolloCache) => {
    const cachedNewList = store.readQuery<CardListQuery>({
      query: CardListDocument,
      variables: {
        cardListId: newCardListId,
      },
    });
    const cachedOldList = store.readQuery<CardListQuery>({
      query: CardListDocument,
      variables: {
        cardListId: oldCardListId,
      },
    });

    if (!cachedOldList || !cachedNewList) {
      return;
    }

    overrideCachedListsAfterMovingCard(
      cachedNewList,
      cachedOldList,
      newCardListId,
      oldCardListId,
      cardId,
      store
    );
  };
};

function overrideCachedListsAfterMovingCard(
  cachedNewList: CardListQuery,
  cachedOldList: CardListQuery,
  newListId: string,
  oldListId: string,
  cardId: string,
  store: ApolloCache
) {
  const { list: newList } = cachedNewList;
  const { list: oldList } = cachedOldList;
  if (oldList && newList) {
    let oldCard;
    // @ts-expect-error TS2339: Property cards does not exist on type
    const oldCards = oldList.cards.filter((card) => {
      if (card.id !== cardId) return true;
      oldCard = card;
      return false;
    });
    if (!oldCard) return;

    // @ts-expect-error TS2339: Property cards does not exist on type
    const newCards = [...newList.cards, oldCard];
    store.writeQuery({
      query: CardListDocument,
      data: {
        list: {
          ...newList,
          // @ts-expect-error ... is missing some properties...
          cards: newCards,
        },
      },
      variables: { cardListId: newListId },
    });
    store.writeQuery({
      query: CardListDocument,
      data: {
        list: {
          ...oldList,
          // @ts-expect-error ... is missing some properties...
          cards: oldCards,
        },
      },
      variables: { cardListId: oldListId },
    });
  }
}
