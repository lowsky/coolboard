import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { Card, User } from '../../generated/graphql';
import { AuthorTimeInfo } from './AuthorTimeInfo';
import { CardEditForm } from './CardEditForm';

type CardEditModalProps = {
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
};

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
}: CardEditModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} id="cardEditModal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Card</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {CardEditForm({
            saveAndHide,
            conflict,
            loading,
            name,
            handleChange,
            serverData: props,
            description,
          })}
          <AuthorTimeInfo
            createdAt={createdAt}
            updatedAt={updatedAt}
            updatedBy={updatedBy}
          />
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
