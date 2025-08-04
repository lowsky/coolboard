import React, { useState } from 'react';
import { Editable, Flex } from '@chakra-ui/react';
import { FiPlus as AddIcon } from 'react-icons/fi';

import { EditableControls } from 'common/EditableControls';

interface CardListAddCardFooterProps {
  readonly?: boolean;
  addCard: (id: string, name: string) => Promise<void>;
  id: string;
}

export function CardListAddCardFooter({
  readonly,
  addCard,
  id,
}: CardListAddCardFooterProps) {
  const initialNewCardName = 'New Card';
  const [isStoring, setIsStoring] = useState(false);

  if (readonly) {
    return null;
  }

  return (
    <Editable.Root
      data-cy="edit-and-add-card"
      disabled={isStoring}
      submitMode="enter"
      defaultValue={initialNewCardName}
      onValueCommit={async (details) => {
        try {
          setIsStoring(true);
          await addCard(id, details.value);
          // later add error handling?
        } finally {
          setIsStoring(false);
        }
      }}>
      <Flex
        pt="4px"
        ml="0.5rem"
        my={0}
        flexDirection="row"
        justifyContent="flex-start"
        flexGrow={0}
        gap={1}
        alignItems="center">
        <AddIcon height="0.75em" />
        <Editable.Preview flexGrow={0} py={'8px'} />
        <Editable.Input placeholder="card name" />
      </Flex>
      <EditableControls />
    </Editable.Root>
  );
}
