import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Button,
  Container,
  Loader,
  Segment,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

import { FullVerticalContainer } from '../../components/general/FullVerticalContainer';
import { CreateBoardModal } from '../../components/CreateBoardModal';

const BoardListItem = ({ name, id, deleteBoard }) => (
  <div data-cy="board-list-item">
    <Link to={`/board/${id}`}>{name}</Link>
    &nbsp;
    <Button
      onClick={() => deleteBoard(id)}
      size='mini'
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

export const Boards = () => {
  const [showModal, setShowModal] = useState(false);

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

  return (
    <FullVerticalContainer>
      <h1>Your Boards:</h1>

      <Query query={userWithBoardsQuery}>
        {({ loading, error, data, refetch }) => {
          if (loading) return <Loader />;
          if (error) return false;

          return (
            <Mutation
              onCompleted={refetch}
              mutation={deleteBoardMutation}>
              {deleteBoard => (
                <Container fluid>
                  {data.me.boards.length > 0 ? (
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
                </Container>
              )}
            </Mutation>
          );
        }}
      </Query>
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
