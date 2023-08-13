import React, { useState } from 'react';
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
import { FaSave, FaTimes } from 'react-icons/fa';

export const CreateBoardModal = (props) => {
  const [state, setState] = useState({ name: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (data) => {
    setState((previousState) => ({
      ...previousState,
      ...data,
    }));
  };

  const { name } = state;

  const { createBoard, loading, error } = props;

  return (
    <>
      <Button onClick={onOpen} data-cy="create-board-dialog">
        Create a new Board
      </Button>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
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
            <ButtonGroup>
              <Button
                color="green"
                data-cy="create-board-submit"
                onClick={() => {
                  createBoard({
                    name,
                  }).then(() => onClose());
                }}
                leftIcon={<FaSave />}
                loadingText="Creating board..."
                isLoading={loading}>
                Create
              </Button>
              <Button color="red" onClick={onClose} leftIcon={<FaTimes />}>
                cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
