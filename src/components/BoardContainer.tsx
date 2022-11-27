import React from 'react';
import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';

import { FaPlus, FaTrash } from 'react-icons/fa';
import { HamburgerIcon } from '@chakra-ui/icons';

import { useConfirmAction } from './UseConfirmAction';

type Props = {
  boardName: string;
  children: React.ReactNode;
  headerActions: React.ReactNode;
};

export const BoardContainer = ({
  boardName,
  children,
  headerActions,
}: Props) => {
  return (
    <Flex flexDir="column" maxW="100%" flexGrow={1} mt="1rem">
      <BoardTitle boardName={boardName} headerActions={headerActions} />
      <BoardContent>{children}</BoardContent>
    </Flex>
  );
};

const BoardTitle = ({ boardName, headerActions }) => (
  <Flex justifyContent="space-between">
    <Heading as="h1">Board: {boardName}</Heading>
    {headerActions && (
      <Menu>
        <MenuButton
          as={IconButton}
          data-cy="board-header-menu"
          aria-label="board options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList
          rootProps={{
            bg: 'transparent',
          }}
          margin={'0rem'}
          minW={'unset'}
          minH={'unset'}
          padding={0}>
          {headerActions}
        </MenuList>
      </Menu>
    )}
  </Flex>
);

const BoardContent = ({ children }) => (
  <Flex
    data-cy="board-container-inner"
    textAlign="left"
    bg="blue"
    p="1rem"
    flex="1"
    overflow="auto">
    {children}
  </Flex>
);

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
  action: () => void;
  children: React.ReactNode;
}) => {
  const [showWarning, showWarningThenCallAction] = useConfirmAction(action);

  return (
    <Button
      onClick={showWarningThenCallAction}
      color={showWarning ? 'red' : undefined}
      flexShrink={0}
      flexGrow={0}
      alignSelf={'flex-start'}>
      {showWarning && <span>This will be permanent!</span>}
      <Icon
        color={showWarning ? undefined : 'red'}
        ml={showWarning ? '1em' : undefined}>
        <FaTrash />
      </Icon>
      {children}
    </Button>
  );
};
