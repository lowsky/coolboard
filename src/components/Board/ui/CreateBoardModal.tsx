import React, { SyntheticEvent, useState } from 'react';
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface Props {
  createBoard: ({ name }: { name: string }) => Promise<any>;
  loading?: boolean;
  error?: Error;
}

export const CreateBoardModal = (props: Props) => {
  const [state, setState] = useState({ name: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (data) => {
    setState((previousState) => ({
      ...previousState,
      ...data,
    }));
  };

  const { name } = state;

  const { createBoard, loading = false, error } = props;

  const onSubmit = (ev?: SyntheticEvent) => {
    ev?.preventDefault();
    createBoard({ name }).then(() => onClose());
  };

  return (
    <>
      <Button
        variant="link"
        onClick={onOpen}
        leftIcon={<AddIcon height={'0.75em'} />}
        data-cy="create-board-dialog">
        New Board
      </Button>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={onSubmit}>
              <FormControl isInvalid={Boolean(error)} isReadOnly={loading}>
                <FormLabel htmlFor="name">Board Name</FormLabel>
                <Input
                  placeholder="Enter a title"
                  value={name}
                  id="name"
                  autoFocus
                  onChange={(ev) => handleChange({ name: ev.target.value })}
                  isRequired
                />
                <FormErrorMessage>{`${error}`}</FormErrorMessage>
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup variant="outline" spacing="6">
              <Button
                background="green"
                color="white"
                _hover={{ background: 'darkgreen' }}
                data-cy="create-board-submit"
                onClick={onSubmit}
                loadingText="Creating board..."
                isLoading={loading}>
                Create
              </Button>
              <Button onClick={onClose}>cancel</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
