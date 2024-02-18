import React, { ReactNode } from 'react';
import { Button, Flex, Icon } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

import { BoardTitle } from './BoardTitle';
import { BoardContent } from './BoardContent';
import { useConfirmAction } from 'common/useConfirmAction';
import { useAddListMutation } from 'generated/graphql';

const ToIdsMapper = <T extends { id: string }>(itemWithId: T) => itemWithId.id;

export const BoardContainer = (props: {
  board: { name: string; id: string; lists: { name: string; id: string }[] };
  deleteLists: (ids: string[]) => Promise<any>;
  readonly?: boolean;
}) => {
  const { board, deleteLists, readonly } = props;
  const [addListToBoard] = useAddListMutation();
  const addList = () =>
    addListToBoard({
      variables: {
        boardId: board.id,
        name: 'new list',
      },
    });

  const { name, lists } = board;

  return (
    <Flex flexDir="column" maxW="100%" flexGrow={1}>
      <BoardTitle
        boardName={name}
        headerActions={
          !readonly && (
            <DelAllListsButton
              action={() => deleteLists(lists.map(ToIdsMapper))}>
              Delete All
            </DelAllListsButton>
          )
        }
      />
      <BoardContent
        lists={lists}
        addList={addList}
        boardId={board.id}
        readonly={readonly ?? false}
      />
    </Flex>
  );
};

const DelAllListsButton = ({
  action,
  children,
}: {
  action: VoidFunction;
  children: ReactNode;
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
