import React, { useState } from 'react';
import { Mutation } from '@apollo/client/react/components';
import { gql, useQuery } from "@apollo/client";

import {
  Segment,
  Loader,
  Button,
  Container,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

import { FullVerticalContainer } from '../common/FullVerticalContainer';
import { CreateBoardModal } from './CreateBoardModal';

const BoardListItem = ({ name, id, deleteBoard }) => (
  <div data-cy="board-list-item">
    <Link to={`/board/${id}`}>{name}</Link>
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

  if (loading) {
    return (
      <FullVerticalContainer>
        <h1>List of Boards </h1>
        <Loader />
      </FullVerticalContainer>
    );
  }

  if (error) {
    return (
      <FullVerticalContainer>
        <h1>List of Boards </h1>
        <p>Error loading ... </p>
      </FullVerticalContainer>
    );
  }

  return (
    <FullVerticalContainer>
      <h1>List of Boards </h1>
      <Mutation
        onCompleted={refetch}
        mutation={deleteBoardMutation}>
        {deleteBoard => (
          <Container fluid data-cy='boards-list'>
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
                      need to create one ...
                    </span>
            )}
          />
          </Container>
        )}
      </Mutation>

      <Mutation mutation={createBoardMutation}>
        {(createBoard, { loading, error }) => {
          const { message } = error || {};
          return (
            <Segment basic>
              <CreateBoardModal
                loading={loading}
                error={message}
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
          );
        }}
      </Mutation>
    </FullVerticalContainer>
  );
};
