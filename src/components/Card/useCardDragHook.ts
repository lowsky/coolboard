import { useCallback } from 'react';
import { useDraggable } from '@dnd-kit/core';

export interface CardForDraggingProps {
  id: string;
  cardListId: string;
}

export function useCardDragHook(props: CardForDraggingProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `card-${props.id}`, // Unique ID required by DndKit
    data: {
      // TODO: refine props
      id: props.id,
      listId: props.cardListId,
      dude: 'hi',
      ...props,
    },
    canDrag: Boolean(props.cardListId),
  });

  const dragRef = useCallback(
    (element) => {
      setNodeRef(element);
      return element;
    },
    [setNodeRef]
  );

  return { attributes, listeners, ref: dragRef, isDragging };
}
