import { useDrag } from 'react-dnd';
import { useCallback } from 'react';

import { dndItemType } from 'components/Card/Card';
import type { Card as CardType } from 'src/gql/graphql';

interface DragItem {
  id: string;
  cardListId: string;
}

export interface CardForDraggingProps extends CardType {
  cardListId: string;
  readonly?: boolean | undefined;
}

function useDragRef(drag: (element: HTMLDivElement) => void) {
  return useCallback(
    (element: HTMLDivElement | null) => {
      if (element) {
        drag(element);
      }
    },
    [drag]
  );
}
export function useCardDragHook(props: CardForDraggingProps) {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [_, drag] = useDrag<
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
  return useDragRef(drag);
}
