import React from 'react';
import {
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

export const BoardTitle = ({ boardName, headerActions }) => (
  <Flex justifyContent="space-between">
    <Heading as="h1">Board: {boardName}</Heading>
    {headerActions && (
      <Menu>
        <MenuButton
          as={IconButton}
          data-cy="board-header-menu"
          aria-label="board options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList
          rootProps={{
            bg: 'transparent',
          }}
          margin="0rem"
          minW="unset"
          minH="unset"
          padding={0}>
          {headerActions}
        </MenuList>
      </Menu>
    )}
  </Flex>
);
