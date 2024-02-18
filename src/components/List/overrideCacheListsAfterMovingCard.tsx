import { ApolloCache } from '@apollo/client';
import { CardListDocument, CardListQuery } from 'generated/graphql';

export const updateCachedListsAfterMovingCard: (
  cardId: string,
  newCardListId: string,
  oldCardListId: string
) => (store: ApolloCache<any>) => void = (
  cardId: string,
  newCardListId: string,
  oldCardListId: string
) => {
  return (store: ApolloCache<any>) => {
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
  store: ApolloCache<any>
) {
  const { list: newList } = cachedNewList;
  const { list: oldList } = cachedOldList;
  if (oldList && newList) {
    let oldCard;
    const oldCards = oldList.cards.filter((card) => {
      if (card.id !== cardId) return true;
      oldCard = card;
      return false;
    });
    if (!oldCard) return;

    const newCards = [...newList.cards, oldCard];
    store.writeQuery({
      query: CardListDocument,
      data: {
        list: {
          ...newList,
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
          cards: oldCards,
        },
      },
      variables: { cardListId: oldListId },
    });
  }
}
