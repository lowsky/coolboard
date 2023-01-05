import React from 'react';
import { useDrop } from 'react-dnd';
import {
  Button,
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
import { AddIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FaEdit, FaTrash } from 'react-icons/fa';

import Card, { dndItemType } from './Card';

import {
  useAddCardMutationMutation,
  useCardListQuery,
  useMoveCardMutation,
  useRenameListMutation,
} from '../generated/graphql';

import styles from './CardList.module.css';

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
        <CardListHeader
          name={name}
          listId={id}
          renameListMutation={renameListMutation}>
          <CardListButton
            leftIcon={<FaEdit color="green" />}
            onButtonClick={() => {}}>
            delete list
          </CardListButton>
          <CardListButton
            leftIcon={<FaTrash color="red" />}
            onButtonClick={() => deleteListWithId(id)}>
            delete list
          </CardListButton>
        </CardListHeader>

        <div className={styles.inner}>
          <Flex flexDirection="column" gap={'0.1em'}>
            <Skeleton isLoaded={!loading} minHeight={'2rem'}>
              <Flex flexDirection="column" gap={'0.1em'}>
                {cards.map((c) => (
                  <Card key={c.id} {...c} cardListId={id} />
                ))}
              </Flex>
            </Skeleton>
          </Flex>
        </div>

        <CardListButton
          onButtonClick={() => addCardWithName(id)}
          leftIcon={<AddIcon />}>
          Add a card
        </CardListButton>
      </div>
    </div>
  );
};

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
            <EditableControls />
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

function EditableControls() {
  const { isEditing, getEditButtonProps } = useEditableControls();
  return isEditing ? null : (
    <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
  );
}

function CardListButton({ onButtonClick, leftIcon, children }) {
  return (
    <Button m={'0.1em'} onClick={() => onButtonClick()} leftIcon={leftIcon}>
      {children}
    </Button>
  );
}
