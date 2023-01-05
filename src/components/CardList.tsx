import React from 'react';
import { useDrop } from 'react-dnd';
import {
  Button,
  Heading,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from '@chakra-ui/react';
import { HamburgerIcon, AddIcon } from '@chakra-ui/icons';
import { FaTrash } from 'react-icons/fa';

import Card, { dndItemType } from './Card';

import {
  useAddCardMutationMutation,
  useCardListQuery,
  useMoveCardMutation,
} from '../generated/graphql';

import styles from './CardList.module.css';

const CardListWithoutDnd = (props) => {
  const {
    isOver,
    id,
    addCardWithName = () => {},
    deleteListWithId = () => {},
    loading,
  } = props;

  const { cardList } = props;
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
        <CardListHeader name={name}>
          <CardListButton
            leftIcon={<FaTrash color="red" />}
            onButtonClick={() => deleteListWithId(id)}>
            delete list
          </CardListButton>
        </CardListHeader>

        {loading ? (
          <Spinner />
        ) : (
          <div className={styles.inner}>
            <div className={styles.container}>
              {cards.map((c) => (
                <Card key={c.id} {...c} cardListId={id} />
              ))}
            </div>
          </div>
        )}

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
      addCardWithName={addCardWithName}
      moveCardToList={onMoveCardToList}
      cardList={{ list }}
      name={name}
      loading={loading}
      id={id}
    />
  );
};

const CardListHeader = ({ name, children }) => (
  <div className={styles.header} data-cy="card-list-header">
    <Heading size="md" mb={0} mt={0} className={styles.title}>
      {name}
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
  </div>
);

const CardListButton = ({ onButtonClick, leftIcon, children }) => (
  <Button m={'0.1em'} onClick={() => onButtonClick()} leftIcon={leftIcon}>
    {children}
  </Button>
);
