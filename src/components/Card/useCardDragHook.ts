import { useDraggable } from '@dnd-kit/core';
import type { Card as CardType } from 'src/gql/graphql';

export interface CardForDraggingProps extends CardType {
  id: string;
  readonly?: boolean;
  cardListId: string;
}

export function useCardDragHook(props: CardForDraggingProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `card-${props.id}`, // Unique ID required by DndKit
    data: {
      listId: props.cardListId,
      ...props,
    },
  });

  return { attributes, listeners, setNodeRef, isDragging };
}
