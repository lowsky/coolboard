import { type SyntheticEvent, useState } from 'react';
import {
  Button,
  Input,
  Dialog,
  CloseButton,
  Portal,
  Fieldset,
  Field,
} from '@chakra-ui/react';
//laterimport { FiPlus as AddIcon } from 'react-icons/fi';
//import Form from 'next/form';

interface Props {
  createBoard: ({ name }: { name: string }) => Promise<any>;
  loading?: boolean;
  error?: Error;
}

export const CreateBoardModal = (props: Props) => {
  const [state, setState] = useState({ name: '' });
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const handleChange = (data: { [key: string]: string }) => {
    setState((previousState) => ({
      ...previousState,
      ...data,
    }));
  };

  const { name } = state;

  const {
    createBoard,
    loading = false,
    error = name.length === 0 ? 'Title may not be empty.' : undefined,
  } = props;

  const onSubmit = (ev?: SyntheticEvent) => {
    ev?.preventDefault();
    createBoard({ name }).then(() => onClose());
  };

  return (
    <>
      <Dialog.Root
        open={open}
        onOpenChange={(isOpen) => (isOpen ? onOpen() : onClose())}>
        <Dialog.Trigger asChild>
          <Button
            //variant="link"
            //onClick={onOpen}
            //leftIcon={<AddIcon height={'0.75em'} />}
            data-cy="create-board-dialog">
            New Board
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <form>
                <Dialog.CloseTrigger asChild>
                  <CloseButton
                    size="sm"
                    // onClose
                  />
                </Dialog.CloseTrigger>
                <Dialog.Header>
                  <Dialog.Title>Create Board</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Fieldset.Root
                    onSubmit={onSubmit}
                    disabled={loading}
                    invalid={Boolean(error)}>
                    <Fieldset.Content>
                      <Field.Root invalid={Boolean(error)}>
                        <Field.Label>Title</Field.Label>
                        <Input
                          placeholder="Enter a title"
                          value={name}
                          id="name"
                          autoFocus
                          onChange={(ev) =>
                            handleChange({ name: ev.target.value })
                          }
                          required
                        />
                        <Fieldset.HelperText>
                          The name or title can be changed later...
                        </Fieldset.HelperText>
                      </Field.Root>
                      <Fieldset.ErrorText>{`${error}`}</Fieldset.ErrorText>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      type="submit"
                      disabled={Boolean(error)}
                      background="green"
                      color="white"
                      _hover={{ background: 'darkgreen' }}
                      data-cy="create-board-submit"
                      onClick={onSubmit}
                      loadingText="Creating board..."
                      loading={loading}>
                      Create
                    </Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
              </form>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
