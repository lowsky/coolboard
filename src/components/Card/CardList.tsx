import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import {
  Button,
  ButtonGroup,
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
  Skeleton,
  useEditableControls,
} from '@chakra-ui/react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FaTrash } from 'react-icons/fa';

import Card, { dndItemType } from './Card';
import {
  useAddCardMutationMutation,
  useCardListQuery,
  useMoveCardMutation,
  useRenameListMutation,
} from 'generated/graphql';

import styles from '../CardList.module.css';

const CardListWithoutDnd = (props) => {
  const {
    isOver,
    id,
    addCardWithName = () => {},
    deleteListWithId = () => {},
    renameListMutation,
    loading,
    cardList,
  } = props;

  const initialNewCardName = 'New Card';
  const [newCardNameInputValue, setNewCardNameInputValue] =
    useState(initialNewCardName);
  const [isStoring, setIsStoring] = useState(false);
  const { list = {} } = cardList;

  // use name injected as default if not yet available
  let { name = props.name, cards = [] } = list;

  return (
    <div data-cy="card-list">
      <div
        className={styles.list}
        style={{
          backgroundColor: isOver ? 'yellow' : 'lightgrey',
        }}>
        <Skeleton minHeight="2rem" isLoaded={!loading}>
          <CardListHeader
            name={name}
            listId={id}
            renameListMutation={renameListMutation}>
            <CardListButton
              leftIcon={<FaTrash color="red" />}
              onButtonClick={() => deleteListWithId(id)}>
              delete list
            </CardListButton>
          </CardListHeader>
        </Skeleton>

        <div className={styles.inner}>
          <Flex flexDirection="column" gap="0.1em">
            <Flex flexDirection="column" gap="0.1em">
              {cards.map((c) => (
                <Card key={c.id} {...c} cardListId={id} />
              ))}
            </Flex>
            <Editable
              data-cy="edit-and-add-card"
              isDisabled={loading || isStoring}
              onChange={setNewCardNameInputValue}
              value={newCardNameInputValue}
              onSubmit={async (newName) => {
                try {
                  setIsStoring(true);
                  await addCardWithName({
                    variables: {
                      name: newName,
                    },
                  });
                  setNewCardNameInputValue(initialNewCardName);
                } finally {
                  setIsStoring(false);
                }
              }}>
              <Flex
                pt="4px"
                ml="0.5rem"
                my={0}
                flexDirection="row"
                justifyContent="flex-start"
                flexGrow={0}
                gap={1}
                style={{ color: loading ? 'grey' : undefined }}
                alignItems="center">
                <AddIcon height="0.75em" />
                <EditablePreview flexGrow={0} py={'8px'} />
                <Input as={EditableInput} placeholder="card name" />
              </Flex>
              <EditableControls />
            </Editable>
          </Flex>
        </div>
      </div>
    </div>
  );
};

function EditableControls() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();
  return isEditing ? (
    <ButtonGroup variant="outline" spacing="6">
      <Button
        background="green"
        color="white"
        _hover={{ background: 'darkgreen' }}
        {...getSubmitButtonProps()}>
        Create
      </Button>
      <Button {...getCancelButtonProps()}>Cancel</Button>
    </ButtonGroup>
  ) : null;
}

const drop = (props, cardItem) => {
  const cardId = cardItem.id;
  const cardListId = props.id;
  const oldCardListId = cardItem.cardListId;
  props.moveCardToList(cardId, oldCardListId, cardListId);
};

const CardListWithDnd = (props) => {
  const [dndProps, ref] = useDrop({
    accept: dndItemType,
    drop: (item) => drop(props, item),
    // @ts-ignore
    canDrop: (item) => props.id !== item.cardListId,
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <div ref={ref}>
      <CardListWithoutDnd {...props} {...dndProps} />
    </div>
  );
};

export const CardList = ({ id, name, deleteListWithId }) => {
  const { loading, error, data } = useCardListQuery({
    variables: { cardListId: id },
  });
  const renameListMutation = useRenameListMutation();

  const [moveCard] = useMoveCardMutation();

  const [addCardWithName] = useAddCardMutationMutation({
    variables: {
      cardListId: id,
      name: 'new card',
    },
  });

  if (error) {
    return <span>Load error!</span>;
  }

  const list = data?.list ?? []; // fix data is undefined when loading...

  const onMoveCardToList = (cardId, oldCardListId, newCardListId) => {
    moveCard({
      variables: {
        oldCardListId,
        cardListId: newCardListId,
        cardId,
      },
    });
  };

  return (
    <CardListWithDnd
      deleteListWithId={deleteListWithId}
      renameListMutation={renameListMutation}
      addCardWithName={addCardWithName}
      moveCardToList={onMoveCardToList}
      cardList={{ list }}
      name={name}
      loading={loading}
      id={id}
    />
  );
};

function CardListHeader({ name, listId, children, renameListMutation }) {
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
          isDisabled={loading}
          onSubmit={async (newName) =>
            await renameList({ variables: { listId, newName } })
          }
          defaultValue={name}
          fontSize="2xl">
          <Flex
            flexDirection="row"
            justifyContent="flex-start"
            flexGrow={0}
            alignItems="center">
            <EditablePreview flexGrow={0} />
          </Flex>
          <Input as={EditableInput} />
        </Editable>
      </Heading>
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
    </Flex>
  );
}

function CardListButton({ onButtonClick, leftIcon, children }) {
  return (
    <Button m={'0.1em'} onClick={() => onButtonClick()} leftIcon={leftIcon}>
      {children}
    </Button>
  );
}
