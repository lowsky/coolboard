import { ApolloClient, gql, TypedDocumentNode } from '@apollo/client';
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
import { CardCardDoc } from 'components/List/list.graphql';

const UpdateCardDoc: TypedDocumentNode<
  UpdateCardMutation,
  UpdateCardMutationVariables
> = gql`
  mutation updateCard($id: ID!, $name: String!, $description: String) {
    updateCard(
      where: { id: $id }
      data: { name: $name, description: $description }
    ) {
      ...Card_card
    }
  }
  ${CardCardDoc}
`;

function CardForDragging(props: CardForDraggingProps) {
  const { setNodeRef, attributes, listeners, isDragging } =
    useCardDragHook(props);

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <Card {...props} isDragging={isDragging} />
    </div>
  );
}

function Card(props: CardType & { isDragging?: boolean }) {
  const [mutation] = useMutation(UpdateCardDoc, {
    variables: {
      name: props.name,
      description: props.description,
      id: props.id,
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
