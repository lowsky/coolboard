import React from 'react';
import { Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

export const AddListButton = ({
  onAddNewList,
}: {
  onAddNewList: () => void;
}) => (
  <Button
    onClick={onAddNewList}
    flexShrink={0}
    flexGrow={0}
    leftIcon={<FaPlus />}>
    Add a list
  </Button>
);
