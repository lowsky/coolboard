import { useDrag } from 'react-dnd';

import { dndItemType } from 'components/Card/Card';
import type { Card as CardType } from 'generated/graphql';

interface DragItem {
  id: string;
  cardListId: string;
}

export interface CardForDraggingProps extends CardType {
  cardListId: string;
  readonly?: boolean | undefined;
}

export function useCardDragHook(props: CardForDraggingProps) {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [_, ref] = useDrag<
    DragItem,
    /*DropResult*/ unknown,
    { isDragging: boolean }
  >({
    type: dndItemType,
    item: {
      id: props.id,
      cardListId: props.cardListId,
    },
    canDrag: () => Boolean(props.cardListId),
  });
  return ref;
}
