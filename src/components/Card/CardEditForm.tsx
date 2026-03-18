import { Field, Input, Textarea } from '@chakra-ui/react';

import type { Card } from 'generated/graphql';
import { ShowDiffWarning } from './ui/ShowDiffWarning';

interface CardEditFormProps {
  name: string;
  serverData: Card;
  conflict: boolean;
  description: string | null | undefined;
  loading: boolean;
  handleChange: (data: Record<string, string>) => void;
  saveAndHide: () => void;
}

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
      <Field.Root invalid={conflict}>
        <Field.ErrorText>
          Warning! Card was concurrently modified on server.
        </Field.ErrorText>
      </Field.Root>
      <Field.Root disabled={loading} invalid={conflict}>
        <Field.Label htmlFor="title">Task Name</Field.Label>
        <Input
          placeholder="Enter title"
          value={name}
          id="title"
          autoFocus
          onChange={(ev) => handleChange({ name: ev.target.value })}
          required
        />
        <Field.ErrorText>
          <ShowDiffWarning newValue={serverData.name} currentValue={name} />
        </Field.ErrorText>
      </Field.Root>
      <Field.Root disabled={loading} invalid={conflict}>
        <Field.Label htmlFor="description">Task Description</Field.Label>
        <Textarea
          placeholder="Add some more details about this task ..."
          value={description ?? ''}
          id="description"
          onChange={(ev) => handleChange({ description: ev.target.value })}
        />
        <Field.ErrorText>
          <ShowDiffWarning
            newValue={serverData.description}
            currentValue={description}
          />
        </Field.ErrorText>
      </Field.Root>
    </form>
  );
}
