import { createContext, useContext } from 'react';
import { InstantReactWeb } from '@instantdb/react/src/InstantReactWeb';
import { init } from '@instantdb/react';
import { TransactionResult } from '@instantdb/core/src';

const defaultUser: User = {
  email: 'anonymouse@instant',
  id: '-1',
  boards: [],
  nickname: '',
  createdAt: 0,
};
type AuthUser = Omit<User, 'boards'>;

export const UserContext = createContext<AuthUser>(defaultUser);
export const DBContext = createContext<InstantWeb>(
  null as unknown as InstantWeb
);

// ----------
export type CardList = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  cards: Card[];
  // parent
  board: Board;
};

export type Card = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  // parent
  cardList: CardList;
};

export type Board = {
  id: string;
  name: string;
  createdAt: number;
  cardLists: CardList[];
  // parent
  user: User;
};

export type User = {
  id: string;
  email: string;
  nickname: string;
  createdAt: number;
  boards: Board[];
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

export type InstantWeb = InstantReactWeb<Schema, {}>;

// Visit https://instantdb.com/dash to get your APP_ID :)
const APP_ID = 'd7674f24-278e-4ab4-828d-b9bea241f85a';

export const db: InstantWeb = init<Schema>({ appId: APP_ID });

export function useDb() {
  return useContext(DBContext);
}

export function useAuthUser() {
  return useContext(UserContext);
}

export type WithId = { id: string };
export type IdBasedTransaction = ({ id }: WithId) => Promise<TransactionResult>;
