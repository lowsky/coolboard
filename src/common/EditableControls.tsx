import { Button, Flex, Editable } from '@chakra-ui/react';
import React from 'react';

export function EditableControls() {
  return (
    <Flex gap="6">
      <Editable.SubmitTrigger asChild>
        <Button
          background="green"
          color="white"
          _hover={{ background: 'darkgreen' }}>
          Create
        </Button>
      </Editable.SubmitTrigger>
      <Editable.CancelTrigger asChild>
        <Button variant="outline">Cancel</Button>
      </Editable.CancelTrigger>
    </Flex>
  );
}
