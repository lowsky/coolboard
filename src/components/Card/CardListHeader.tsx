import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useEditableControls,
} from '@chakra-ui/react';
import { EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import React from 'react';

export function CardListHeader({
  readonly,
  name,
  listId,
  children,
  renameListMutation,
}) {
  const [renameList, mutationResult] = renameListMutation;
  const { loading } = mutationResult;

  return (
    <Flex
      data-cy="card-list-header"
      flexDir="row"
      alignItems="center"
      px={0}
      py="0.4em">
      <Heading size="md" my={0} flexGrow={1}>
        <Editable
          isDisabled={readonly || loading}
          onSubmit={async (newName) =>
            await renameList({
              variables: {
                listId,
                newName,
              },
            })
          }
          defaultValue={name}
          fontSize="2xl">
          <Flex
            flexDirection="row"
            justifyContent="flex-start"
            flexGrow={0}
            alignItems="center">
            <EditablePreview flexGrow={0} />
            {!readonly && <EditableControls />}
          </Flex>
          <Input as={EditableInput} />
        </Editable>
      </Heading>
      {!readonly && (
        <Popover isLazy>
          <PopoverTrigger>
            <IconButton
              data-cy="card-list-header-menu"
              icon={<HamburgerIcon />}
              size="sm"
              aria-label="delete list"
            />
          </PopoverTrigger>
          <PopoverContent
            rootProps={{
              bg: 'transparent',
              boxShadow: 'xl',
            }}
            w={'min-content'}
            boxShadow={'xl'}>
            <PopoverBody>{children}</PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Flex>
  );

  function EditableControls() {
    const { isEditing, getEditButtonProps } = useEditableControls();
    return isEditing ? null : (
      <IconButton
        {...getEditButtonProps()}
        aria-label="edit the list title"
        size="sm"
        icon={<EditIcon />}
      />
    );
  }
}
