import React from 'react';
import { Container, Heading, List, ListItem, Spinner } from '@chakra-ui/react';
import type { ApolloCache } from '@apollo/client';

import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  UserBoardsDocument,
  type UserBoardsQuery,
  useUserBoardsSuspenseQuery,
} from 'generated/graphql';
import { Segment } from 'common/Segment';
import { FullVerticalContainer } from 'common/FullVerticalContainer';
import { CreateBoardModal } from './ui/CreateBoardModal';
import { BoardListItem, type BoardListItemProps } from './ui/BoardListItem';

interface Props {
  boards: Omit<BoardListItemProps, 'deleteBoard'>[];
  deleteBoard: (id: string) => Promise<any>;
}

export const BoardList = ({ boards, deleteBoard }: Props) => {
  const [createBoard, boardCreationState] = useCreateBoardMutation();

  return (
    <List.Root>
      {boards.map(({ id, ...info }) => (
        <List.Item key={id}>
          <BoardListItem id={id} {...info} deleteBoard={deleteBoard} />
        </List.Item>
      ))}
      <ListItem padding="0.25rem 0.5rem" marginBottom="0.5px" display="flex">
        <CreateBoardModal
          loading={boardCreationState.loading}
          error={boardCreationState.error as Error}
          createBoard={({ name }) => createBoard({ variables: { name } })}
        />
      </ListItem>
    </List.Root>
  );
};

function overrideCachedUserBoardsRemovingBoard(
  userWithBoards: UserBoardsQuery | null,
  removedBoardId: string,
  store: ApolloCache
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
  return (store: ApolloCache) => {
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

  if (!data?.me) return null;

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
            boards={
              (boards || []).filter((board) => board.name && board.id) as Omit<
                BoardListItemProps,
                'deleteBoard'
              >[]
            }
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
