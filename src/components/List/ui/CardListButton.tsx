import React from 'react';
import { Button } from '@chakra-ui/react';

export function CardListButton({ onButtonClick, leftIcon, children }) {
  return (
    <Button m="0.1em" onClick={onButtonClick} leftIcon={leftIcon}>
      {children}
    </Button>
  );
}
