import { AlertDescription, AlertTitle } from '@chakra-ui/react';
import { Alert } from 'components/ui/alert';

export const ShowDiffWarning = ({ newValue, currentValue }) => {
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
