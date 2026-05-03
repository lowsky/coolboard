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
  /** authenticated current user */
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
