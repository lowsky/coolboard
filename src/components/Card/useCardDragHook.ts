import { useDraggable } from '@dnd-kit/react';
import type { Card as CardType } from 'src/gql/graphql';

export interface CardForDraggingProps extends CardType {
  id: string;
  readonly?: boolean;
  cardListId: string;
}

export function useCardDragHook(props: CardForDraggingProps) {
  const { ref, isDragging } = useDraggable({
    id: `card-${props.id}`, // Unique ID required by DndKit
    data: {
      listId: props.cardListId,
      ...props,
    },
  });

  return { ref, isDragging };
}
