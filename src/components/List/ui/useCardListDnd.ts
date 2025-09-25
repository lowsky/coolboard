import { type DropTargetMonitor, useDrop } from 'react-dnd';
import { useCallback } from 'react';

import type { Card as CardType } from 'generated/graphql';

import type { DndProps } from './CardListWithDnd';
import { dndItemType } from 'components/Card/Card';

export type MoveItemToFrom = (
  itemId: string,
  toListId: string,
  fromListId: string
) => Promise<any>;

function useDropRef(
  drag: (element: HTMLDivElement) => void
): (element: HTMLDivElement | null) => void {
  return useCallback(
    (element: HTMLDivElement | null) => {
      if (element) {
        drag(element);
      }
    },
    [drag]
  );
}

export function useCardListDnd(
  id: string,
  moveCardToList: MoveItemToFrom
): [dndProps: DndProps, ref: (element: HTMLDivElement | null) => void] {
  const [dndProps, drag] = useDrop<DraggableCardItem, Promise<void>, DndProps>({
    accept: dndItemType,
    drop: (item: DraggableCardItem) => drop(id, moveCardToList, item),
    canDrop: (item: DraggableCardItem) => id !== item.cardListId,
    collect: (monitor: DropTargetMonitor) => ({ isOver: monitor.isOver() }),
  });

  const ref: (element: HTMLDivElement | null) => void = useDropRef(drag);
  return [dndProps, ref];
}

type DraggableCardItem = CardType & {
  cardListId: string;
};

export const drop = (
  cardListId: string,
  moveCardToList: MoveItemToFrom,
  cardItem: DraggableCardItem
): Promise<any> => {
  const cardId = cardItem.id;
  const oldCardListId = cardItem.cardListId;
  return moveCardToList(cardId, cardListId, oldCardListId);
};
