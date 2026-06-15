import { useCallback } from 'react';
import { useDroppable } from '@dnd-kit/core';

import type { DndProps } from './CardListWithDnd';

export function useCardListDnd(
  id: string
): [dndProps: DndProps, ref: (element: HTMLDivElement | null) => void] {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  const ref = useCallback(
    (element: HTMLDivElement | null) => {
      setNodeRef(element);
    },
    [setNodeRef]
  );

  return [{ isOver }, ref];
}
