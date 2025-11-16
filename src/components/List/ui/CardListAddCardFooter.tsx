import { useState } from 'react';
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
  const [value, setValue] = useState(initialNewCardName);
  const [isEdit, setIsEdit] = useState(false);
  if (readonly) {
    return null;
  }

  return (
    <Editable.Root
      data-cy="edit-and-add-card"
      disabled={isStoring}
      submitMode="enter"
      defaultValue={initialNewCardName}
      onEditChange={(details) => setIsEdit(details.edit)}
      onValueChange={(details) => setValue(details.value)}
      value={value}
      onValueCommit={async (details) => {
        setIsStoring(true);
        await addCard(id, details.value);
        setIsStoring(false);
        setValue(initialNewCardName);
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
        {!isEdit && <AddIcon height="0.75em" />}
        <Editable.Preview flexGrow={0} py={'8px'} />
        <Editable.Input placeholder="card name" />
      </Flex>
      <EditableControls />
    </Editable.Root>
  );
}
