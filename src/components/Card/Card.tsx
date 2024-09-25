import React from 'react';
import { type DragSourceMonitor, useDrag } from 'react-dnd';

import { CardComponent } from './ui/CardComponent';
import {
  type UpdateCardMutationVariables,
  useUpdateCardMutation,
} from 'generated/graphql';

export const Card = (props) => {
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
};

export const dndItemType = 'card';

export const CardForDragging = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, ref] = useDrag({
    type: dndItemType,
    item: {
      id: props.id,
      cardListId: props.cardListId,
    },
    // @ts-expect-error needs additional generic attrib
    canDrag: () => (props: DragSourceMonitor) => Boolean(props.cardListId),
  });

  return (
    <div ref={ref}>
      <Card {...props} />
    </div>
  );
};

export default CardForDragging;
