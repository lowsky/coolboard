import { Button, ButtonGroup, useEditableControls } from '@chakra-ui/react';
import React from 'react';

export function EditableControls() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();
  return isEditing ? (
    <ButtonGroup variant="outline" spacing="6">
      <Button
        background="green"
        color="white"
        _hover={{ background: 'darkgreen' }}
        {...getSubmitButtonProps()}>
        Create
      </Button>
      <Button {...getCancelButtonProps()}>Cancel</Button>
    </ButtonGroup>
  ) : null;
}
