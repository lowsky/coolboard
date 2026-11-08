import { useDroppable } from '@dnd-kit/react';

import type { DndProps } from './CardListWithDnd';

export function useCardListDnd(
  id: string
): [dndProps: DndProps, ref: (element: HTMLDivElement | null) => void] {
  const { ref, isDropTarget } = useDroppable({
    id,
  });

  return [{ isOver: isDropTarget }, ref];
}
