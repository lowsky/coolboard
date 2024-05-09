import React, { useState } from 'react';
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Input,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { EditableControls } from 'common/EditableControls';

interface Props {
  readonly: boolean;
  addCard: (id: string, name: string) => Promise<void>;
  id: string;
}

export function CardListAddCardFooter({ readonly, addCard, id }: Props) {
  const initialNewCardName = 'New Card';
  const [newCardNameInputValue, setNewCardNameInputValue] =
    useState(initialNewCardName);
  const [isStoring, setIsStoring] = useState(false);

  if (readonly) {
    return null;
  }

  return (
    <>
      <Editable
        data-cy="edit-and-add-card"
        isDisabled={isStoring}
        onChange={setNewCardNameInputValue}
        value={newCardNameInputValue}
        onSubmit={async (name) => {
          try {
            setIsStoring(true);
            await addCard(id, name);
            setNewCardNameInputValue(initialNewCardName);
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
          <EditablePreview flexGrow={0} py={'8px'} />
          <Input as={EditableInput} placeholder="card name" />
        </Flex>
        <EditableControls />
      </Editable>
    </>
  );
}
