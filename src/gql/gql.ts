/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  mutation deleteListsOfBoard($boardId: ID!, $listIds: [ID!]!) {\n    updateBoard(\n      data: { lists: { deleteMany: { id_in: $listIds } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n': typeof types.DeleteListsOfBoardDocument;
  '\n  query board($boardId: ID!) {\n    board(where: { id: $boardId }) {\n      ...Board_board\n    }\n  }\n  \n': typeof types.BoardDocument;
  '\n  mutation addList($boardId: ID!, $name: String!) {\n    updateBoard(\n      data: { lists: { create: { name: $name } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n': typeof types.AddListDocument;
  '\n  query userBoards {\n    me {\n      name\n      id\n      boards {\n        name\n        id\n      }\n    }\n  }\n': typeof types.UserBoardsDocument;
  '\n  mutation deleteBoard($id: ID!) {\n    deleteBoard(id: $id) {\n      id\n    }\n  }\n': typeof types.DeleteBoardDocument;
  '\n  mutation createBoard($name: String!) {\n    createBoard(name: $name) {\n      name\n      id\n      boards {\n        name\n        id\n      }\n    }\n  }\n': typeof types.CreateBoardDocument;
  '\n  fragment Board_board on Board {\n    name\n    id\n    lists {\n      name\n      id\n    }\n  }\n': typeof types.Board_BoardFragmentDoc;
  '\n  mutation updateCard($id: ID!, $name: String!, $description: String) {\n    updateCard(\n      where: { id: $id }\n      data: { name: $name, description: $description }\n    ) {\n      ...Card_card\n    }\n  }\n  \n': typeof types.UpdateCardDocument;
  '\n  mutation moveCard2($cardId: ID!, $toList: ID!, $fromListId: ID!) {\n    moveCard(id: $cardId, toListId: $toList, fromListId: $fromListId) {\n      ...Card_card\n    }\n  }\n  \n': typeof types.MoveCard2Document;
  '\n  mutation deleteListOfBoard($boardId: ID!, $listId: ID!) {\n    updateBoard(\n      data: { lists: { delete: { id: $listId } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n': typeof types.DeleteListOfBoardDocument;
  '\n  query CardList($cardListId: ID!) {\n    list(where: { id: $cardListId }) {\n      ...CardList_list\n    }\n  }\n  \n': typeof types.CardListDocument;
  '\n  mutation addCardMutation($cardListId: ID!, $name: String!) {\n    updateList(\n      data: { cards: { create: { name: $name } } }\n      where: { id: $cardListId }\n    ) {\n      ...CardList_list\n    }\n  }\n  \n': typeof types.AddCardMutationDocument;
  '\n  fragment Card_card on Card {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    updatedBy {\n      avatarUrl\n      email\n      name\n      id\n    }\n  }\n': typeof types.Card_CardFragmentDoc;
  '\n  fragment CardList_list on List {\n    name\n    id\n    cards {\n      ...Card_card\n    }\n  }\n  \n': typeof types.CardList_ListFragmentDoc;
  '\n  mutation renameList($newName: String!, $listId: ID!) {\n    renameList(newName: $newName, where: { id: $listId }) {\n      id\n      name\n    }\n  }\n': typeof types.RenameListDocument;
};
const documents: Documents = {
  '\n  mutation deleteListsOfBoard($boardId: ID!, $listIds: [ID!]!) {\n    updateBoard(\n      data: { lists: { deleteMany: { id_in: $listIds } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n':
    types.DeleteListsOfBoardDocument,
  '\n  query board($boardId: ID!) {\n    board(where: { id: $boardId }) {\n      ...Board_board\n    }\n  }\n  \n':
    types.BoardDocument,
  '\n  mutation addList($boardId: ID!, $name: String!) {\n    updateBoard(\n      data: { lists: { create: { name: $name } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n':
    types.AddListDocument,
  '\n  query userBoards {\n    me {\n      name\n      id\n      boards {\n        name\n        id\n      }\n    }\n  }\n':
    types.UserBoardsDocument,
  '\n  mutation deleteBoard($id: ID!) {\n    deleteBoard(id: $id) {\n      id\n    }\n  }\n':
    types.DeleteBoardDocument,
  '\n  mutation createBoard($name: String!) {\n    createBoard(name: $name) {\n      name\n      id\n      boards {\n        name\n        id\n      }\n    }\n  }\n':
    types.CreateBoardDocument,
  '\n  fragment Board_board on Board {\n    name\n    id\n    lists {\n      name\n      id\n    }\n  }\n':
    types.Board_BoardFragmentDoc,
  '\n  mutation updateCard($id: ID!, $name: String!, $description: String) {\n    updateCard(\n      where: { id: $id }\n      data: { name: $name, description: $description }\n    ) {\n      ...Card_card\n    }\n  }\n  \n':
    types.UpdateCardDocument,
  '\n  mutation moveCard2($cardId: ID!, $toList: ID!, $fromListId: ID!) {\n    moveCard(id: $cardId, toListId: $toList, fromListId: $fromListId) {\n      ...Card_card\n    }\n  }\n  \n':
    types.MoveCard2Document,
  '\n  mutation deleteListOfBoard($boardId: ID!, $listId: ID!) {\n    updateBoard(\n      data: { lists: { delete: { id: $listId } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n':
    types.DeleteListOfBoardDocument,
  '\n  query CardList($cardListId: ID!) {\n    list(where: { id: $cardListId }) {\n      ...CardList_list\n    }\n  }\n  \n':
    types.CardListDocument,
  '\n  mutation addCardMutation($cardListId: ID!, $name: String!) {\n    updateList(\n      data: { cards: { create: { name: $name } } }\n      where: { id: $cardListId }\n    ) {\n      ...CardList_list\n    }\n  }\n  \n':
    types.AddCardMutationDocument,
  '\n  fragment Card_card on Card {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    updatedBy {\n      avatarUrl\n      email\n      name\n      id\n    }\n  }\n':
    types.Card_CardFragmentDoc,
  '\n  fragment CardList_list on List {\n    name\n    id\n    cards {\n      ...Card_card\n    }\n  }\n  \n':
    types.CardList_ListFragmentDoc,
  '\n  mutation renameList($newName: String!, $listId: ID!) {\n    renameList(newName: $newName, where: { id: $listId }) {\n      id\n      name\n    }\n  }\n':
    types.RenameListDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation deleteListsOfBoard($boardId: ID!, $listIds: [ID!]!) {\n    updateBoard(\n      data: { lists: { deleteMany: { id_in: $listIds } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation deleteListsOfBoard($boardId: ID!, $listIds: [ID!]!) {\n    updateBoard(\n      data: { lists: { deleteMany: { id_in: $listIds } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query board($boardId: ID!) {\n    board(where: { id: $boardId }) {\n      ...Board_board\n    }\n  }\n  \n'
): (typeof documents)['\n  query board($boardId: ID!) {\n    board(where: { id: $boardId }) {\n      ...Board_board\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation addList($boardId: ID!, $name: String!) {\n    updateBoard(\n      data: { lists: { create: { name: $name } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation addList($boardId: ID!, $name: String!) {\n    updateBoard(\n      data: { lists: { create: { name: $name } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query userBoards {\n    me {\n      name\n      id\n      boards {\n        name\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  query userBoards {\n    me {\n      name\n      id\n      boards {\n        name\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation deleteBoard($id: ID!) {\n    deleteBoard(id: $id) {\n      id\n    }\n  }\n'
): (typeof documents)['\n  mutation deleteBoard($id: ID!) {\n    deleteBoard(id: $id) {\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createBoard($name: String!) {\n    createBoard(name: $name) {\n      name\n      id\n      boards {\n        name\n        id\n      }\n    }\n  }\n'
): (typeof documents)['\n  mutation createBoard($name: String!) {\n    createBoard(name: $name) {\n      name\n      id\n      boards {\n        name\n        id\n      }\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Board_board on Board {\n    name\n    id\n    lists {\n      name\n      id\n    }\n  }\n'
): (typeof documents)['\n  fragment Board_board on Board {\n    name\n    id\n    lists {\n      name\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation updateCard($id: ID!, $name: String!, $description: String) {\n    updateCard(\n      where: { id: $id }\n      data: { name: $name, description: $description }\n    ) {\n      ...Card_card\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation updateCard($id: ID!, $name: String!, $description: String) {\n    updateCard(\n      where: { id: $id }\n      data: { name: $name, description: $description }\n    ) {\n      ...Card_card\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation moveCard2($cardId: ID!, $toList: ID!, $fromListId: ID!) {\n    moveCard(id: $cardId, toListId: $toList, fromListId: $fromListId) {\n      ...Card_card\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation moveCard2($cardId: ID!, $toList: ID!, $fromListId: ID!) {\n    moveCard(id: $cardId, toListId: $toList, fromListId: $fromListId) {\n      ...Card_card\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation deleteListOfBoard($boardId: ID!, $listId: ID!) {\n    updateBoard(\n      data: { lists: { delete: { id: $listId } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation deleteListOfBoard($boardId: ID!, $listId: ID!) {\n    updateBoard(\n      data: { lists: { delete: { id: $listId } } }\n      where: { id: $boardId }\n    ) {\n      ...Board_board\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query CardList($cardListId: ID!) {\n    list(where: { id: $cardListId }) {\n      ...CardList_list\n    }\n  }\n  \n'
): (typeof documents)['\n  query CardList($cardListId: ID!) {\n    list(where: { id: $cardListId }) {\n      ...CardList_list\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation addCardMutation($cardListId: ID!, $name: String!) {\n    updateList(\n      data: { cards: { create: { name: $name } } }\n      where: { id: $cardListId }\n    ) {\n      ...CardList_list\n    }\n  }\n  \n'
): (typeof documents)['\n  mutation addCardMutation($cardListId: ID!, $name: String!) {\n    updateList(\n      data: { cards: { create: { name: $name } } }\n      where: { id: $cardListId }\n    ) {\n      ...CardList_list\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment Card_card on Card {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    updatedBy {\n      avatarUrl\n      email\n      name\n      id\n    }\n  }\n'
): (typeof documents)['\n  fragment Card_card on Card {\n    id\n    name\n    description\n    createdAt\n    updatedAt\n    updatedBy {\n      avatarUrl\n      email\n      name\n      id\n    }\n  }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment CardList_list on List {\n    name\n    id\n    cards {\n      ...Card_card\n    }\n  }\n  \n'
): (typeof documents)['\n  fragment CardList_list on List {\n    name\n    id\n    cards {\n      ...Card_card\n    }\n  }\n  \n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation renameList($newName: String!, $listId: ID!) {\n    renameList(newName: $newName, where: { id: $listId }) {\n      id\n      name\n    }\n  }\n'
): (typeof documents)['\n  mutation renameList($newName: String!, $listId: ID!) {\n    renameList(newName: $newName, where: { id: $listId }) {\n      id\n      name\n    }\n  }\n'];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
