import React, { type ReactNode } from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

import { useConfirmAction } from 'common/useConfirmAction';

type Props = {
  action: VoidFunction;
  children: ReactNode;
};

export const DelAllListsButton = ({ action, children }: Props) => {
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
