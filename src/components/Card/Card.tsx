import React from 'react';

import { CardComponent } from './ui/CardComponent';
import {
  type Card as CardType,
  type UpdateCardMutationVariables,
  useUpdateCardMutation,
} from 'generated/graphql';
import {
  CardForDraggingProps,
  useCardDragHook,
} from 'components/Card/useCardDragHook';

export const dndItemType = 'card';

function CardForDragging(props: CardForDraggingProps) {
  const ref = useCardDragHook(props);

  return (
    // @ts-expect-error type not exactly matches
    <div ref={ref}>
      <Card {...props} />
    </div>
  );
}

function Card(props: CardType) {
  const [mutation] = useUpdateCardMutation({
    variables: {
      ...props,
    },
  });

  return (
    <CardComponent
      {...props}
      storeCard={(variables: UpdateCardMutationVariables) =>
        mutation({ variables })
      }
    />
  );
}

export default CardForDragging;
