import React from 'react';
import TimeAgo from 'react-timeago';
import { FaSave, FaTimes } from 'react-icons/fa';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Box,
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
  Textarea,
} from '@chakra-ui/react';

import { Card, User } from '../../generated/graphql';
import { ShowDiffWarning } from './ShowDiffWarning';
import { Segment } from '../../common/Segment';

export function CardEditModal({
  isOpen,
  onClose,
  saveAndHide,
  conflict,
  loading,
  name,
  handleChange,
  props,
  description,
  createdAt,
  updatedAt,
  updatedBy,
  error,
}: {
  isOpen: boolean;
  onClose: () => void;
  saveAndHide: () => void;
  conflict: boolean;
  loading: boolean;
  handleChange: (data: { [key: string]: string }) => void;
  props: Card;
  name: string;
  description: string | null | undefined;
  createdAt: number;
  updatedAt: number;
  updatedBy: User;
  error: string | undefined;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} id="cardEditModal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Card</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              saveAndHide();
            }}>
            <FormControl isInvalid={conflict}>
              <FormErrorMessage>
                <Alert status="warning">
                  <AlertTitle>
                    Warning! Card was concurrently modified on server.
                  </AlertTitle>
                </Alert>
              </FormErrorMessage>
            </FormControl>
            <FormControl isReadOnly={loading} isInvalid={conflict}>
              <FormLabel htmlFor="title">Task Name</FormLabel>
              <Input
                placeholder="Enter title"
                value={name}
                id="title"
                autoFocus
                onChange={(ev) => handleChange({ name: ev.target.value })}
                required
              />
              <FormErrorMessage>
                <ShowDiffWarning newValue={props.name} currentValue={name} />
              </FormErrorMessage>
            </FormControl>
            <FormControl isReadOnly={loading} isInvalid={conflict}>
              <FormLabel htmlFor="description">Task Description</FormLabel>
              <Textarea
                placeholder="Add some more details about this task ..."
                value={description ?? ''}
                id="description"
                onChange={(ev) =>
                  handleChange({ description: ev.target.value })
                }
              />
              <FormErrorMessage>
                <ShowDiffWarning
                  newValue={props.description}
                  currentValue={description}
                />
              </FormErrorMessage>
            </FormControl>
          </form>
          <Segment>
            <Alert status="info">
              <AlertDescription>
                <Box>
                  <strong>created: </strong>
                  <TimeAgo date={createdAt} />
                </Box>
                <Box>
                  <strong>updated: </strong>
                  <TimeAgo date={updatedAt} />
                  {updatedBy && (
                    <>
                      <strong> by: </strong>
                      {updatedBy.avatarUrl && (
                        <Avatar src={updatedBy.avatarUrl!} />
                      )}
                      <span>
                        {updatedBy.name
                          ? updatedBy.name
                          : updatedBy.email
                          ? updatedBy.email
                          : '?'}
                      </span>
                    </>
                  )}
                </Box>
              </AlertDescription>
            </Alert>
          </Segment>
          <FormControl isInvalid={Boolean(error)}>
            <FormErrorMessage>
              <Alert status="error">
                <AlertTitle>Saving Card failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            {conflict && (
              <Button
                isLoading={loading}
                disabled={loading}
                type="submit"
                color="green"
                onClick={() => saveAndHide()}
                leftIcon={<FaSave />}>
                Overwrite
              </Button>
            )}
            {!conflict && (
              <Button
                isLoading={loading ?? false}
                type="submit"
                color="green"
                onClick={() => saveAndHide()}
                leftIcon={<FaSave />}>
                Save
              </Button>
            )}
            <Button
              color="red"
              onClick={() => {
                onClose();
              }}
              leftIcon={<FaTimes />}>
              Close/cancel
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
