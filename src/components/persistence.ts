import {
  db,
  IdBasedTransaction,
  Schema,
  useAuthUser,
  useDb,
  WithId,
} from '../setupInstaWeb';
import { TransactionResult } from '@instantdb/core/src';
import { id, Query, QueryResponse, tx } from '@instantdb/react';
import React from 'react';

/* ---- all Boards / Board List ---------------------- */

export function useBoardsQuery() {
  const db = useDb();
  return db.useQuery({
    boards: { user: {} },
  });
}

/* ---- Board  ---------------------- */
export function useCreateBoard() {
  const db = useDb();
  const user = useAuthUser();

  return ({ name }): Promise<TransactionResult> =>
    db.transact(
      tx.boards[id()]
        .update({
          name,
          createdAt: Date.now(),
        })
        //does not work: .link({ user: userId })
        //.link({ user: userId })
        .link({ user: user.id })
    );
}
export function useBoardQuery(id: string) {
  const db = useDb();
  const query = {
    boards: {
      cardLists: {},
      $: {
        where: {
          id,
        },
      },
    },
  };
  return db.useQuery(query);
}
export function useDeleteBoard(): IdBasedTransaction {
  const db = useDb();
  return ({ id }: WithId): Promise<TransactionResult> =>
    db.transact(tx.boards[id].delete());
}

/* ---- Card lists ---------------------- */

export function useCardListQuery({
  variables,
}: {
  variables: { cardListId: string };
}) {
  const db = useDb();
  const query = {
    cardList: {
      cards: {},
      $: {
        where: {
          id: variables.cardListId,
        },
      },
    },
  };

  const useQuery:
    | ({ debugRef: React.LegacyRef<any> } & {
        error: { message: string };
        data: undefined;
      } & {
        isLoading: boolean;
      })
    | ({ debugRef: React.LegacyRef<any> } & {
        error: undefined;
        data: QueryResponse<Query, Schema>;
      } & {
        isLoading: boolean;
      }) = db.useQuery(query);

  return useQuery;
}

export const useDeleteListOfBoardMutation = () => {
  const db = useDb();
  const mutation = ({
    variables,
  }: {
    variables: { listIds: string[]; boardId: string };
  }) => {
    return db.transact(
      variables.listIds.map((listId) => tx.cardList[listId].delete())
    );
  };

  return [mutation];
};

export function useAddListMutation() {
  const db = useDb();
  const mutation = async ({
    variables: { boardId, name },
  }: {
    variables: {
      boardId: string;
      name: string;
    };
  }): Promise<TransactionResult> => {
    return db.transact(
      tx.cardList[id()]
        .update({
          name,
          createdAt: Date.now(),
        })
        // singular, as in the modified mapping works:
        //
        .link({ board: boardId })
      //initially it would create many-to-many, with boards
    );
  };
  return [mutation];
}

export function useRenameListMutation() {
  const db = useDb();
  const mutation = async ({
    variables: { listId, newName },
  }: {
    variables: {
      listId: string;
      newName: string;
    };
  }): Promise<TransactionResult> => {
    return db.transact(
      tx.cardList[listId].update({
        name: newName,
        updatedAt: Date.now(),
      })
    );
  };
  return [mutation];
}

/* ---- Card  ---------------------- */

export function useAddCardMutation(_p0: {
  variables: { name: string; cardListId: string };
}): (({
  variables: { cardListId, name },
}: {
  variables: { cardListId: string; name: string };
}) => Promise<TransactionResult>)[] {
  const db = useDb();

  const mutation: ({
    variables: { cardListId, name },
  }: {
    variables: { cardListId: string; name: string };
  }) => Promise<TransactionResult> = async ({
    variables: { cardListId, name },
  }: {
    variables: { cardListId: string; name: string };
  }): Promise<TransactionResult> => {
    return db.transact(
      tx.card[id()]
        .update({
          name,
          createdAt: Date.now(),
        })
        // singular, as in the modified mapping works:
        //
        .link({ cardList: cardListId })
    );
  };

  return [mutation];
}

export function useMoveCard2Mutation() {
  const mutation = async (_p0: {
    variables: { fromListId: string; toList: string; cardId: string };
  }) => {
    const {
      variables: { fromListId, toList, cardId },
    } = _p0;

    return await db
      .transact(
        tx.card[cardId]
          .update({
            updatedAt: Date.now(),
          })
          .unlink({ cardList: fromListId })
          .link({ cardList: toList })
      )
      .then((value) => console.log('then', value))
      .catch((err) => console.error('err', err));
  };
  return [mutation];
}

export function useRunDignosis() {
  /** debug / diagnosis ------------*/
  const query = {
    users: { boards: {} },
    boards: {
      cardLists: {},
    },
    cardList: {
      board: {},
    },
  };
  const { data } = db.useQuery(query);

  if (data) {
    console.log('users', data.users);
    console.log('boards', data.boards);
    console.log('cardLists', data.cardList);
  }
  /** debug / diagnosis ------------*/
}

export type UpdateCardMutationVariables = {
  id: string;
  name: string;
  description?: string;
};

export function useUpdateCardMutation(_p0: {
  variables: UpdateCardMutationVariables;
}) {
  const db = useDb();
  const mutation = async ({
    variables,
  }: {
    variables: UpdateCardMutationVariables;
  }): Promise<TransactionResult> => {
    return db.transact(
      tx.card[variables.id].update({
        name: variables.name,
        updatedAt: Date.now(),
      })
    );
  };
  return [mutation];
}
