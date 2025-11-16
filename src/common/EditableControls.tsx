import { Button, Editable } from '@chakra-ui/react';

export function EditableControls() {
  return (
    <Editable.Control>
      <Editable.SubmitTrigger asChild>
        <Button
          background="green"
          color="white"
          _hover={{ background: 'darkgreen' }}>
          Create
        </Button>
      </Editable.SubmitTrigger>
      <Editable.CancelTrigger asChild>
        <Button id="cancel" variant="outline">
          Cancel
        </Button>
      </Editable.CancelTrigger>
    </Editable.Control>
  );
}
