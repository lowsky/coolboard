import React from 'react';
import { Flex } from '@chakra-ui/react';
import { TransactionResult } from '@instantdb/core';

import { BoardTitle } from './BoardTitle';
import { BoardContent } from './BoardContent';
import { DelAllListsButton } from './DelAllListsButton';

const ToIdsMapper = <T extends { id: string }>(itemWithId: T) => itemWithId.id;

type BoardProps = {
  board: {
    name: string; //
    id: string;
    cardLists: { name: string; id: string }[];
  };
  addListToBoard: (name?: string) => Promise<TransactionResult>;
  deleteLists: (ids: string[]) => Promise<TransactionResult>;
  readonly?: boolean;
};

export const BoardContainer = (props: BoardProps) => {
  const { board, deleteLists, readonly, addListToBoard } = props;
  const { name, cardLists: lists = [] } = board;

  const headerActions = !readonly && (
    <DelAllListsButton action={() => deleteLists(lists.map(ToIdsMapper))}>
      Delete All
    </DelAllListsButton>
  );
  return (
    <Flex flexDir="column" maxW="100%" flexGrow={1}>
      <BoardTitle boardName={name} headerActions={headerActions} />
      <BoardContent
        lists={lists}
        addList={addListToBoard}
        boardId={board.id}
        readonly={readonly ?? false}
      />
    </Flex>
  );
};
