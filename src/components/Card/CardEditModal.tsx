import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import { Alert, Button, ButtonGroup, Dialog, Portal } from '@chakra-ui/react';

import type { Card, User } from 'generated/graphql';
import { AuthorTimeInfo } from './AuthorTimeInfo';
import { CardEditForm } from './CardEditForm';

type CardEditModalProps = {
  open: boolean;
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
  updatedBy?: User;
  error: string | undefined;
};

export function CardEditModal({
  open,
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
    <Dialog.Root
      closeOnEscape={true}
      open={open}
      onOpenChange={({ open }) => !open && onClose()}
      id="cardEditModal">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Edit Card</Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body pb={6}>
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
              {error && (
                <Alert.Root status="error">
                  <Alert.Indicator />
                  <Alert.Content>
                    <Alert.Title>Saving Card failed</Alert.Title>
                    <Alert.Description>{error}</Alert.Description>
                  </Alert.Content>
                </Alert.Root>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <ButtonGroup>
                {conflict && (
                  <Button
                    loading={loading}
                    disabled={loading}
                    type="submit"
                    colorPalette="green"
                    onClick={() => saveAndHide()}>
                    <FaSave />
                    Overwrite
                  </Button>
                )}
                {!conflict && (
                  <Button
                    loading={loading ?? false}
                    type="submit"
                    colorPalette="green"
                    onClick={() => saveAndHide()}>
                    <FaSave />
                    Save
                  </Button>
                )}
                <Button colorPalette="red" onClick={() => onClose()}>
                  <FaTimes />
                  Close/cancel
                </Button>
              </ButtonGroup>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
