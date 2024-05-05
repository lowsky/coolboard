import { Alert, AlertDescription, AlertTitle } from '@chakra-ui/react';
import React from 'react';

export const ShowDiffWarning = ({ newValue, currentValue }) => {
  if (newValue === currentValue) {
    return null;
  }

  return (
    <Alert status="warning" size="mini">
      <AlertTitle>New:</AlertTitle>
      <AlertDescription>{newValue}</AlertDescription>
    </Alert>
  );
};
