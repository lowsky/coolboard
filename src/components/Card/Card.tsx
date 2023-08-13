import React from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';

import { CardComponent } from './CardComponent';
import {
  UpdateCardMutationVariables,
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
