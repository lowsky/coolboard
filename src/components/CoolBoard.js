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
      subscribeToMore,
    } = this.props;

    const { name, lists = [] } = board;

    const onBoardAddItem = () => {
      console.log(
        `triggered adding list to the board`
      );
      addList({
        variables: {
          boardId,
          name: 'Section 5',
        },
      });
    };

    this.subscribeToBoardUpdates(
      subscribeToMore,
      boardId
    );
    this.subscribeToListUpdates(subscribeToMore);
    this.subscribeToCardUpdates(subscribeToMore);

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

  // for edit-board or  add-cardlist = board update
  subscribeToBoardUpdates(subscribeToMore, boardId) {
    subscribeToMore({
      document: BoardSubscription,
      variables: {
        boardId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        console.log(
          'updating board:',
          subscriptionData.data.board
        );
      },
    });
  }

  // for add-card = list update
  subscribeToListUpdates(subscribeToMore) {
    subscribeToMore({
      document: ListsSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const { list } = subscriptionData.data;
        if (!list) {
          return prev;
        }

        console.log('updating list:', list);

        /* Deleting "leaf" without any board-change-update
         * Update local cache, by updating board locally
         */
        if ('DELETED' === list.mutation) {
          const oldList = prev.board.lists;

          // use all items, but the specific cardList
          const lists = oldList.filter(
            cardList =>
              cardList.id !== list.previousValues.id
          );

          const newBoard = {
            ...prev.board,
            lists,
          };

          return {
            ...prev,
            board: newBoard,
          };
        }

        return prev;
      },
    });
  }

  // for edit-card = card update
  subscribeToCardUpdates(subscribeToMore) {
    subscribeToMore({
      document: CardsSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (subscriptionData.data)
          console.log(
            'updating card:',
            subscriptionData.data.card
          );
      },
    });
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

/*
 Workaround:
 We need to replace the fragments in subscriptions
 until this bug will be fixed
 https://github.com/graphcool/prisma/issues/2026
*/
const CardsSubscription = gql`
  subscription {
    card(where: {}) {
      mutation
      node {
        id
        name
        description
        createdAt
        updatedAt
        updatedBy {
          avatarUrl
          name
          id
        }
      }
      previousValues {
        id
        name
      }
      updatedFields
    }
  }
  # {Card.fragments.card}
`;

const ListsSubscription = gql`
  subscription {
    list(where: {}) {
      mutation
      previousValues {
        id
        name
      }
      node {
        name
        id
        cards {
          id
          name
          description
        }
      }
    }
  }
  # {CardList.fragments.list}
`;

const BoardSubscription = gql`
  subscription($boardId: ID) {
    board(where: { node: { id: $boardId } }) {
      mutation
      node {
        name
        id
        lists {
          name
          id
        }
      }
      previousValues {
        id
        name
      }
      updatedFields
    }
  }
  # {Board.fragments.board}
`;

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
