import React from 'react';
import { useDrag } from 'react-dnd';

import { CardComponent } from './ui/CardComponent';
import {
  type Card as CardType,
  type UpdateCardMutationVariables,
  useUpdateCardMutation,
} from 'generated/graphql';

function Card(props: CardType) {
  const [mutation] = useUpdateCardMutation({
    variables: {
      ...props,
    },
  });

  return (
    <CardComponent
      {...props}
      storeCard={(vars: UpdateCardMutationVariables) =>
        mutation({
          variables: vars,
        })
      }
    />
  );
}

// Define the interface for the drag item
interface DragItem {
  id: string;
  cardListId: string;
}

export interface CardForDraggingProps extends CardType {
  cardListId: string;
  readonly?: boolean | undefined;
}

export const dndItemType = 'card';

export function CardForDragging(props: CardForDraggingProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  return (
    <div ref={ref}>
      <Card {...props} />
    </div>
  );
}

export default CardForDragging;
