import { AlertDescription, AlertTitle } from '@chakra-ui/react';

import { Alert } from 'components/ui/alert';

export const ShowDiffWarning = ({
  newValue,
  currentValue,
}: {
  newValue: string | undefined | null;
  currentValue: string | undefined | null;
}) => {
  if (newValue === currentValue) {
    return null;
  }

  return (
    <Alert status="warning">
      <AlertTitle>New:</AlertTitle>
      <AlertDescription>{newValue}</AlertDescription>
    </Alert>
  );
};
