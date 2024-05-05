import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';

import { CardListHeader } from './CardListHeader';

import styles from './CardList.module.css';

export interface CardListSkeletonProps {
  id: string;
  name: string;
}

export const CardListSkeleton = (props: CardListSkeletonProps) => {
  const { id, name } = props;

  return (
    <div data-cy="card-list" className={styles.list}>
      <CardListHeader name={name} listId={id} readonly />

      <div className={styles.inner}>
        <Flex flexDirection="column" gap="0.1em">
          <Skeleton isLoaded={false} minHeight="2rem" height="2rem">
            <Flex flexDirection="column" gap="0.1em"></Flex>
          </Skeleton>
        </Flex>
      </div>
    </div>
  );
};
