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
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Board = {
  __typename?: 'Board';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  id: Scalars['ID'];
  lists: Array<List>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BoardUpdateInput = {
  lists: ListUpdateManyInput;
};

export type BoardWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Card = {
  __typename?: 'Card';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
};

export type CardCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CardUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CardUpdateManyInput = {
  connect?: InputMaybe<Array<CardWhereUniqueInput>>;
  create?: InputMaybe<Array<CardCreateInput>>;
  disconnect?: InputMaybe<Array<CardWhereUniqueInput>>;
};

export type CardWhereUniqueInput = {
  id: Scalars['ID'];
};

export type List = {
  __typename?: 'List';
  cards: Array<Card>;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ListCreateInput = {
  name: Scalars['String'];
};

export type ListScalarWhereInput = {
  id_in: Array<Scalars['ID']>;
};

export type ListUpdateInput = {
  cards?: InputMaybe<CardUpdateManyInput>;
};

export type ListUpdateManyInput = {
  create?: InputMaybe<Array<ListCreateInput>>;
  delete?: InputMaybe<Array<ListWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ListScalarWhereInput>>;
};

export type ListWhereUniqueInput = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: User;
  deleteBoard: Board;
  deleteList: List;
  renameList: List;
  updateBoard: Board;
  updateCard: Card;
  updateList: List;
};

export type MutationCreateBoardArgs = {
  name: Scalars['String'];
};

export type MutationDeleteBoardArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteListArgs = {
  id: Scalars['ID'];
};

export type MutationRenameListArgs = {
  newName: Scalars['String'];
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
  /** authenticated current user */
  me?: Maybe<User>;
};

export type QueryBoardArgs = {
  where: BoardWhereUniqueInput;
};

export type QueryListArgs = {
  where: QueryListInput;
};

export type QueryListInput = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  boards: Array<Board>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type MeQueryQueryVariables = Exact<{ [key: string]: never }>;

export type MeQueryQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    email: string;
    id: string;
    name: string;
    avatarUrl?: string | null;
  } | null;
};

export type BoardQueryVariables = Exact<{
  boardId: Scalars['ID'];
}>;

export type BoardQuery = {
  __typename?: 'Query';
  board?: {
    __typename?: 'Board';
    name: string;
    id: string;
    lists: Array<{ __typename?: 'List'; name: string; id: string }>;
  } | null;
};

export type Board_BoardFragment = {
  __typename?: 'Board';
  name: string;
  id: string;
  lists: Array<{ __typename?: 'List'; name: string; id: string }>;
};

export type CreateBoardMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type CreateBoardMutation = {
  __typename?: 'Mutation';
  createBoard: {
    __typename?: 'User';
    name: string;
    id: string;
    boards: Array<{ __typename?: 'Board'; name: string; id: string }>;
  };
};

export type DeleteBoardMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteBoardMutation = {
  __typename?: 'Mutation';
  deleteBoard: { __typename?: 'Board'; id: string };
};

export type UserBoardsQueryVariables = Exact<{ [key: string]: never }>;

export type UserBoardsQuery = {
  __typename?: 'Query';
  me?: {
    __typename?: 'User';
    name: string;
    id: string;
    boards: Array<{ __typename?: 'Board'; name: string; id: string }>;
  } | null;
};

export type AddListMutationVariables = Exact<{
  boardId: Scalars['ID'];
  name: Scalars['String'];
}>;

export type AddListMutation = {
  __typename?: 'Mutation';
  updateBoard: {
    __typename?: 'Board';
    name: string;
    id: string;
    lists: Array<{ __typename?: 'List'; name: string; id: string }>;
  };
};

export type DeleteListsOfBoardMutationVariables = Exact<{
  boardId: Scalars['ID'];
  listIds: Array<Scalars['ID']> | Scalars['ID'];
}>;

export type DeleteListsOfBoardMutation = {
  __typename?: 'Mutation';
  updateBoard: {
    __typename?: 'Board';
    name: string;
    id: string;
    lists: Array<{ __typename?: 'List'; name: string; id: string }>;
  };
};

export type DeleteListOfBoardMutationVariables = Exact<{
  boardId: Scalars['ID'];
  listId: Scalars['ID'];
}>;

export type DeleteListOfBoardMutation = {
  __typename?: 'Mutation';
  updateBoard: {
    __typename?: 'Board';
    name: string;
    id: string;
    lists: Array<{ __typename?: 'List'; name: string; id: string }>;
  };
};

export type CardListQueryVariables = Exact<{
  cardListId: Scalars['ID'];
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

export type MoveCardMutationVariables = Exact<{
  cardId: Scalars['ID'];
  oldCardListId: Scalars['ID'];
  cardListId: Scalars['ID'];
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

export type AddCardMutationMutationVariables = Exact<{
  cardListId: Scalars['ID'];
  name: Scalars['String'];
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
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
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

export const Board_BoardFragmentDoc = gql`
  fragment Board_board on Board {
    name
    id
    lists {
      name
      id
    }
  }
`;
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
export const MeQueryDocument = gql`
  query MeQuery {
    me {
      email
      id
      name
      avatarUrl
    }
  }
`;

/**
 * __useMeQueryQuery__
 *
 * To run a query within a React component, call `useMeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQueryQuery, MeQueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQueryQuery, MeQueryQueryVariables>(
    MeQueryDocument,
    options
  );
}
export function useMeQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQueryQuery, MeQueryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQueryQuery, MeQueryQueryVariables>(
    MeQueryDocument,
    options
  );
}
export type MeQueryQueryHookResult = ReturnType<typeof useMeQueryQuery>;
export type MeQueryLazyQueryHookResult = ReturnType<typeof useMeQueryLazyQuery>;
export type MeQueryQueryResult = Apollo.QueryResult<
  MeQueryQuery,
  MeQueryQueryVariables
>;
export const BoardDocument = gql`
  query board($boardId: ID!) {
    board(where: { id: $boardId }) {
      ...Board_board
    }
  }
  ${Board_BoardFragmentDoc}
`;

/**
 * __useBoardQuery__
 *
 * To run a query within a React component, call `useBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardQuery({
 *   variables: {
 *      boardId: // value for 'boardId'
 *   },
 * });
 */
export function useBoardQuery(
  baseOptions: Apollo.QueryHookOptions<BoardQuery, BoardQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BoardQuery, BoardQueryVariables>(
    BoardDocument,
    options
  );
}
export function useBoardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BoardQuery, BoardQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BoardQuery, BoardQueryVariables>(
    BoardDocument,
    options
  );
}
export type BoardQueryHookResult = ReturnType<typeof useBoardQuery>;
export type BoardLazyQueryHookResult = ReturnType<typeof useBoardLazyQuery>;
export type BoardQueryResult = Apollo.QueryResult<
  BoardQuery,
  BoardQueryVariables
>;
export const CreateBoardDocument = gql`
  mutation createBoard($name: String!) {
    createBoard(name: $name) {
      name
      id
      boards {
        name
        id
      }
    }
  }
`;
export type CreateBoardMutationFn = Apollo.MutationFunction<
  CreateBoardMutation,
  CreateBoardMutationVariables
>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(
    CreateBoardDocument,
    options
  );
}
export type CreateBoardMutationHookResult = ReturnType<
  typeof useCreateBoardMutation
>;
export type CreateBoardMutationResult =
  Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<
  CreateBoardMutation,
  CreateBoardMutationVariables
>;
export const DeleteBoardDocument = gql`
  mutation deleteBoard($id: ID!) {
    deleteBoard(id: $id) {
      id
    }
  }
`;
export type DeleteBoardMutationFn = Apollo.MutationFunction<
  DeleteBoardMutation,
  DeleteBoardMutationVariables
>;

/**
 * __useDeleteBoardMutation__
 *
 * To run a mutation, you first call `useDeleteBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBoardMutation, { data, loading, error }] = useDeleteBoardMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteBoardMutation,
    DeleteBoardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(
    DeleteBoardDocument,
    options
  );
}
export type DeleteBoardMutationHookResult = ReturnType<
  typeof useDeleteBoardMutation
>;
export type DeleteBoardMutationResult =
  Apollo.MutationResult<DeleteBoardMutation>;
export type DeleteBoardMutationOptions = Apollo.BaseMutationOptions<
  DeleteBoardMutation,
  DeleteBoardMutationVariables
>;
export const UserBoardsDocument = gql`
  query userBoards {
    me {
      name
      id
      boards {
        name
        id
      }
    }
  }
`;

/**
 * __useUserBoardsQuery__
 *
 * To run a query within a React component, call `useUserBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserBoardsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserBoardsQuery,
    UserBoardsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserBoardsQuery, UserBoardsQueryVariables>(
    UserBoardsDocument,
    options
  );
}
export function useUserBoardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserBoardsQuery,
    UserBoardsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserBoardsQuery, UserBoardsQueryVariables>(
    UserBoardsDocument,
    options
  );
}
export type UserBoardsQueryHookResult = ReturnType<typeof useUserBoardsQuery>;
export type UserBoardsLazyQueryHookResult = ReturnType<
  typeof useUserBoardsLazyQuery
>;
export type UserBoardsQueryResult = Apollo.QueryResult<
  UserBoardsQuery,
  UserBoardsQueryVariables
>;
export const AddListDocument = gql`
  mutation addList($boardId: ID!, $name: String!) {
    updateBoard(
      data: { lists: { create: { name: $name } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
  ${Board_BoardFragmentDoc}
`;
export type AddListMutationFn = Apollo.MutationFunction<
  AddListMutation,
  AddListMutationVariables
>;

/**
 * __useAddListMutation__
 *
 * To run a mutation, you first call `useAddListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addListMutation, { data, loading, error }] = useAddListMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddListMutation,
    AddListMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddListMutation, AddListMutationVariables>(
    AddListDocument,
    options
  );
}
export type AddListMutationHookResult = ReturnType<typeof useAddListMutation>;
export type AddListMutationResult = Apollo.MutationResult<AddListMutation>;
export type AddListMutationOptions = Apollo.BaseMutationOptions<
  AddListMutation,
  AddListMutationVariables
>;
export const DeleteListsOfBoardDocument = gql`
  mutation deleteListsOfBoard($boardId: ID!, $listIds: [ID!]!) {
    updateBoard(
      data: { lists: { deleteMany: { id_in: $listIds } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
  ${Board_BoardFragmentDoc}
`;
export type DeleteListsOfBoardMutationFn = Apollo.MutationFunction<
  DeleteListsOfBoardMutation,
  DeleteListsOfBoardMutationVariables
>;

/**
 * __useDeleteListsOfBoardMutation__
 *
 * To run a mutation, you first call `useDeleteListsOfBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListsOfBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListsOfBoardMutation, { data, loading, error }] = useDeleteListsOfBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      listIds: // value for 'listIds'
 *   },
 * });
 */
export function useDeleteListsOfBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteListsOfBoardMutation,
    DeleteListsOfBoardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteListsOfBoardMutation,
    DeleteListsOfBoardMutationVariables
  >(DeleteListsOfBoardDocument, options);
}
export type DeleteListsOfBoardMutationHookResult = ReturnType<
  typeof useDeleteListsOfBoardMutation
>;
export type DeleteListsOfBoardMutationResult =
  Apollo.MutationResult<DeleteListsOfBoardMutation>;
export type DeleteListsOfBoardMutationOptions = Apollo.BaseMutationOptions<
  DeleteListsOfBoardMutation,
  DeleteListsOfBoardMutationVariables
>;
export const DeleteListOfBoardDocument = gql`
  mutation deleteListOfBoard($boardId: ID!, $listId: ID!) {
    updateBoard(
      data: { lists: { delete: { id: $listId } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
  ${Board_BoardFragmentDoc}
`;
export type DeleteListOfBoardMutationFn = Apollo.MutationFunction<
  DeleteListOfBoardMutation,
  DeleteListOfBoardMutationVariables
>;

/**
 * __useDeleteListOfBoardMutation__
 *
 * To run a mutation, you first call `useDeleteListOfBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListOfBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListOfBoardMutation, { data, loading, error }] = useDeleteListOfBoardMutation({
 *   variables: {
 *      boardId: // value for 'boardId'
 *      listId: // value for 'listId'
 *   },
 * });
 */
export function useDeleteListOfBoardMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteListOfBoardMutation,
    DeleteListOfBoardMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteListOfBoardMutation,
    DeleteListOfBoardMutationVariables
  >(DeleteListOfBoardDocument, options);
}
export type DeleteListOfBoardMutationHookResult = ReturnType<
  typeof useDeleteListOfBoardMutation
>;
export type DeleteListOfBoardMutationResult =
  Apollo.MutationResult<DeleteListOfBoardMutation>;
export type DeleteListOfBoardMutationOptions = Apollo.BaseMutationOptions<
  DeleteListOfBoardMutation,
  DeleteListOfBoardMutationVariables
>;
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
  baseOptions: Apollo.QueryHookOptions<CardListQuery, CardListQueryVariables>
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
export type CardListQueryHookResult = ReturnType<typeof useCardListQuery>;
export type CardListLazyQueryHookResult = ReturnType<
  typeof useCardListLazyQuery
>;
export type CardListQueryResult = Apollo.QueryResult<
  CardListQuery,
  CardListQueryVariables
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
