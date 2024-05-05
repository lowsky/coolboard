import React, { ReactNode } from 'react';
import { useConfirmAction } from 'common/useConfirmAction';
import { Button, Icon } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

export const DelAllListsButton = ({
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
