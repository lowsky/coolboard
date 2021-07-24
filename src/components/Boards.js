import { gql, useMutation, useQuery } from "@apollo/client";
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Container, Loader, Segment, } from 'semantic-ui-react';

import { FullVerticalContainer } from '../common/FullVerticalContainer';
import { CreateBoardModal } from './CreateBoardModal';

const BoardListItem = ({ name, id, deleteBoard }) => (
  <div data-cy="board-list-item">
    <Link href={`/board/${id}`}><a>{name}</a></Link>
    &nbsp;
    <Button
      onClick={() => deleteBoard(id)}
      size="mini"
      icon="trash"
    />
  </div>
);

const BoardList = ({ boards, deleteBoard }) =>
  boards.map(({ id, ...info }) => (
    <BoardListItem
      key={id}
      id={id}
      {...info}
      deleteBoard={deleteBoard}
    />
  ));

const createBoardMutation = gql`
  mutation createBoard($name: String!) {
    createBoard(name: $name) {
      name
      id
      boards {
        name
        id
      }
    }
  }
`;
const deleteBoardMutation = gql`
  mutation delBoard($id: ID!) {
    deleteBoard(id: $id) {
      id
    }
  }
`;

const userWithBoardsQuery = gql`
  {
    me {
      name
      id
      boards {
        name
        id
      }
    }
  }
`;

export const Boards = () => {
  const { loading, error, data, refetch } = useQuery(
    userWithBoardsQuery
  );

  const [showModal, setShowModal] = useState(false);

  const [deleteBoard] = useMutation(
    deleteBoardMutation,
    { onCompleted: () => refetch() }
  );

  const [createBoard, boardCreationState] = useMutation(
    createBoardMutation,
    { onCompleted: () => refetch() }
  );

  if(loading) {
    return (
      <FullVerticalContainer>
        <Segment textAlign="center" basic>
          <h1>Your Boards</h1>
          <Loader/>
        </Segment>

      </FullVerticalContainer>
    );
  }

  if(error) {
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
        <Container data-cy='boards-list'>
          {data?.me?.boards?.length > 0 ? (
            <BoardList
              boards={data.me.boards}
              deleteBoard={id => {
                return deleteBoard({
                  variables: { id },
                });
              }}
            />
          ) : (
            <span>
            There a no boards, yet. You need
            need to create one.
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
