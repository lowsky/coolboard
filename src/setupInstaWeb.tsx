import { createContext, useContext } from 'react';
import { InstantReactWeb } from '@instantdb/react/src/InstantReactWeb';
import { init, User as AuthUser } from '@instantdb/react';
import { TransactionResult } from '@instantdb/core/src';

const anonymousUser: User = {
  email: 'anonymouse@instant',
  id: '-1',
  boards: [],
  refresh_token: '-',
};

export const UserContext = createContext<AuthUser | undefined>(anonymousUser);
export const DBContext = createContext<InstantWeb>(
  null as unknown as InstantWeb
);

// ----------
export type User = AuthUser & {
  boards: Board[];
  avatarUrl?: string;
  name?: string;
};

export type CardList = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  cards: Card[];
  // parent
  board: Board;
  // MISSING from graphql approach:
  //createdAt: DateTime;
  //updatedAt: DateTime;
  createdBy: User;
};

export type Card = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  // parent
  cardList: CardList;
  // MISSING from graphql approach:
  createdBy: User;
  description?: string;
  //createdAt: DateTime;
  //updatedAt: DateTime;
  updatedBy: User;
};

export type Board = {
  id: string;
  name: string;
  createdAt: number;
  cardLists: CardList[];
  // parent
  user: User;
  // MISSING from graphql approach:
  //createdAt: DateTime;
  //updatedAt: DateTime;
  createdBy: User;
};

/*
type Users = users
{
  id: UUID,
  email: string :is_unique,
  hande: string :is_unique :is_indexed,
  createdAt: number
}
*/

export type Schema = {
  users: User;
  boards: Board;
  cardList: CardList;
  card: Card;
};

export type InstantWeb = InstantReactWeb<Schema>;

// Visit https://instantdb.com/dash to get your APP_ID :)
const APP_ID = 'd7674f24-278e-4ab4-828d-b9bea241f85a';

export const db: InstantWeb = init<Schema>({ appId: APP_ID });

export function useDb(): InstantReactWeb<Schema> {
  return useContext(DBContext);
}

export const useAuth = db.useAuth;

export function useAuthUser() {
  return useContext(UserContext);
}

// types

export type WithId = { id: string };
export type IdBasedTransaction = ({ id }: WithId) => Promise<TransactionResult>;
