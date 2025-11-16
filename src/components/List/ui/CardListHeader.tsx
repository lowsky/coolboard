import { Editable, Flex, Heading, IconButton, Popover } from '@chakra-ui/react';
import { LuCheck, LuX } from 'react-icons/lu';
import { FiEdit as EditIcon, FiMenu as HamburgerIcon } from 'react-icons/fi';
import { type ReactNode } from 'react';

import { useRenameListMutation } from 'generated/graphql';

interface CardListHeaderProps {
  name: string;
  listId: string;
  children?: ReactNode;
  readonly?: boolean;
}

export function CardListHeader({
  name,
  listId,
  children,
  readonly = false,
}: CardListHeaderProps) {
  const [renameList, mutationResult] = useRenameListMutation();
  const { loading } = mutationResult;

  return (
    <Flex
      data-cy="card-list-header"
      flexDir="row"
      alignItems="center"
      px={0}
      py="0.4em">
      <Heading my={0} flexGrow={1}>
        <Editable.Root
          disabled={readonly || loading}
          onValueCommit={async (details) => {
            if (details.value) {
              await renameList({
                variables: { listId, newName: details.value },
              });
            }
          }}
          defaultValue={name}
          fontSize="2xl">
          <Flex
            flexDirection="row"
            justifyContent="flex-start"
            flexGrow={1}
            width="100%"
            alignItems="center">
            <Editable.Preview />
            <Editable.Input />
            {!readonly && (
              <>
                <Editable.EditTrigger title="edit the list title" asChild>
                  <IconButton variant="outline" size="xs">
                    <EditIcon />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </>
            )}
          </Flex>
        </Editable.Root>
      </Heading>
      {!readonly && <ListHeaderMenu>{children}</ListHeaderMenu>}
    </Flex>
  );
}

function ListHeaderMenu({ children }: { children: ReactNode }) {
  return (
    <Popover.Root lazyMount>
      <Popover.Trigger title="More actions on this list" asChild>
        <IconButton data-cy="card-list-header-menu" size="sm" variant="outline">
          <HamburgerIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content boxShadow="4xl" w="min-content">
          <Popover.Body>{children}</Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
