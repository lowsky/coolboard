import React from 'react';
import {
  Alert,
  AlertTitle,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

import { ShowDiffWarning } from './ui/ShowDiffWarning';
import { Card } from 'src/setupInstaWeb';

type CardEditFormProps = {
  name: string;
  serverData: Card;
  conflict: boolean;
  description: string | null | undefined;
  loading: boolean;
  handleChange: (data: { [p: string]: string }) => void;
  saveAndHide: () => void;
};

export function CardEditForm({
  name,
  serverData,
  conflict,
  description,
  loading,
  saveAndHide,
  handleChange,
}: CardEditFormProps) {
  return (
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
          <ShowDiffWarning newValue={serverData.name} currentValue={name} />
        </FormErrorMessage>
      </FormControl>
      <FormControl isReadOnly={loading} isInvalid={conflict}>
        <FormLabel htmlFor="description">Task Description</FormLabel>
        <Textarea
          placeholder="Add some more details about this task ..."
          value={description ?? ''}
          id="description"
          onChange={(ev) => handleChange({ description: ev.target.value })}
        />
        <FormErrorMessage>
          <ShowDiffWarning
            newValue={serverData.description}
            currentValue={description}
          />
        </FormErrorMessage>
      </FormControl>
    </form>
  );
}
