import React from 'react';
import { Container, Heading, List, ListItem, Spinner } from '@chakra-ui/react';

import { Segment } from 'common/Segment';
import { FullVerticalContainer } from 'common/FullVerticalContainer';
import { IdBasedTransaction, useAuthUser } from 'src/setupInstaWeb';
import {
  useBoardsQuery,
  useCreateBoard,
  useDeleteBoard,
} from 'components/persistence';

import { CreateBoardModal } from './ui/CreateBoardModal';
import { BoardListItem, BoardListItemProps } from './ui/BoardListItem';

interface Props {
  boards: Omit<BoardListItemProps, 'deleteBoard'>[];
  deleteBoard: IdBasedTransaction;
}

export const BoardList = ({ boards, deleteBoard }: Props) => {
  const user = useAuthUser();
  const createBoard = useCreateBoard();

  return (
    <List>
      {boards.map(({ id, ...info }) => (
        <BoardListItem key={id} id={id} {...info} deleteBoard={deleteBoard} />
      ))}
      {user?.id && (
        <ListItem padding="0.25rem 0.5rem" marginBottom="0.5px" display="flex">
          <CreateBoardModal createBoard={createBoard} />
        </ListItem>
      )}
      )
    </List>
  );
};

export const Boards = () => {
  const deleteBoard: IdBasedTransaction = useDeleteBoard();

  const { data, isLoading, error } = useBoardsQuery();

  if (error) {
    return (
      <FullVerticalContainer>
        <Segment textAlign="center">
          <Heading as="h1" my={2}>
            Your Boards
          </Heading>
          <p>List can not be loaded. Details:</p>
          <div>{error.message}</div>
        </Segment>
      </FullVerticalContainer>
    );
  }

  return isLoading ? (
    <BoardsSkeleton />
  ) : (
    <FullVerticalContainer>
      <Segment textAlign="center">
        <Heading as="h1" my={2}>
          Your Boards
        </Heading>
        <Container data-cy="boards-list" textAlign="left">
          <BoardList boards={data.boards} deleteBoard={deleteBoard} />{' '}
        </Container>
      </Segment>
    </FullVerticalContainer>
  );
};

export const BoardsSkeleton = () => {
  return (
    <FullVerticalContainer>
      <Segment textAlign="center">
        <Heading as="h1" my={2}>
          Your Boards
        </Heading>
        <Spinner />
      </Segment>
    </FullVerticalContainer>
  );
};
