import React from 'react';
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { MdDashboard } from 'react-icons/md';

type BoardTitleProps = {
  boardName: string;
  headerActions?: false | JSX.Element;
};

export const BoardTitle = ({ boardName, headerActions }: BoardTitleProps) => (
  <Flex justifyContent="space-between" alignItems="center" mx={4}>
    <Heading as="h1" mb={0}>
      <Icon as={MdDashboard} height={'0.75em'} />
      {boardName}
    </Heading>
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
