import { ReactNode } from 'react';
import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { FiMenu as HamburgerIcon } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { MenuRoot, MenuTrigger, MenuContent } from '../../ui/menu';

interface BoardTitleProps {
  boardName: string;
  headerActions?: false | ReactNode;
}

export const BoardTitle = ({ boardName, headerActions }: BoardTitleProps) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Heading
      as="h1"
      mb={0}
      size="4xl"
      display="flex"
      alignItems="center"
      gap={1}>
      <MdDashboard />
      {boardName}
    </Heading>
    {headerActions && (
      <MenuRoot>
        <MenuTrigger asChild>
          <IconButton
            data-cy="board-header-menu"
            aria-label="board options"
            variant="outline">
            <HamburgerIcon />
          </IconButton>
        </MenuTrigger>
        <MenuContent
          bg="transparent"
          margin="0rem"
          minW="unset"
          minH="unset"
          padding={0}>
          {headerActions}
        </MenuContent>
      </MenuRoot>
    )}
  </Flex>
);
