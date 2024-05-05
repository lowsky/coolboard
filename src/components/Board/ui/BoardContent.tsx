import { Flex } from '@chakra-ui/react';
import React, { Suspense } from 'react';

import { CardList } from 'components/List/CardList';
import { AddListButton } from 'components/Board/ui/AddListButton';
import { CardListSkeleton } from 'components/List/ui/CardListSkeleton';

interface BoardContentProps {
  lists: { name: string; id: string }[];
  addList: (name?: string) => Promise<any>;
  boardId: string;
  readonly?: boolean;
}

export const BoardContent = ({
  boardId,
  lists,
  addList,
  readonly = false,
}: BoardContentProps) => (
  <Flex
    data-cy="board-container-inner"
    textAlign="left"
    bg="blue"
    p="1rem"
    flex="1"
    gap="0.4em"
    alignItems="flex-start"
    overflow="auto">
    {lists.map((list) => (
      <Suspense
        key={list.id}
        fallback={<CardListSkeleton name={list.name} id={list.id} />}>
        <CardList
          key={list.id}
          name={list.name}
          id={list.id}
          boardId={boardId}
          readonly={readonly}
        />
      </Suspense>
    ))}
    {!readonly && <AddListButton onAddNewList={addList} />}
  </Flex>
);
