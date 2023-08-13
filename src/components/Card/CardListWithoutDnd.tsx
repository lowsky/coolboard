import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button, Flex, Skeleton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { Card as CardType } from 'generated/graphql';
import { CardListHeader } from './CardListHeader';
import Card from './Card';

import styles from '../CardList.module.css';

export interface CardListWithoutDndProps {
  isOver?: string;
  id?: string;
  name?: string;
  addCardWithName?: Function;
  deleteListWithId?: Function;
  renameListMutation?: any;
  readonly?: boolean;
  loading?: boolean;
  cardList: {
    list: { cards?: CardType[]; name?: string };
  };
}

export const CardListWithoutDnd = (props: CardListWithoutDndProps) => {
  const {
    isOver,
    name,
    id,
    addCardWithName = () => {},
    deleteListWithId = () => {},
    renameListMutation,
    loading,
    cardList,
    readonly,
  } = props;

  const { list = {} } = cardList;

  // use name injected as default if not yet available
  let { cards = [] } = list;

  return (
    <div data-cy="card-list">
      <div
        className={styles.list}
        style={{
          backgroundColor: isOver ? 'yellow' : 'lightgrey',
        }}>
        <CardListHeader
          name={list.name ?? name}
          listId={id}
          readonly={readonly}
          renameListMutation={renameListMutation}>
          {!readonly && (
            <CardListButton
              leftIcon={<FaTrash color="red" />}
              onButtonClick={() => deleteListWithId(id)}>
              delete list
            </CardListButton>
          )}
        </CardListHeader>

        <div className={styles.inner}>
          <Flex flexDirection="column" gap={'0.1em'}>
            <Skeleton isLoaded={!loading} minHeight={'2rem'}>
              <Flex flexDirection="column" gap={'0.1em'}>
                {cards.map((c) => (
                  <Card key={c.id} {...c} cardListId={id} readonly={readonly} />
                ))}
              </Flex>
            </Skeleton>
          </Flex>
        </div>

        {!readonly && (
          <CardListButton
            onButtonClick={() => addCardWithName(id)}
            leftIcon={<AddIcon />}>
            Add a card
          </CardListButton>
        )}
      </div>
    </div>
  );

  function CardListButton({ onButtonClick, leftIcon, children }) {
    return (
      <Button m={'0.1em'} onClick={() => onButtonClick()} leftIcon={leftIcon}>
        {children}
      </Button>
    );
  }
};
