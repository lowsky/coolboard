import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Container, List, Loader, Segment } from 'semantic-ui-react';

import { FullVerticalContainer } from '../common/FullVerticalContainer';
import { CreateBoardModal } from './CreateBoardModal';
import {
  useCreateBoardMutation,
  useDeleteBoardMutation,
  useUserBoardsQuery,
} from '../generated/graphql';

import styles from './Boards.module.css';

const BoardListItem = ({ name, id, deleteBoard }) => {
  const [deleting, setDeleting] = useState(false);
  return (
    <List.Item as={'li'} className={styles.listItem} data-cy="board-list-item">
      <Link href={`/board/${id}`} passHref>
        <a className={styles.wideColumn}>{name}</a>
      </Link>

      <Button
        compact
        basic
        onClick={() => {
          setDeleting(true);
          deleteBoard(id).finally(() => setDeleting(false));
        }}
        loading={deleting}
        size="mini"
        icon="trash"
      />
    </List.Item>
  );
};

const BoardList = ({ boards, deleteBoard }) => (
  <List celled divided>
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

  const [showModal, setShowModal] = useState(false);

  const [deleteBoard] = useDeleteBoardMutation({
    onCompleted: () => refetch(),
  });

  const [createBoard, boardCreationState] = useCreateBoardMutation({
    onCompleted: () => refetch(),
  });

  if (loading) {
    return (
      <FullVerticalContainer>
        <Segment textAlign="center" basic>
          <h1>Your Boards</h1>
          <Loader />
        </Segment>
      </FullVerticalContainer>
    );
  }

  if (error) {
    return (
      <FullVerticalContainer>
        <Segment textAlign="center" basic>
          <h1>Your Boards</h1>
          <p>list can not be loaded, please retry.</p>
        </Segment>
      </FullVerticalContainer>
    );
  }

  return (
    <FullVerticalContainer>
      <Segment textAlign="center" basic>
        <h1>Your Boards</h1>
        <Container data-cy="boards-list" textAlign="left">
          {data?.me?.boards && data?.me?.boards?.length > 0 ? (
            <BoardList
              boards={data.me.boards}
              deleteBoard={(id) => {
                return deleteBoard({
                  variables: { id },
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

      <Segment textAlign="center" basic>
        <CreateBoardModal
          loading={boardCreationState.loading}
          error={boardCreationState.error?.message}
          open={showModal}
          onOpen={() => {
            setShowModal(true);
          }}
          onHide={() => {
            setShowModal(false);
          }}
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
