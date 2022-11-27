import React, { useState } from 'react';
import Link from 'next/link';
import {
  Container,
  IconButton,
  List,
  ListItem,
  Spinner,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  UserBoardsDocument,
  UserBoardsQuery,
  useUserBoardsQuery,
} from '../generated/graphql';
import { Segment } from '../common/Segment';
import { FullVerticalContainer } from '../common/FullVerticalContainer';
import { CreateBoardModal } from './CreateBoardModal';

import styles from './Boards.module.css';

const BoardListItem = ({ name, id, deleteBoard }) => {
  const [deleting, setDeleting] = useState(false);
  return (
    <ListItem
      py="0.25rem"
      px="0.5rem"
      marginBottom="0.5px"
      display="flex"
      data-cy={'board-list-item_' + name}>
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

const BoardList = ({ boards, deleteBoard }) => (
  <List
  // celled
  // divided
  >
    {boards.map(({ id, name, ...info }) => (
      <BoardListItem
        key={id}
        id={id}
        name={name}
        {...info}
        deleteBoard={deleteBoard}
      />
    ))}
  </List>
);

export const Boards = () => {
  const { loading, error, data, refetch } = useUserBoardsQuery();
  const [deleteBoard] = useDeleteBoardMutation();

  const [createBoard, boardCreationState] = useCreateBoardMutation({
    onCompleted: () => refetch(),
  });

  if (loading) {
    return (
      <FullVerticalContainer>
        <Segment textAlign="center">
          <h1>Your Boards</h1>
          <Spinner />
        </Segment>
      </FullVerticalContainer>
    );
  }

  if (error) {
    return (
      <FullVerticalContainer>
        <Segment textAlign="center">
          <h1>Your Boards</h1>
          <p>list can not be loaded, please retry.</p>
        </Segment>
      </FullVerticalContainer>
    );
  }

  return (
    <FullVerticalContainer>
      <Segment textAlign="center">
        <h1>Your Boards</h1>
        <Container data-cy="boards-list" textAlign="left">
          {data?.me?.boards && data?.me?.boards?.length > 0 ? (
            <BoardList
              boards={data.me.boards}
              deleteBoard={(id) => {
                return deleteBoard({
                  variables: { id },
                  update: (store) => {
                    const readData = store.readQuery({
                      query: UserBoardsDocument,
                    }) as UserBoardsQuery;

                    if (readData.me?.boards) {
                      const newData = {
                        ...readData,
                        me: {
                          ...readData.me,
                          boards: readData.me.boards?.filter(
                            (board) => board?.id !== id
                          ),
                        },
                      };
                      store.writeQuery({
                        query: UserBoardsDocument,
                        data: newData,
                      });
                    }
                  },
                });
              }}
            />
          ) : (
            <span>
              There a no boards, yet. You can create new boards now...
            </span>
          )}
        </Container>
      </Segment>

      <Segment textAlign="center">
        <CreateBoardModal
          loading={boardCreationState.loading}
          error={boardCreationState.error?.message}
          createBoard={({ name }) => {
            return createBoard({
              variables: { name },
            });
          }}
        />
      </Segment>
    </FullVerticalContainer>
  );
};
