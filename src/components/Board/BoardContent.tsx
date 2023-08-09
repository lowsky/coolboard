import { Flex } from '@chakra-ui/react';
import React from 'react';

export const BoardContent = ({ children }) => (
  <Flex
    data-cy="board-container-inner"
    textAlign="left"
    bg="blue"
    p="1rem"
    flex="1"
    overflow="auto">
    {children}
  </Flex>
);
