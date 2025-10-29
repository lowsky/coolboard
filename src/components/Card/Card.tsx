import { ApolloClient } from '@apollo/client';

import { CardComponent } from './ui/CardComponent';
import {
  type Card as CardType,
  UpdateCardMutation,
  type UpdateCardMutationVariables,
} from 'generated/graphql';
import {
  CardForDraggingProps,
  useCardDragHook,
} from 'components/Card/useCardDragHook';
import { useMutation } from '@apollo/client/react';
import { graphql } from '../../gql';

const UpdateCardDoc = graphql(`
  mutation updateCard($id: ID!, $name: String!, $description: String) {
    updateCard(
      where: { id: $id }
      data: { name: $name, description: $description }
    ) {
      ...Card_card
    }
  }
`);

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
  const [mutation] = useMutation(UpdateCardDoc, {
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
