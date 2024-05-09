import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
};

export type Board = {
  __typename?: 'Board';
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  lists: Array<List>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BoardUpdateInput = {
  lists: ListUpdateManyInput;
};

export type BoardWhereUniqueInput = {
  id: Scalars['ID']['input'];
};

export type Card = {
  __typename?: 'Card';
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  updatedBy: User;
};

export type CardCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CardUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CardUpdateManyInput = {
  /** @deprecated better use moveCard instead */
  connect?: InputMaybe<Array<CardWhereUniqueInput>>;
  create?: InputMaybe<Array<CardCreateInput>>;
  /** @deprecated better use moveCard instead */
  disconnect?: InputMaybe<Array<CardWhereUniqueInput>>;
};

export type CardWhereUniqueInput = {
  id: Scalars['ID']['input'];
};

export type List = {
  __typename?: 'List';
  cards: Array<Card>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ListCreateInput = {
  name: Scalars['String']['input'];
};

export type ListScalarWhereInput = {
  id_in: Array<Scalars['ID']['input']>;
};

export type ListUpdateInput = {
  cards?: InputMaybe<CardUpdateManyInput>;
};

export type ListUpdateManyInput = {
  create?: InputMaybe<Array<ListCreateInput>>;
  delete?: InputMaybe<Array<ListWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ListScalarWhereInput>>;
};

export type ListWhereIdInput = {
  id: Scalars['ID']['input'];
};

export type ListWhereUniqueInput = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: User;
  deleteBoard: Board;
  deleteList: List;
  moveCard?: Maybe<Card>;
  renameList: List;
  updateBoard: Board;
  updateCard: Card;
  updateList: List;
};

export type MutationCreateBoardArgs = {
  name: Scalars['String']['input'];
};

export type MutationDeleteBoardArgs = {
  id: Scalars['ID']['input'];
};

export type MutationDeleteListArgs = {
  id: Scalars['ID']['input'];
};

export type MutationMoveCardArgs = {
  fromListId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  toListId: Scalars['ID']['input'];
};

export type MutationRenameListArgs = {
  newName: Scalars['String']['input'];
  where: ListWhereUniqueInput;
};

export type MutationUpdateBoardArgs = {
  data: BoardUpdateInput;
  where: BoardWhereUniqueInput;
};

export type MutationUpdateCardArgs = {
  data: CardUpdateInput;
  where: CardWhereUniqueInput;
};

export type MutationUpdateListArgs = {
  data: ListUpdateInput;
  where: ListWhereUniqueInput;
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  list?: Maybe<List>;
  /** Authenticated current user */
  me?: Maybe<User>;
  ping: Scalars['String']['output'];
};

export type QueryBoardArgs = {
  where: BoardWhereUniqueInput;
};

export type QueryListArgs = {
  where: ListWhereIdInput;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  boards: Array<Board>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CardListQueryVariables = Exact<{
  cardListId: Scalars['ID']['input'];
}>;

export type CardListQuery = {
  __typename?: 'Query';
  list?: {
    __typename?: 'List';
    name: string;
    id: string;
    cards: Array<{
      __typename?: 'Card';
      id: string;
      name: string;
      description?: string | null;
      createdAt: any;
      updatedAt: any;
      updatedBy: {
        __typename?: 'User';
        avatarUrl?: string | null;
        email: string;
        name: string;
        id: string;
      };
    }>;
  } | null;
};

export type RenameListMutationVariables = Exact<{
  newName: Scalars['String']['input'];
  listId: Scalars['ID']['input'];
}>;

export type RenameListMutation = {
  __typename?: 'Mutation';
  renameList: { __typename?: 'List'; id: string; name: string };
};

export type MoveCardMutationVariables = Exact<{
  cardId: Scalars['ID']['input'];
  oldCardListId: Scalars['ID']['input'];
  cardListId: Scalars['ID']['input'];
}>;

export type MoveCardMutation = {
  __typename?: 'Mutation';
  newList: {
    __typename?: 'List';
    name: string;
    id: string;
    cards: Array<{
      __typename?: 'Card';
      id: string;
      name: string;
      description?: string | null;
      createdAt: any;
      updatedAt: any;
      updatedBy: {
        __typename?: 'User';
        avatarUrl?: string | null;
        email: string;
        name: string;
        id: string;
      };
    }>;
  };
  oldList: {
    __typename?: 'List';
    name: string;
    id: string;
    cards: Array<{
      __typename?: 'Card';
      id: string;
      name: string;
      description?: string | null;
      createdAt: any;
      updatedAt: any;
      updatedBy: {
        __typename?: 'User';
        avatarUrl?: string | null;
        email: string;
        name: string;
        id: string;
      };
    }>;
  };
};

export type MoveCard2MutationVariables = Exact<{
  cardId: Scalars['ID']['input'];
  toList: Scalars['ID']['input'];
  fromListId: Scalars['ID']['input'];
}>;

export type MoveCard2Mutation = {
  __typename?: 'Mutation';
  moveCard?: {
    __typename?: 'Card';
    id: string;
    name: string;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
    updatedBy: {
      __typename?: 'User';
      avatarUrl?: string | null;
      email: string;
      name: string;
      id: string;
    };
  } | null;
};

export type AddCardMutationMutationVariables = Exact<{
  cardListId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;

export type AddCardMutationMutation = {
  __typename?: 'Mutation';
  updateList: {
    __typename?: 'List';
    name: string;
    id: string;
    cards: Array<{
      __typename?: 'Card';
      id: string;
      name: string;
      description?: string | null;
      createdAt: any;
      updatedAt: any;
      updatedBy: {
        __typename?: 'User';
        avatarUrl?: string | null;
        email: string;
        name: string;
        id: string;
      };
    }>;
  };
};

export type UpdateCardMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;

export type UpdateCardMutation = {
  __typename?: 'Mutation';
  updateCard: {
    __typename?: 'Card';
    id: string;
    name: string;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
    updatedBy: {
      __typename?: 'User';
      avatarUrl?: string | null;
      email: string;
      name: string;
      id: string;
    };
  };
};

export type CardList_ListFragment = {
  __typename?: 'List';
  name: string;
  id: string;
  cards: Array<{
    __typename?: 'Card';
    id: string;
    name: string;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
    updatedBy: {
      __typename?: 'User';
      avatarUrl?: string | null;
      email: string;
      name: string;
      id: string;
    };
  }>;
};

export type Card_CardFragment = {
  __typename?: 'Card';
  id: string;
  name: string;
  description?: string | null;
  createdAt: any;
  updatedAt: any;
  updatedBy: {
    __typename?: 'User';
    avatarUrl?: string | null;
    email: string;
    name: string;
    id: string;
  };
};

export const Card_CardFragmentDoc = gql`
  fragment Card_card on Card {
    id
    name
    description
    createdAt
    updatedAt
    updatedBy {
      avatarUrl
      email
      name
      id
    }
  }
`;
export const CardList_ListFragmentDoc = gql`
  fragment CardList_list on List {
    name
    id
    cards {
      ...Card_card
    }
  }
  ${Card_CardFragmentDoc}
`;
export const CardListDocument = gql`
  query CardList($cardListId: ID!) {
    list(where: { id: $cardListId }) {
      ...CardList_list
    }
  }
  ${CardList_ListFragmentDoc}
`;

/**
 * __useCardListQuery__
 *
 * To run a query within a React component, call `useCardListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardListQuery({
 *   variables: {
 *      cardListId: // value for 'cardListId'
 *   },
 * });
 */
export function useCardListQuery(
  baseOptions: Apollo.QueryHookOptions<CardListQuery, CardListQueryVariables> &
    ({ variables: CardListQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CardListQuery, CardListQueryVariables>(
    CardListDocument,
    options
  );
}
export function useCardListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CardListQuery,
    CardListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CardListQuery, CardListQueryVariables>(
    CardListDocument,
    options
  );
}
export function useCardListSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    CardListQuery,
    CardListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CardListQuery, CardListQueryVariables>(
    CardListDocument,
    options
  );
}
export type CardListQueryHookResult = ReturnType<typeof useCardListQuery>;
export type CardListLazyQueryHookResult = ReturnType<
  typeof useCardListLazyQuery
>;
export type CardListSuspenseQueryHookResult = ReturnType<
  typeof useCardListSuspenseQuery
>;
export type CardListQueryResult = Apollo.QueryResult<
  CardListQuery,
  CardListQueryVariables
>;
export const RenameListDocument = gql`
  mutation renameList($newName: String!, $listId: ID!) {
    renameList(newName: $newName, where: { id: $listId }) {
      id
      name
    }
  }
`;
export type RenameListMutationFn = Apollo.MutationFunction<
  RenameListMutation,
  RenameListMutationVariables
>;

/**
 * __useRenameListMutation__
 *
 * To run a mutation, you first call `useRenameListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameListMutation, { data, loading, error }] = useRenameListMutation({
 *   variables: {
 *      newName: // value for 'newName'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useRenameListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RenameListMutation,
    RenameListMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RenameListMutation, RenameListMutationVariables>(
    RenameListDocument,
    options
  );
}
export type RenameListMutationHookResult = ReturnType<
  typeof useRenameListMutation
>;
export type RenameListMutationResult =
  Apollo.MutationResult<RenameListMutation>;
export type RenameListMutationOptions = Apollo.BaseMutationOptions<
  RenameListMutation,
  RenameListMutationVariables
>;
export const MoveCardDocument = gql`
  mutation moveCard($cardId: ID!, $oldCardListId: ID!, $cardListId: ID!) {
    newList: updateList(
      data: { cards: { connect: { id: $cardId } } }
      where: { id: $cardListId }
    ) {
      ...CardList_list
    }
    oldList: updateList(
      data: { cards: { disconnect: { id: $cardId } } }
      where: { id: $oldCardListId }
    ) {
      ...CardList_list
    }
  }
  ${CardList_ListFragmentDoc}
`;
export type MoveCardMutationFn = Apollo.MutationFunction<
  MoveCardMutation,
  MoveCardMutationVariables
>;

/**
 * __useMoveCardMutation__
 *
 * To run a mutation, you first call `useMoveCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveCardMutation, { data, loading, error }] = useMoveCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      oldCardListId: // value for 'oldCardListId'
 *      cardListId: // value for 'cardListId'
 *   },
 * });
 */
export function useMoveCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MoveCardMutation,
    MoveCardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MoveCardMutation, MoveCardMutationVariables>(
    MoveCardDocument,
    options
  );
}
export type MoveCardMutationHookResult = ReturnType<typeof useMoveCardMutation>;
export type MoveCardMutationResult = Apollo.MutationResult<MoveCardMutation>;
export type MoveCardMutationOptions = Apollo.BaseMutationOptions<
  MoveCardMutation,
  MoveCardMutationVariables
>;
export const MoveCard2Document = gql`
  mutation moveCard2($cardId: ID!, $toList: ID!, $fromListId: ID!) {
    moveCard(id: $cardId, toListId: $toList, fromListId: $fromListId) {
      ...Card_card
    }
  }
  ${Card_CardFragmentDoc}
`;
export type MoveCard2MutationFn = Apollo.MutationFunction<
  MoveCard2Mutation,
  MoveCard2MutationVariables
>;

/**
 * __useMoveCard2Mutation__
 *
 * To run a mutation, you first call `useMoveCard2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveCard2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveCard2Mutation, { data, loading, error }] = useMoveCard2Mutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *      toList: // value for 'toList'
 *      fromListId: // value for 'fromListId'
 *   },
 * });
 */
export function useMoveCard2Mutation(
  baseOptions?: Apollo.MutationHookOptions<
    MoveCard2Mutation,
    MoveCard2MutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<MoveCard2Mutation, MoveCard2MutationVariables>(
    MoveCard2Document,
    options
  );
}
export type MoveCard2MutationHookResult = ReturnType<
  typeof useMoveCard2Mutation
>;
export type MoveCard2MutationResult = Apollo.MutationResult<MoveCard2Mutation>;
export type MoveCard2MutationOptions = Apollo.BaseMutationOptions<
  MoveCard2Mutation,
  MoveCard2MutationVariables
>;
export const AddCardMutationDocument = gql`
  mutation addCardMutation($cardListId: ID!, $name: String!) {
    updateList(
      data: { cards: { create: { name: $name } } }
      where: { id: $cardListId }
    ) {
      ...CardList_list
    }
  }
  ${CardList_ListFragmentDoc}
`;
export type AddCardMutationMutationFn = Apollo.MutationFunction<
  AddCardMutationMutation,
  AddCardMutationMutationVariables
>;

/**
 * __useAddCardMutationMutation__
 *
 * To run a mutation, you first call `useAddCardMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCardMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCardMutationMutation, { data, loading, error }] = useAddCardMutationMutation({
 *   variables: {
 *      cardListId: // value for 'cardListId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddCardMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCardMutationMutation,
    AddCardMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddCardMutationMutation,
    AddCardMutationMutationVariables
  >(AddCardMutationDocument, options);
}
export type AddCardMutationMutationHookResult = ReturnType<
  typeof useAddCardMutationMutation
>;
export type AddCardMutationMutationResult =
  Apollo.MutationResult<AddCardMutationMutation>;
export type AddCardMutationMutationOptions = Apollo.BaseMutationOptions<
  AddCardMutationMutation,
  AddCardMutationMutationVariables
>;
export const UpdateCardDocument = gql`
  mutation updateCard($id: ID!, $name: String!, $description: String) {
    updateCard(
      where: { id: $id }
      data: { name: $name, description: $description }
    ) {
      ...Card_card
    }
  }
  ${Card_CardFragmentDoc}
`;
export type UpdateCardMutationFn = Apollo.MutationFunction<
  UpdateCardMutation,
  UpdateCardMutationVariables
>;

/**
 * __useUpdateCardMutation__
 *
 * To run a mutation, you first call `useUpdateCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCardMutation, { data, loading, error }] = useUpdateCardMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateCardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCardMutation,
    UpdateCardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCardMutation, UpdateCardMutationVariables>(
    UpdateCardDocument,
    options
  );
}
export type UpdateCardMutationHookResult = ReturnType<
  typeof useUpdateCardMutation
>;
export type UpdateCardMutationResult =
  Apollo.MutationResult<UpdateCardMutation>;
export type UpdateCardMutationOptions = Apollo.BaseMutationOptions<
  UpdateCardMutation,
  UpdateCardMutationVariables
>;
