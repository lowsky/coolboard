import { Button, Flex, Skeleton } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { CardList } from 'components/List/CardList';
import { FaPlus } from 'react-icons/fa';
import { CardListHeader } from 'components/List/CardListHeader';

interface BoardContentProps {
  lists: { name: string; id: string }[];
  addList: () => void;
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
    overflow="auto">
    {lists.map((list) => (
      <Suspense
        key={list.id}
        fallback={
          <Skeleton minHeight="2rem">
            <CardListHeader
              name={list.name}
              listId={list.id}
              readonly></CardListHeader>
          </Skeleton>
        }>
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

const AddListButton = ({ onAddNewList }: { onAddNewList: () => void }) => (
  <Button
    onClick={onAddNewList}
    flexShrink={0}
    flexGrow={0}
    leftIcon={<FaPlus />}>
    Add a list
  </Button>
);
