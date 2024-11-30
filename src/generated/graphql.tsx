export type DateTime = string;

export type Board = {
  createdAt: DateTime;
  createdBy: User;
  id: string;
  lists: Array<List>;
  name: string;
  updatedAt: DateTime;
};

export type Card = {
  createdAt: DateTime;
  createdBy: User;
  description?: string;
  id: string;
  name: string;
  updatedAt: DateTime;
  updatedBy: User;
};

export type List = {
  cards: Array<Card>;
  createdAt: DateTime;
  createdBy: User;
  id: string;
  name: string;
  updatedAt: DateTime;
};

export type User = {
  avatarUrl?: string;
  boards: Array<Board>;
  email: string;
  id: string;
  name: string;
};
