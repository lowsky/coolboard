import React from 'react';
import {
  Button,
  Container,
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
}: Props) => (
  <Container
    maxW="100%"
    style={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      marginTop: '1rem',
    }}>
    <Heading as="h1">
      Board: {boardName}
      {headerActions && (
        <Menu>
          <MenuButton
            as={IconButton}
            data-cy="board-header-menu"
            aria-label="board options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>{headerActions}</MenuList>
        </Menu>
      )}
    </Heading>
    <div
      data-cy="board-container-inner"
      style={{
        textAlign: 'left',
        backgroundColor: 'blue',
        padding: '1rem',
        display: 'flex',
        flex: 1,
        overflow: 'auto',
      }}>
      {children}
    </div>
  </Container>
);

export const AddListButton = ({
  onAddNewList,
}: {
  onAddNewList: () => void;
}) => (
  <Button
    onClick={onAddNewList}
    style={{
      flexShrink: 0,
      flexGrow: 0,
      alignSelf: 'flex-start',
    }}
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
      style={{
        flexShrink: 0,
        flexGrow: 0,
        alignSelf: 'flex-start',
      }}>
      {showWarning && <div>This will be permanent!</div>}
      <Icon color={showWarning ? undefined : 'red'}>
        <FaTrash />
      </Icon>
      {children}
    </Button>
  );
};
