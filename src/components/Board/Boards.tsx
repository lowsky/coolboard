import React from 'react';
import { Container, Heading, List, ListItem, Spinner } from '@chakra-ui/react';
import { ApolloCache } from '@apollo/client';

import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  UserBoardsDocument,
  UserBoardsQuery,
  useUserBoardsSuspenseQuery,
} from 'generated/graphql';
import { Segment } from 'common/Segment';
import { FullVerticalContainer } from 'common/FullVerticalContainer';
import { CreateBoardModal } from './CreateBoardModal';
import { BoardListItem } from './BoardListItem';

export const BoardList = ({ boards, deleteBoard }) => {
  const [createBoard, boardCreationState] = useCreateBoardMutation();

  return (
    <List>
      {boards.map(({ id, name, ...info }) => (
        <BoardListItem
          key={id}
          id={id}
          name={name}
          deleteBoard={deleteBoard}
          {...info}
        />
      ))}
      <ListItem padding="0.25rem 0.5rem" marginBottom="0.5px" display="flex">
        <CreateBoardModal
          loading={boardCreationState.loading}
          error={boardCreationState.error as Error}
          createBoard={({ name }) => createBoard({ variables: { name } })}
        />
      </ListItem>
      )
    </List>
  );
};

function overrideCachedUserBoardsRemovingBoard(
  userWithBoards: UserBoardsQuery | null,
  removedBoardId: string,
  store: ApolloCache<any>
) {
  if (!userWithBoards?.me?.boards) return;

  const {
    me: { boards },
  } = userWithBoards;

  if (boards) {
    const boards = userWithBoards.me.boards.filter(
      (board) => board.id !== removedBoardId
    );
    store.writeQuery({
      query: UserBoardsDocument,
      data: {
        ...userWithBoards,
        me: {
          ...userWithBoards.me,
          boards,
        },
      },
    });
  }
}
const updateCachedUserBoardsAfterRemovingBoard = (boardId: string) => {
  return (store: ApolloCache<any>) => {
    const readData = store.readQuery<UserBoardsQuery>({
      query: UserBoardsDocument,
    });
    overrideCachedUserBoardsRemovingBoard(readData, boardId, store);
  };
};

export const Boards = () => {
  const { error, data } = useUserBoardsSuspenseQuery();
  const [deleteBoard] = useDeleteBoardMutation();

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

  if (!data.me) return null;

  const {
    me: { boards },
  } = data;

  return (
    <FullVerticalContainer>
      <Segment textAlign="center">
        <Heading as="h1" my={2}>
          Your Boards
        </Heading>
        <Container data-cy="boards-list" textAlign="left">
          <BoardList
            boards={boards}
            deleteBoard={(id: string) =>
              deleteBoard({
                variables: { id },
                update: updateCachedUserBoardsAfterRemovingBoard(id),
              })
            }
          />
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
