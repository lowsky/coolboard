import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

import { CardComponent } from './CardComponent';
import { useUpdateCardMutation } from '../generated/graphql';

export const Card = (props) => {
  const [mutation] = useUpdateCardMutation({
    variables: {
      ...props,
    },
  });
  return (
    <CardComponent
      {...props}
      storeCard={(vars) =>
        mutation({
          variables: vars,
        })
      }
    />
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  cardListId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  storeCard: PropTypes.func,
};

export const dndItemType = 'card';

export const CardForDragging = (props) => {
  const [_, ref] = useDrag({
    type: dndItemType,
    item: {
      id: props.id,
      cardListId: props.cardListId,
    },
    //((monitor: DragSourceMonitor<DragObject, DropResult>) => boolean);
    // @ts-ignore
    canDrag: () => (props) => !!props.cardListId,
  });

  return (
    <div ref={ref}>
      <Card {...props} />
    </div>
  );
};

export default CardForDragging;
