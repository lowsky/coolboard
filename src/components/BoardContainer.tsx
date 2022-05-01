import React from 'react';
import { Button, Container, Header, Icon, Popup } from 'semantic-ui-react';
import { FaPlus, FaTrash } from 'react-icons/fa';

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
    fluid
    style={{
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      marginTop: '1rem',
    }}>
    <Header textAlign="center" as="h1">
      Board: {boardName}
      {headerActions && (
        <Popup
          trigger={
            <Button
              data-cy="board-header-menu"
              style={{
                flexGrow: 0,
                verticalAlign: 'middle',
                marginLeft: '1rem',
              }}
              icon="ellipsis vertical"
              size="mini"
            />
          }
          on="click"
          content={headerActions}
          basic
        />
      )}
    </Header>
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
    }}>
    <Icon>
      <FaPlus />
    </Icon>
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
