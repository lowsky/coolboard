import React from 'react';
import { Flex } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

import type { Card as CardType, List as ListType } from 'generated/graphql';

import Card from 'components/Card/Card';

import { CardListHeader } from './CardListHeader';
import { CardListButton } from './CardListButton';
import { CardListAddCardFooter } from './CardListAddCardFooter';

import styles from './CardList.module.css';

export interface CardListWithoutDndProps {
  id: string;
  name: string;
  list: UIListData;
  addCard: (id: string, name: string) => Promise<any>;
  deleteList: () => Promise<any>;
  readonly?: boolean;
}

export type ListTypeWithCards = ListTypeWithoutCards & {
  cards: UICardsData[];
};
export type UIListData = ListTypeWithCards | null | undefined;

export type UICardsData = Omit<CardType, 'createdBy' | 'updatedBy'>;

export type ListTypeWithoutCards = Omit<
  ListType,
  'createdAt' | 'createdBy' | 'updatedAt' | 'cards'
>;

export interface DndProps {
  isOver: boolean;
}

export const CardListWithDnd = (props: CardListWithoutDndProps & DndProps) => {
  const {
    name,
    id,
    list,
    addCard,
    deleteList,
    isOver,
    readonly = false,
  } = props;

  // use name injected as default if not yet available
  const cards = list?.cards ?? ([] as UICardsData[]);

  return (
    <div
      data-cy="card-list"
      className={styles.list}
      style={{
        backgroundColor: isOver ? 'yellow' : 'lightgrey',
      }}>
      <CardListHeader name={name} listId={id} readonly={readonly}>
        <CardListButton
          leftIcon={<FaTrash color="red" />}
          onButtonClick={() => deleteList()}>
          delete list
        </CardListButton>
      </CardListHeader>

      <div className={styles.inner}>
        <Flex flexDirection="column" gap="0.1em">
          <Flex flexDirection="column" gap="0.1em">
            {cards.map((card) => (
              <Card
                key={card.id}
                {...card}
                cardListId={id}
                readonly={readonly}
              />
            ))}
          </Flex>

          <CardListAddCardFooter
            readonly={readonly}
            id={id}
            addCard={addCard}
          />
        </Flex>
      </div>
    </div>
  );
};
