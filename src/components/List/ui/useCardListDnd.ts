import {
  type ConnectableElement,
  type DropTargetMonitor,
  useDrop,
} from 'react-dnd';
import type { ReactElement } from 'react';

import type { Card as CardType } from 'src/setupInstaWeb';

import type { DndProps } from './CardListWithDnd';
import { dndItemType } from 'components/Card/Card';
import { TransactionResult } from '@instantdb/core';

export type MoveItemFromTo = (
  itemId: string,
  fromListId: string,
  toListId: string
) => Promise<TransactionResult>;

export function useCardListDnd(
  id: string,
  moveCardToList: MoveItemFromTo
): [
  dndProps: DndProps,
  ref: (
    elementOrNode: ConnectableElement,
    _options?: never
  ) => ReactElement | null,
] {
  const [dndProps, ref] = useDrop<
    DraggableCardItem,
    Promise<TransactionResult>,
    DndProps
  >({
    accept: dndItemType,
    //
    drop: (item: DraggableCardItem) => drop(id, moveCardToList, item),
    canDrop: (item: DraggableCardItem) => id !== item.cardListId,
    collect: (monitor: DropTargetMonitor) => ({ isOver: monitor.isOver() }),
  });
  return [dndProps, ref];
}

type DraggableCardItem = CardType & {
  cardListId: string;
};

export const drop = (
  id: string,
  moveCardToList: MoveItemFromTo,
  cardItem: DraggableCardItem
): Promise<TransactionResult> => {
  const cardId = cardItem.id;
  const cardListId = id;
  const oldCardListId = cardItem.cardListId;
  return moveCardToList(cardId, oldCardListId, cardListId);
};
