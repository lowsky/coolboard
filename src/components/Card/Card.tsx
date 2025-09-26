import React from 'react';
import { ApolloClient } from '@apollo/client';

import { CardComponent } from './ui/CardComponent';
import {
  type Card as CardType,
  UpdateCardMutation,
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

  const storeCard: (
    vars: UpdateCardMutationVariables
  ) => Promise<ApolloClient.MutateResult<UpdateCardMutation>> = (
    variables: UpdateCardMutationVariables
  ) => mutation({ variables });

  return <CardComponent {...props} storeCard={storeCard} />;
}

export default CardForDragging;
