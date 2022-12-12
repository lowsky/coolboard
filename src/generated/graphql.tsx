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
  DateTime: any;
  Long: any;
};

export type AggregateBoard = {
  __typename?: 'AggregateBoard';
  count: Scalars['Int'];
};

export type AggregateCard = {
  __typename?: 'AggregateCard';
  count: Scalars['Int'];
};

export type AggregateList = {
  __typename?: 'AggregateList';
  count: Scalars['Int'];
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  count: Scalars['Int'];
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Long'];
};

export type Board = {
  __typename?: 'Board';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  lists?: Maybe<Array<List>>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy?: Maybe<User>;
};

export type BoardListsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ListOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ListWhereInput>;
};

export type BoardConnection = {
  __typename?: 'BoardConnection';
  aggregate: AggregateBoard;
  edges: Array<Maybe<BoardEdge>>;
  pageInfo: PageInfo;
};

export type BoardCreateInput = {
  lists?: InputMaybe<ListCreateManyInput>;
  name: Scalars['String'];
  updatedBy?: InputMaybe<UserCreateOneWithoutBoardsInput>;
};

export type BoardCreateManyWithoutUpdatedByInput = {
  connect?: InputMaybe<Array<BoardWhereUniqueInput>>;
  create?: InputMaybe<Array<BoardCreateWithoutUpdatedByInput>>;
};

export type BoardCreateWithoutUpdatedByInput = {
  lists?: InputMaybe<ListCreateManyInput>;
  name: Scalars['String'];
};

export type BoardEdge = {
  __typename?: 'BoardEdge';
  cursor: Scalars['String'];
  node: Board;
};

export enum BoardOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type BoardPreviousValues = {
  __typename?: 'BoardPreviousValues';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type BoardScalarWhereInput = {
  AND?: InputMaybe<Array<BoardScalarWhereInput>>;
  NOT?: InputMaybe<Array<BoardScalarWhereInput>>;
  OR?: InputMaybe<Array<BoardScalarWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type BoardSubscriptionPayload = {
  __typename?: 'BoardSubscriptionPayload';
  mutation: MutationType;
  node?: Maybe<Board>;
  previousValues?: Maybe<BoardPreviousValues>;
  updatedFields?: Maybe<Array<Scalars['String']>>;
};

export type BoardSubscriptionWhereInput = {
  AND?: InputMaybe<Array<BoardSubscriptionWhereInput>>;
  NOT?: InputMaybe<Array<BoardSubscriptionWhereInput>>;
  OR?: InputMaybe<Array<BoardSubscriptionWhereInput>>;
  mutation_in?: InputMaybe<Array<MutationType>>;
  node?: InputMaybe<BoardWhereInput>;
  updatedFields_contains?: InputMaybe<Scalars['String']>;
  updatedFields_contains_every?: InputMaybe<Array<Scalars['String']>>;
  updatedFields_contains_some?: InputMaybe<Array<Scalars['String']>>;
};

export type BoardUpdateInput = {
  lists?: InputMaybe<ListUpdateManyInput>;
  name?: InputMaybe<Scalars['String']>;
  updatedBy?: InputMaybe<UserUpdateOneWithoutBoardsInput>;
};

export type BoardUpdateManyDataInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type BoardUpdateManyMutationInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type BoardUpdateManyWithWhereNestedInput = {
  data: BoardUpdateManyDataInput;
  where: BoardScalarWhereInput;
};

export type BoardUpdateManyWithoutUpdatedByInput = {
  connect?: InputMaybe<Array<BoardWhereUniqueInput>>;
  create?: InputMaybe<Array<BoardCreateWithoutUpdatedByInput>>;
  delete?: InputMaybe<Array<BoardWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<BoardScalarWhereInput>>;
  disconnect?: InputMaybe<Array<BoardWhereUniqueInput>>;
  update?: InputMaybe<Array<BoardUpdateWithWhereUniqueWithoutUpdatedByInput>>;
  updateMany?: InputMaybe<Array<BoardUpdateManyWithWhereNestedInput>>;
  upsert?: InputMaybe<Array<BoardUpsertWithWhereUniqueWithoutUpdatedByInput>>;
};

export type BoardUpdateWithWhereUniqueWithoutUpdatedByInput = {
  data: BoardUpdateWithoutUpdatedByDataInput;
  where: BoardWhereUniqueInput;
};

export type BoardUpdateWithoutUpdatedByDataInput = {
  lists?: InputMaybe<ListUpdateManyInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type BoardUpsertWithWhereUniqueWithoutUpdatedByInput = {
  create: BoardCreateWithoutUpdatedByInput;
  update: BoardUpdateWithoutUpdatedByDataInput;
  where: BoardWhereUniqueInput;
};

export type BoardWhereInput = {
  AND?: InputMaybe<Array<BoardWhereInput>>;
  NOT?: InputMaybe<Array<BoardWhereInput>>;
  OR?: InputMaybe<Array<BoardWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  lists_every?: InputMaybe<ListWhereInput>;
  lists_none?: InputMaybe<ListWhereInput>;
  lists_some?: InputMaybe<ListWhereInput>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export type BoardWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Card = {
  __typename?: 'Card';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy?: Maybe<User>;
};

export type CardCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  updatedBy?: InputMaybe<UserCreateOneInput>;
};

export type CardCreateManyInput = {
  connect?: InputMaybe<Array<CardWhereUniqueInput>>;
  create?: InputMaybe<Array<CardCreateInput>>;
};

export type CardEdge = {
  __typename?: 'CardEdge';
  cursor: Scalars['String'];
  node: Card;
};

export enum CardOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type CardPreviousValues = {
  __typename?: 'CardPreviousValues';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CardScalarWhereInput = {
  AND?: InputMaybe<Array<CardScalarWhereInput>>;
  NOT?: InputMaybe<Array<CardScalarWhereInput>>;
  OR?: InputMaybe<Array<CardScalarWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type CardSubscriptionPayload = {
  __typename?: 'CardSubscriptionPayload';
  mutation: MutationType;
  node?: Maybe<Card>;
  previousValues?: Maybe<CardPreviousValues>;
  updatedFields?: Maybe<Array<Scalars['String']>>;
};

export type CardSubscriptionWhereInput = {
  AND?: InputMaybe<Array<CardSubscriptionWhereInput>>;
  NOT?: InputMaybe<Array<CardSubscriptionWhereInput>>;
  OR?: InputMaybe<Array<CardSubscriptionWhereInput>>;
  mutation_in?: InputMaybe<Array<MutationType>>;
  node?: InputMaybe<CardWhereInput>;
  updatedFields_contains?: InputMaybe<Scalars['String']>;
  updatedFields_contains_every?: InputMaybe<Array<Scalars['String']>>;
  updatedFields_contains_some?: InputMaybe<Array<Scalars['String']>>;
};

export type CardUpdateDataInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedBy?: InputMaybe<UserUpdateOneInput>;
};

export type CardUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CardUpdateManyDataInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CardUpdateManyInput = {
  connect?: InputMaybe<Array<CardWhereUniqueInput>>;
  create?: InputMaybe<Array<CardCreateInput>>;
  delete?: InputMaybe<Array<CardWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<CardScalarWhereInput>>;
  disconnect?: InputMaybe<Array<CardWhereUniqueInput>>;
  set?: InputMaybe<Array<CardWhereUniqueInput>>;
  update?: InputMaybe<Array<CardUpdateWithWhereUniqueNestedInput>>;
  updateMany?: InputMaybe<Array<CardUpdateManyWithWhereNestedInput>>;
  upsert?: InputMaybe<Array<CardUpsertWithWhereUniqueNestedInput>>;
};

export type CardUpdateManyMutationInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CardUpdateManyWithWhereNestedInput = {
  data: CardUpdateManyDataInput;
  where: CardScalarWhereInput;
};

export type CardUpdateWithWhereUniqueNestedInput = {
  data: CardUpdateDataInput;
  where: CardWhereUniqueInput;
};

export type CardUpsertWithWhereUniqueNestedInput = {
  create: CardCreateInput;
  update: CardUpdateDataInput;
  where: CardWhereUniqueInput;
};

export type CardWhereInput = {
  AND?: InputMaybe<Array<CardWhereInput>>;
  NOT?: InputMaybe<Array<CardWhereInput>>;
  OR?: InputMaybe<Array<CardWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export type CardWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type List = {
  __typename?: 'List';
  cards?: Maybe<Array<Card>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy?: Maybe<User>;
};

export type ListCardsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CardOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CardWhereInput>;
};

export type ListConnection = {
  __typename?: 'ListConnection';
  aggregate: AggregateList;
  edges: Array<Maybe<ListEdge>>;
  pageInfo: PageInfo;
};

export type ListCreateInput = {
  cards?: InputMaybe<CardCreateManyInput>;
  name: Scalars['String'];
  updatedBy?: InputMaybe<UserCreateOneInput>;
};

export type ListCreateManyInput = {
  connect?: InputMaybe<Array<ListWhereUniqueInput>>;
  create?: InputMaybe<Array<ListCreateInput>>;
};

export type ListEdge = {
  __typename?: 'ListEdge';
  cursor: Scalars['String'];
  node: List;
};

export enum ListOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type ListPreviousValues = {
  __typename?: 'ListPreviousValues';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ListScalarWhereInput = {
  AND?: InputMaybe<Array<ListScalarWhereInput>>;
  NOT?: InputMaybe<Array<ListScalarWhereInput>>;
  OR?: InputMaybe<Array<ListScalarWhereInput>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type ListSubscriptionPayload = {
  __typename?: 'ListSubscriptionPayload';
  mutation: MutationType;
  node?: Maybe<List>;
  previousValues?: Maybe<ListPreviousValues>;
  updatedFields?: Maybe<Array<Scalars['String']>>;
};

export type ListSubscriptionWhereInput = {
  AND?: InputMaybe<Array<ListSubscriptionWhereInput>>;
  NOT?: InputMaybe<Array<ListSubscriptionWhereInput>>;
  OR?: InputMaybe<Array<ListSubscriptionWhereInput>>;
  mutation_in?: InputMaybe<Array<MutationType>>;
  node?: InputMaybe<ListWhereInput>;
  updatedFields_contains?: InputMaybe<Scalars['String']>;
  updatedFields_contains_every?: InputMaybe<Array<Scalars['String']>>;
  updatedFields_contains_some?: InputMaybe<Array<Scalars['String']>>;
};

export type ListUpdateDataInput = {
  cards?: InputMaybe<CardUpdateManyInput>;
  name?: InputMaybe<Scalars['String']>;
  updatedBy?: InputMaybe<UserUpdateOneInput>;
};

export type ListUpdateInput = {
  cards?: InputMaybe<CardUpdateManyInput>;
  name?: InputMaybe<Scalars['String']>;
  updatedBy?: InputMaybe<UserUpdateOneInput>;
};

export type ListUpdateManyDataInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type ListUpdateManyInput = {
  connect?: InputMaybe<Array<ListWhereUniqueInput>>;
  create?: InputMaybe<Array<ListCreateInput>>;
  delete?: InputMaybe<Array<ListWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ListScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ListWhereUniqueInput>>;
  set?: InputMaybe<Array<ListWhereUniqueInput>>;
  update?: InputMaybe<Array<ListUpdateWithWhereUniqueNestedInput>>;
  updateMany?: InputMaybe<Array<ListUpdateManyWithWhereNestedInput>>;
  upsert?: InputMaybe<Array<ListUpsertWithWhereUniqueNestedInput>>;
};

export type ListUpdateManyMutationInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type ListUpdateManyWithWhereNestedInput = {
  data: ListUpdateManyDataInput;
  where: ListScalarWhereInput;
};

export type ListUpdateWithWhereUniqueNestedInput = {
  data: ListUpdateDataInput;
  where: ListWhereUniqueInput;
};

export type ListUpsertWithWhereUniqueNestedInput = {
  create: ListCreateInput;
  update: ListUpdateDataInput;
  where: ListWhereUniqueInput;
};

export type ListWhereInput = {
  AND?: InputMaybe<Array<ListWhereInput>>;
  NOT?: InputMaybe<Array<ListWhereInput>>;
  OR?: InputMaybe<Array<ListWhereInput>>;
  cards_every?: InputMaybe<CardWhereInput>;
  cards_none?: InputMaybe<CardWhereInput>;
  cards_some?: InputMaybe<CardWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export type ListWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBoard: User;
  deleteBoard: Board;
  deleteList?: Maybe<List>;
  updateBoard?: Maybe<Board>;
  updateCard: Card;
  updateList?: Maybe<List>;
};

export type MutationCreateBoardArgs = {
  name: Scalars['String'];
};

export type MutationDeleteBoardArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteListArgs = {
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

export enum MutationType {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  list?: Maybe<List>;
  me?: Maybe<User>;
};

export type QueryBoardArgs = {
  where: BoardWhereUniqueInput;
};

export type QueryListArgs = {
  where: ListWhereUniqueInput;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  boards?: Maybe<Array<Maybe<Board>>>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  aggregate: AggregateUser;
  edges: Array<Maybe<UserEdge>>;
  pageInfo: PageInfo;
};

export type UserCreateInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  boards?: InputMaybe<BoardCreateManyWithoutUpdatedByInput>;
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserCreateOneInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserCreateOneWithoutBoardsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateWithoutBoardsInput>;
};

export type UserCreateWithoutBoardsInput = {
  auth0id?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  identity?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export enum UserOrderByInput {
  Auth0idAsc = 'auth0id_ASC',
  Auth0idDesc = 'auth0id_DESC',
  AvatarUrlAsc = 'avatarUrl_ASC',
  AvatarUrlDesc = 'avatarUrl_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IdentityAsc = 'identity_ASC',
  IdentityDesc = 'identity_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type UserPreviousValues = {
  __typename?: 'UserPreviousValues';
  auth0id?: Maybe<Scalars['String']>;
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  identity?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserSubscriptionPayload = {
  __typename?: 'UserSubscriptionPayload';
  mutation: MutationType;
  node?: Maybe<User>;
  previousValues?: Maybe<UserPreviousValues>;
  updatedFields?: Maybe<Array<Scalars['String']>>;
};

export type UserSubscriptionWhereInput = {
  AND?: InputMaybe<Array<UserSubscriptionWhereInput>>;
  NOT?: InputMaybe<Array<UserSubscriptionWhereInput>>;
  OR?: InputMaybe<Array<UserSubscriptionWhereInput>>;
  mutation_in?: InputMaybe<Array<MutationType>>;
  node?: InputMaybe<UserWhereInput>;
  updatedFields_contains?: InputMaybe<Scalars['String']>;
  updatedFields_contains_every?: InputMaybe<Array<Scalars['String']>>;
  updatedFields_contains_some?: InputMaybe<Array<Scalars['String']>>;
};

export type UserUpdateDataInput = {
  auth0id?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  boards?: InputMaybe<BoardUpdateManyWithoutUpdatedByInput>;
  email?: InputMaybe<Scalars['String']>;
  identity?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserUpdateInput = {
  auth0id?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  boards?: InputMaybe<BoardUpdateManyWithoutUpdatedByInput>;
  email?: InputMaybe<Scalars['String']>;
  identity?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserUpdateManyMutationInput = {
  auth0id?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  identity?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserUpdateOneInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateDataInput>;
  upsert?: InputMaybe<UserUpsertNestedInput>;
};

export type UserUpdateOneWithoutBoardsInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateWithoutBoardsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<UserUpdateWithoutBoardsDataInput>;
  upsert?: InputMaybe<UserUpsertWithoutBoardsInput>;
};

export type UserUpdateWithoutBoardsDataInput = {
  auth0id?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  identity?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UserUpsertNestedInput = {
  create: UserCreateInput;
  update: UserUpdateDataInput;
};

export type UserUpsertWithoutBoardsInput = {
  create: UserCreateWithoutBoardsInput;
  update: UserUpdateWithoutBoardsDataInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  auth0id?: InputMaybe<Scalars['String']>;
  auth0id_contains?: InputMaybe<Scalars['String']>;
  auth0id_ends_with?: InputMaybe<Scalars['String']>;
  auth0id_gt?: InputMaybe<Scalars['String']>;
  auth0id_gte?: InputMaybe<Scalars['String']>;
  auth0id_in?: InputMaybe<Array<Scalars['String']>>;
  auth0id_lt?: InputMaybe<Scalars['String']>;
  auth0id_lte?: InputMaybe<Scalars['String']>;
  auth0id_not?: InputMaybe<Scalars['String']>;
  auth0id_not_contains?: InputMaybe<Scalars['String']>;
  auth0id_not_ends_with?: InputMaybe<Scalars['String']>;
  auth0id_not_in?: InputMaybe<Array<Scalars['String']>>;
  auth0id_not_starts_with?: InputMaybe<Scalars['String']>;
  auth0id_starts_with?: InputMaybe<Scalars['String']>;
  avatarUrl?: InputMaybe<Scalars['String']>;
  avatarUrl_contains?: InputMaybe<Scalars['String']>;
  avatarUrl_ends_with?: InputMaybe<Scalars['String']>;
  avatarUrl_gt?: InputMaybe<Scalars['String']>;
  avatarUrl_gte?: InputMaybe<Scalars['String']>;
  avatarUrl_in?: InputMaybe<Array<Scalars['String']>>;
  avatarUrl_lt?: InputMaybe<Scalars['String']>;
  avatarUrl_lte?: InputMaybe<Scalars['String']>;
  avatarUrl_not?: InputMaybe<Scalars['String']>;
  avatarUrl_not_contains?: InputMaybe<Scalars['String']>;
  avatarUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  avatarUrl_not_in?: InputMaybe<Array<Scalars['String']>>;
  avatarUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  avatarUrl_starts_with?: InputMaybe<Scalars['String']>;
  boards_every?: InputMaybe<BoardWhereInput>;
  boards_none?: InputMaybe<BoardWhereInput>;
  boards_some?: InputMaybe<BoardWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  createdAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
  email?: InputMaybe<Scalars['String']>;
  email_contains?: InputMaybe<Scalars['String']>;
  email_ends_with?: InputMaybe<Scalars['String']>;
  email_gt?: InputMaybe<Scalars['String']>;
  email_gte?: InputMaybe<Scalars['String']>;
  email_in?: InputMaybe<Array<Scalars['String']>>;
  email_lt?: InputMaybe<Scalars['String']>;
  email_lte?: InputMaybe<Scalars['String']>;
  email_not?: InputMaybe<Scalars['String']>;
  email_not_contains?: InputMaybe<Scalars['String']>;
  email_not_ends_with?: InputMaybe<Scalars['String']>;
  email_not_in?: InputMaybe<Array<Scalars['String']>>;
  email_not_starts_with?: InputMaybe<Scalars['String']>;
  email_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_contains?: InputMaybe<Scalars['ID']>;
  id_ends_with?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_contains?: InputMaybe<Scalars['ID']>;
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  id_starts_with?: InputMaybe<Scalars['ID']>;
  identity?: InputMaybe<Scalars['String']>;
  identity_contains?: InputMaybe<Scalars['String']>;
  identity_ends_with?: InputMaybe<Scalars['String']>;
  identity_gt?: InputMaybe<Scalars['String']>;
  identity_gte?: InputMaybe<Scalars['String']>;
  identity_in?: InputMaybe<Array<Scalars['String']>>;
  identity_lt?: InputMaybe<Scalars['String']>;
  identity_lte?: InputMaybe<Scalars['String']>;
  identity_not?: InputMaybe<Scalars['String']>;
  identity_not_contains?: InputMaybe<Scalars['String']>;
  identity_not_ends_with?: InputMaybe<Scalars['String']>;
  identity_not_in?: InputMaybe<Array<Scalars['String']>>;
  identity_not_starts_with?: InputMaybe<Scalars['String']>;
  identity_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_in?: InputMaybe<Array<Scalars['DateTime']>>;
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type UserWhereUniqueInput = {
  auth0id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
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
  boardId?: InputMaybe<Scalars['ID']>;
}>;

export type BoardQuery = {
  __typename?: 'Query';
  board?: {
    __typename?: 'Board';
    name: string;
    id: string;
    lists?: Array<{ __typename?: 'List'; name: string; id: string }> | null;
  } | null;
};

export type Board_BoardFragment = {
  __typename?: 'Board';
  name: string;
  id: string;
  lists?: Array<{ __typename?: 'List'; name: string; id: string }> | null;
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
    boards?: Array<{
      __typename?: 'Board';
      name: string;
      id: string;
    } | null> | null;
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
    boards?: Array<{
      __typename?: 'Board';
      name: string;
      id: string;
    } | null> | null;
  } | null;
};

export type AddListMutationVariables = Exact<{
  boardId: Scalars['ID'];
  name: Scalars['String'];
}>;

export type AddListMutation = {
  __typename?: 'Mutation';
  updateBoard?: {
    __typename?: 'Board';
    name: string;
    id: string;
    lists?: Array<{ __typename?: 'List'; name: string; id: string }> | null;
  } | null;
};

export type DeleteListsOfBoardMutationVariables = Exact<{
  boardId: Scalars['ID'];
  listIds: Array<Scalars['ID']> | Scalars['ID'];
}>;

export type DeleteListsOfBoardMutation = {
  __typename?: 'Mutation';
  updateBoard?: {
    __typename?: 'Board';
    name: string;
    id: string;
    lists?: Array<{ __typename?: 'List'; name: string; id: string }> | null;
  } | null;
};

export type DeleteListOfBoardMutationVariables = Exact<{
  boardId: Scalars['ID'];
  listId: Scalars['ID'];
}>;

export type DeleteListOfBoardMutation = {
  __typename?: 'Mutation';
  updateBoard?: {
    __typename?: 'Board';
    name: string;
    id: string;
    lists?: Array<{ __typename?: 'List'; name: string; id: string }> | null;
  } | null;
};

export type CardListQueryVariables = Exact<{
  cardListId?: InputMaybe<Scalars['ID']>;
}>;

export type CardListQuery = {
  __typename?: 'Query';
  list?: {
    __typename?: 'List';
    name: string;
    id: string;
    cards?: Array<{
      __typename?: 'Card';
      id: string;
      name: string;
      description?: string | null;
      createdAt: any;
      updatedAt: any;
      updatedBy?: {
        __typename?: 'User';
        avatarUrl?: string | null;
        email: string;
        name: string;
        id: string;
      } | null;
    }> | null;
  } | null;
};

export type MoveCardMutationVariables = Exact<{
  cardId: Scalars['ID'];
  oldCardListId: Scalars['ID'];
  cardListId: Scalars['ID'];
}>;

export type MoveCardMutation = {
  __typename?: 'Mutation';
  newList?: {
    __typename?: 'List';
    name: string;
    id: string;
    cards?: Array<{
      __typename?: 'Card';
      id: string;
      name: string;
      description?: string | null;
      createdAt: any;
      updatedAt: any;
      updatedBy?: {
        __typename?: 'User';
        avatarUrl?: string | null;
        email: string;
        name: string;
        id: string;
      } | null;
    }> | null;
  } | null;
  oldList?: {
    __typename?: 'List';
    name: string;
    id: string;
    cards?: Array<{
      __typename?: 'Card';
      id: string;
      name: string;
      description?: string | null;
      createdAt: any;
      updatedAt: any;
      updatedBy?: {
        __typename?: 'User';
        avatarUrl?: string | null;
        email: string;
        name: string;
        id: string;
      } | null;
    }> | null;
  } | null;
};

export type AddCardMutationMutationVariables = Exact<{
  cardListId: Scalars['ID'];
  name: Scalars['String'];
}>;

export type AddCardMutationMutation = {
  __typename?: 'Mutation';
  updateList?: {
    __typename?: 'List';
    name: string;
    id: string;
    cards?: Array<{
      __typename?: 'Card';
      id: string;
      name: string;
      description?: string | null;
      createdAt: any;
      updatedAt: any;
      updatedBy?: {
        __typename?: 'User';
        avatarUrl?: string | null;
        email: string;
        name: string;
        id: string;
      } | null;
    }> | null;
  } | null;
};

export type UpdateCardMutationVariables = Exact<{
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
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
    updatedBy?: {
      __typename?: 'User';
      avatarUrl?: string | null;
      email: string;
      name: string;
      id: string;
    } | null;
  };
};

export type CardList_ListFragment = {
  __typename?: 'List';
  name: string;
  id: string;
  cards?: Array<{
    __typename?: 'Card';
    id: string;
    name: string;
    description?: string | null;
    createdAt: any;
    updatedAt: any;
    updatedBy?: {
      __typename?: 'User';
      avatarUrl?: string | null;
      email: string;
      name: string;
      id: string;
    } | null;
  }> | null;
};

export type Card_CardFragment = {
  __typename?: 'Card';
  id: string;
  name: string;
  description?: string | null;
  createdAt: any;
  updatedAt: any;
  updatedBy?: {
    __typename?: 'User';
    avatarUrl?: string | null;
    email: string;
    name: string;
    id: string;
  } | null;
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
  query board($boardId: ID) {
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
  baseOptions?: Apollo.QueryHookOptions<BoardQuery, BoardQueryVariables>
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
  query CardList($cardListId: ID) {
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
  baseOptions?: Apollo.QueryHookOptions<CardListQuery, CardListQueryVariables>
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
  mutation updateCard($id: ID!, $name: String, $description: String) {
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
