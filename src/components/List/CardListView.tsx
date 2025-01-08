import React from 'react';
import { Flex } from '@chakra-ui/react';

import { Card as CardType } from 'src/setupInstaWeb';

import { useCardListQuery } from 'components/persistence';

import { CardListHeader } from './ui/CardListHeader';

import { Card as CardComponent } from 'components/Card/Card';
import { CardListSkeleton } from 'components/List/ui/CardListSkeleton';

import styles from './ui/CardList.module.css';

type UICardsData = Omit<CardType, 'createdBy' | 'updatedBy'>;

interface CardListViewProps {
  id: string;
  name: string;
}

export const CardListView = (props: CardListViewProps) => {
  const { name, id } = props;
  const { error, data, isLoading } = useCardListQuery({
    variables: { cardListId: id },
  });

  if (error) {
    return <span>Load error!</span>;
  }

  if (isLoading) {
    return <CardListSkeleton name={name} id={id} />;
  }

  const cards = data.cardList?.[0].cards as UICardsData[];

  return (
    <div data-cy="card-list" className={styles.list}>
      <CardListHeader name={name} listId={id} readonly />

      <div className={styles.inner}>
        <Flex flexDirection="column" gap="0.1em">
          <Flex flexDirection="column" gap="0.1em">
            {cards.map((card) => (
              <CardComponent key={card.id} {...card} cardListId={id} readonly />
            ))}
          </Flex>
        </Flex>
      </div>
    </div>
  );
};
