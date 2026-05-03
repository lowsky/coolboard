import { ApolloClient, TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

import { CardComponent } from './ui/CardComponent';
import {
  type Card as CardType,
  UpdateCardMutation,
  type UpdateCardMutationVariables,
} from 'src/gql/graphql';
import {
  CardForDraggingProps,
  useCardDragHook,
} from 'components/Card/useCardDragHook';
import { graphql } from '../../gql';

const UpdateCardDoc: TypedDocumentNode<
  UpdateCardMutation,
  UpdateCardMutationVariables
> = graphql(`
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
    // @ts-expect-error type mismatch. TODO add generics to useMutation
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
