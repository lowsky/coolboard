export const typeDefs = `
type AggregateBoard {
  count: Int!
}

type AggregateCard {
  count: Int!
}

type AggregateList {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Board {
  id: ID!
  lists(
    where: ListWhereInput
    orderBy: ListOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
  ): [List!]
  name: String!
  updatedBy: User
  createdAt: DateTime!
  updatedAt: DateTime!
}

type BoardConnection {
  pageInfo: PageInfo!
  edges: [BoardEdge]!
  aggregate: AggregateBoard!
}

input BoardCreateInput {
  lists: ListCreateManyInput
  name: String!
  updatedBy: UserCreateOneWithoutBoardsInput
}

input BoardCreateManyWithoutUpdatedByInput {
  create: [BoardCreateWithoutUpdatedByInput!]
  connect: [BoardWhereUniqueInput!]
}

input BoardCreateWithoutUpdatedByInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  updatedBy: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [CardWhereInput!]
  OR: [CardWhereInput!]
  NOT: [CardWhereInput!]
}

input CardWhereUniqueInput {
  id: ID
}

scalar DateTime

type List {
  cards(
    where: CardWhereInput
    orderBy: CardOrderByInput
    skip: Int
    after: String
    before: String
    first: Int
    last: Int
  ): [Card!]
  id: ID!
  name: String!
  updatedBy: User
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ListConnection {
  pageInfo: PageInfo!
  edges: [ListEdge]!
  aggregate: AggregateList!
}

input ListCreateInput {
  cards: CardCreateManyInput
  name: String!
  updatedBy: UserCreateOneInput
}

input ListCreateManyInput {
  create: [ListCreateInput!]
  connect: [ListWhereUniqueInput!]
}

type ListEdge {
  node: List!
  cursor: String!
}

enum ListOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ListPreviousValues {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input ListScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ListScalarWhereInput!]
  OR: [ListScalarWhereInput!]
  NOT: [ListScalarWhereInput!]
}

type ListSubscriptionPayload {
  mutation: MutationType!
  node: List
  updatedFields: [String!]
  previousValues: ListPreviousValues
}

input ListSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ListWhereInput
  AND: [ListSubscriptionWhereInput!]
  OR: [ListSubscriptionWhereInput!]
  NOT: [ListSubscriptionWhereInput!]
}

input ListUpdateDataInput {
  cards: CardUpdateManyInput
  name: String
  updatedBy: UserUpdateOneInput
}

input ListUpdateInput {
  cards: CardUpdateManyInput
  name: String
  updatedBy: UserUpdateOneInput
}

input ListUpdateManyDataInput {
  name: String
}

input ListUpdateManyInput {
  create: [ListCreateInput!]
  update: [ListUpdateWithWhereUniqueNestedInput!]
  upsert: [ListUpsertWithWhereUniqueNestedInput!]
  delete: [ListWhereUniqueInput!]
  connect: [ListWhereUniqueInput!]
  set: [ListWhereUniqueInput!]
  disconnect: [ListWhereUniqueInput!]
  deleteMany: [ListScalarWhereInput!]
  updateMany: [ListUpdateManyWithWhereNestedInput!]
}

input ListUpdateManyMutationInput {
  name: String
}

input ListUpdateManyWithWhereNestedInput {
  where: ListScalarWhereInput!
  data: ListUpdateManyDataInput!
}

input ListUpdateWithWhereUniqueNestedInput {
  where: ListWhereUniqueInput!
  data: ListUpdateDataInput!
}

input ListUpsertWithWhereUniqueNestedInput {
  where: ListWhereUniqueInput!
  update: ListUpdateDataInput!
  create: ListCreateInput!
}

input ListWhereInput {
  cards_every: CardWhereInput
  cards_some: CardWhereInput
  cards_none: CardWhereInput
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  updatedBy: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [ListWhereInput!]
  OR: [ListWhereInput!]
  NOT: [ListWhereInput!]
}

input ListWhereUniqueInput {
  id: ID
}

scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

###
#interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}



type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  name: String!
  avatarUrl: String
  boards: BoardCreateManyWithoutUpdatedByInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutBoardsInput {
  create: UserCreateWithoutBoardsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutBoardsInput {
  email: String!
  password: String!
  name: String!
  avatarUrl: String
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  name_ASC
  name_DESC
  avatarUrl_ASC
  avatarUrl_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  name: String!
  avatarUrl: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  email: String
  password: String
  name: String
  avatarUrl: String
  boards: BoardUpdateManyWithoutUpdatedByInput
}

input UserUpdateInput {
  email: String
  password: String
  name: String
  avatarUrl: String
  boards: BoardUpdateManyWithoutUpdatedByInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  name: String
  avatarUrl: String
}

input UserUpdateOneInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutBoardsInput {
  create: UserCreateWithoutBoardsInput
  update: UserUpdateWithoutBoardsDataInput
  upsert: UserUpsertWithoutBoardsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutBoardsDataInput {
  email: String
  password: String
  name: String
  avatarUrl: String
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutBoardsInput {
  update: UserUpdateWithoutBoardsDataInput!
  create: UserCreateWithoutBoardsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  avatarUrl: String
  avatarUrl_not: String
  avatarUrl_in: [String!]
  avatarUrl_not_in: [String!]
  avatarUrl_lt: String
  avatarUrl_lte: String
  avatarUrl_gt: String
  avatarUrl_gte: String
  avatarUrl_contains: String
  avatarUrl_not_contains: String
  avatarUrl_starts_with: String
  avatarUrl_not_starts_with: String
  avatarUrl_ends_with: String
  avatarUrl_not_ends_with: String
  boards_every: BoardWhereInput
  boards_some: BoardWhereInput
  boards_none: BoardWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
















type AuthPayload {
  token: String!
  user: User!
}

type User {
  id: ID!
  email: String!
  name: String!
  avatarUrl: String
  boards: [Board]
}
`;
