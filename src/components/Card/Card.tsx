import React from 'react';
import { useDrag } from 'react-dnd';

import {
  type UpdateCardMutationVariables,
  useUpdateCardMutation,
} from 'components/persistence';

import { CardComponent } from './ui/CardComponent';

export const Card = (props) => {
  const [mutation] = useUpdateCardMutation();

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
    canDrag: () => Boolean(props.cardListId),
  });

  return (
    // @ts-expect-error Type ConnectDragSource is not assignable to type LegacyRef<HTMLDivElement> | undefined
    <div ref={ref}>
      <Card {...props} />
    </div>
  );
};

export default CardForDragging;
