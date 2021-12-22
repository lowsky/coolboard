import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
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
  UpdatedAtDesc = 'updatedAt_DESC'
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
  UpdatedAtDesc = 'updatedAt_DESC'
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
  updatedBy?: InputMaybe<UserUpdateOneInput>;
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
  UpdatedAtDesc = 'updatedAt_DESC'
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
  authenticate?: Maybe<User>;
  createBoard: User;
  deleteBoard: Board;
  deleteList?: Maybe<List>;
  updateBoard?: Maybe<Board>;
  updateCard: Card;
  updateList?: Maybe<List>;
};


export type MutationAuthenticateArgs = {
  idToken: Scalars['String'];
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
  Updated = 'UPDATED'
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

export type Subscription = {
  __typename?: 'Subscription';
  board?: Maybe<BoardSubscriptionPayload>;
  card?: Maybe<CardSubscriptionPayload>;
  list?: Maybe<ListSubscriptionPayload>;
  user?: Maybe<UserSubscriptionPayload>;
};


export type SubscriptionBoardArgs = {
  where?: InputMaybe<BoardSubscriptionWhereInput>;
};


export type SubscriptionCardArgs = {
  where?: InputMaybe<CardSubscriptionWhereInput>;
};


export type SubscriptionListArgs = {
  where?: InputMaybe<ListSubscriptionWhereInput>;
};


export type SubscriptionUserArgs = {
  where?: InputMaybe<UserSubscriptionWhereInput>;
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
  UpdatedAtDesc = 'updatedAt_DESC'
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

export type MeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQueryQuery = { __typename?: 'Query', me?: { __typename?: 'User', email: string, id: string, name: string, avatarUrl?: string | null | undefined } | null | undefined };


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
export function useMeQueryQuery(baseOptions?: Apollo.QueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, options);
      }
export function useMeQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQueryQuery, MeQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQueryQuery, MeQueryQueryVariables>(MeQueryDocument, options);
        }
export type MeQueryQueryHookResult = ReturnType<typeof useMeQueryQuery>;
export type MeQueryLazyQueryHookResult = ReturnType<typeof useMeQueryLazyQuery>;
export type MeQueryQueryResult = Apollo.QueryResult<MeQueryQuery, MeQueryQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {}
};
      export default result;
    