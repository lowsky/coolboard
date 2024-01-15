import React, { useState } from 'react';
import Link from 'next/link';
import {
  Container,
  Heading,
  IconButton,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { ApolloCache } from '@apollo/client';

import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  UserBoardsDocument,
  UserBoardsQuery,
  useUserBoardsQuery,
} from 'generated/graphql';
import { Segment } from 'common/Segment';
import { FullVerticalContainer } from 'common/FullVerticalContainer';
import { CreateBoardModal } from './CreateBoardModal';

import styles from './Boards.module.css';

const BoardListItem = ({ name, id, deleteBoard }) => {
  const [deleting, setDeleting] = useState(false);
  return (
    <ListItem
      padding="0.25rem 0.5rem"
      marginBottom="0.5px"
      display="flex"
      data-cy={`board-list-item_${name}`}>
      <Link href={`/board/${id}`} passHref className={styles.wideColumn}>
        {name}
      </Link>

      <IconButton
        backgroundColor="transparent"
        onClick={() => {
          setDeleting(true);
          deleteBoard(id).finally(() => setDeleting(false));
        }}
        isLoading={deleting}
        aria-label="delete board"
        data-cy="delete-board"
        icon={<FaTrash />}
        size="mini"
      />
    </ListItem>
  );
};

const BoardList = ({ boards, deleteBoard }) => {
  const [createBoard, boardCreationState] = useCreateBoardMutation();

  return (
    <List
    // celled
    // divided
    >
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
          error={boardCreationState.error?.message}
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
  const { loading, error, data } = useUserBoardsQuery();
  const [deleteBoard] = useDeleteBoardMutation();

  if (loading || !data?.me) {
    return <BoardsSkeleton />;
  }

  if (error) {
    return (
      <FullVerticalContainer>
        <Segment textAlign="center">
          <Heading as="h1" my={2}>
            Your Boards
          </Heading>
          <p>list can not be loaded, please retry.</p>
        </Segment>
      </FullVerticalContainer>
    );
  }

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
            deleteBoard={(id) =>
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
