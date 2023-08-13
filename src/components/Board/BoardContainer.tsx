import React from 'react';
import { Button, Flex, Icon } from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';

import { Board } from 'generated/graphql';
import { BoardTitle } from './BoardTitle';
import { BoardContent } from './BoardContent';
import { CardList } from 'components/Card/CardList';
import { useConfirmAction } from 'components/UseConfirmAction';

export const BoardContainer = (props: {
  board: Board;
  addList: () => Promise<any>;
  deleteLists: (ids: string[]) => Promise<any>;
  deleteList: (id: string) => Promise<any>;
}) => {
  const { board, addList, deleteLists, deleteList } = props;
  const { name, lists } = board;

  return (
    <Flex flexDir="column" maxW="100%" flexGrow={1} mt="1rem">
      <BoardTitle
        boardName={name}
        headerActions={
          <DelAllListsButton
            action={() => deleteLists(lists.map((list) => list.id))}>
            Delete All
          </DelAllListsButton>
        }
      />
      <BoardContent>
        {lists.map((list) => (
          <CardList
            key={list.id}
            name={list.name}
            id={list.id}
            deleteListWithId={(id) => deleteList(id)}
          />
        ))}
        <AddListButton onAddNewList={addList} />
      </BoardContent>
    </Flex>
  );
};

export const AddListButton = ({
  onAddNewList,
}: {
  onAddNewList: () => void;
}) => (
  <Button
    onClick={onAddNewList}
    flexShrink={0}
    flexGrow={0}
    leftIcon={<FaPlus />}>
    Add a list
  </Button>
);
export const DelAllListsButton = ({
  action,
  children,
}: {
  action: VoidFunction;
  children: React.ReactNode;
}) => {
  const [showWarning, showWarningThenCallAction] = useConfirmAction(action);

  return (
    <Button
      onClick={showWarningThenCallAction}
      color={showWarning ? 'red' : ''}
      flexShrink={0}
      flexGrow={0}
      alignSelf="flex-start">
      {showWarning && <span>This will be permanent!</span>}
      <Icon color={showWarning ? '' : 'red'} ml={showWarning ? '1em' : ''}>
        <FaTrash />
      </Icon>
      {children}
    </Button>
  );
};
