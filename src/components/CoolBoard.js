/* eslint-disable react/prop-types */
import React from 'react';

import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

import {
  BoardContainer,
  AddListButton,
  DelListButton,
} from './BoardContainer';
import { CardList } from './CardList';

class Board extends React.Component {
  render() {
    const {
      board = {},
      addList,
      deleteAllLists,
      boardId,
    } = this.props;

    const { name, lists = [] } = board;

    const onBoardAddItem = () => {
      console.log(
        `triggered adding list to the board`
      );
      addList({
        variables: {
          boardId,
          name: 'new list',
        },
      });
    };

    return (
      <BoardContainer boardName={name}>
        <DelListButton
          action={() =>
            deleteAllLists(boardId, lists)
          }>
          Delete All
        </DelListButton>
        {lists.map(list => (
          <CardList
            key={list.id}
            name={list.name}
            id={list.id}
            boardId={boardId}
          />
        ))}
        <AddListButton onAddNewList={onBoardAddItem} />
      </BoardContainer>
    );
  }
}

Board.fragments = {
  board: gql`
    fragment Board_board on Board {
      name
      id
      lists {
        name
        id
      }
    }
  `,
};

const BoardQuery = gql`
  query board($boardId: ID) {
    board(where: { id: $boardId }) {
      ...Board_board
    }
  }
  ${Board.fragments.board}
`;

const addListMutation = gql`
  mutation($boardId: ID!, $name: String!) {
    updateBoard(
      data: { lists: { create: { name: $name } } }
      where: { id: $boardId }
    ) {
      ...Board_board
    }
  }
  ${Board.fragments.board}
`;

export const CoolBoard = props => (
  <Query
    query={BoardQuery}
    variables={{ boardId: props.boardId }}>
    {({ subscribeToMore, loading, error, data }) => {
      if (loading) {
        return <div>Loading Board</div>;
      }

      if (error) {
        return false;
      }

      const { board } = data;
      if (!board) {
        return <div>Board does not exist.</div>;
      }

      return (
        <Mutation mutation={addListMutation}>
          {addList => (
            <Mutation mutation={deleteAllLists}>
              {deleteManyLists => (
                <Board
                  {...props}
                  addList={addList}
                  board={data.board}
                  deleteAllLists={(
                    boardId,
                    listIds
                  ) => {
                    deleteManyLists({
                      variables: {
                        boardId,
                        listIds: listIds.map(li => ({
                          id: li.id,
                        })),
                      },
                    });
                  }}
                  subscribeToMore={subscribeToMore}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      );
    }}
  </Query>
);

let deleteAllLists = gql`
  mutation deletelistsOfBoard(
    $boardId: ID!
    $listIds: [ListWhereUniqueInput!]!
  ) {
    updateBoard(
      data: { lists: { delete: $listIds } }
      where: { id: $boardId }
    ) {
      id
    }
  }
`;
