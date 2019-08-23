import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {
  graphql,
  Mutation,
  Query,
} from 'react-apollo';

import {
  Button,
  Header,
  Icon,
  Loader,
  Popup,
} from 'semantic-ui-react';

import styles from './CardList.module.css';

import Card, { dndItemType } from './Card';

const CardListWithoutDnd = props => {
  const {
    isOver,
    id,
    addCardWithName = () => {},
    deleteListWithId = () => {},
  } = props;

  const { cardList } = props;
  const { list = {}, loading } = cardList;

  // use name injected as default if not yet available
  let { name = props.name, cards = [] } = list;

  return (
    <div data-cy="card-list">
      <div>
        <div
          className={styles.list}
          style={{
            backgroundColor: isOver
              ? 'yellow'
              : 'lightgrey',
          }}>
          <CardListHeader name={name}>
            <CardListButton
              onButtonClick={() =>
                deleteListWithId(id)
              }>
              <Icon name="trash" color={'red'} />
              delete list
            </CardListButton>
          </CardListHeader>

          {loading ? (
            <Loader active />
          ) : (
            <div className={styles.inner}>
              <div className={styles.container}>
                {cards.map(c => (
                  <Card
                    key={c.id}
                    {...c}
                    cardListId={id}
                  />
                ))}
              </div>
            </div>
          )}

          <CardListButton
            onButtonClick={() => addCardWithName(id)}>
            <Icon name="plus" />
            Add a card
          </CardListButton>
        </div>
      </div>
    </div>
  );
};

const drop = (props, cardItem) => {
  const cardId = cardItem.id;
  const cardListId = props.id;
  const oldCardListId = cardItem.cardListId;
  props.moveCardToList(
    cardId,
    oldCardListId,
    cardListId
  );
};

const CardListWithDnd = props => {
  const [dndProps, ref] = useDrop({
    accept: dndItemType,
    drop: item => drop(props, item),
    canDrop: item => props.id !== item.cardListId,
    collect: monitor => ({ isOver: monitor.isOver() }),
  });

  return (
    <div ref={ref}>
      <CardListWithoutDnd {...props} {...dndProps} />
    </div>
  );
};

export const CardList = ({ id }) => (
  <Mutation mutation={moveCardMutation}>
    {moveCard => (
      <Query
        variables={{ cardListId: id }}
        query={gql`
          query CardList($cardListId: ID) {
            list(where: { id: $cardListId }) {
              ...CardList_list
            }
          }
          ${CardList.fragments.list}
        `}>
        {({ loading, error, data }) => {
          if (error) {
            return <span>Load error!</span>;
          }

          const cardList = {
            ...data,
            loading,
          };

          const onMoveCardToList = (
            cardId,
            oldCardListId,
            newCardListId
          ) => {
            console.log(
              `triggered moving card with id: ${cardId} to list with id: ${oldCardListId} -> id: ${newCardListId}`
            );

            moveCard({
              variables: {
                oldCardListId,
                cardListId: newCardListId,
                cardId,
              },
            });
          };

          return (
            <Mutation
              mutation={deleteCardList}
              variables={{
                cardListId: id,
              }}>
              {deleteCardList => (
                <Mutation
                  mutation={addCardMutation}
                  variables={{
                    cardListId: id,
                    name: 'new card',
                  }}>
                  {addCardWithName => (
                    <CardListWithDnd
                      deleteListWithId={deleteCardList}
                      addCardWithName={addCardWithName}
                      moveCardToList={onMoveCardToList}
                      cardList={cardList}
                      id={id}
                    />
                  )}
                </Mutation>
              )}
            </Mutation>
          );
        }}
      </Query>
    )}
  </Mutation>
);

const CardListHeader = ({ name, children }) => (
  <div className={styles.header}>
    <Header className={styles.title}>{name}</Header>
    <Popup
      trigger={
        <Button
          style={{ flexGrow: 0 }}
          icon="ellipsis vertical"
          size="mini"
        />
      }
      on="click"
      basic>
      {children}
    </Popup>
  </div>
);

const CardListButton = ({
  onButtonClick,
  children,
}) => (
  <Button floated
    className={styles.button}
    onClick={() => onButtonClick()}>
    {children}
  </Button>
);

CardList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  addCardWithName: PropTypes.func,
  deleteListWithId: PropTypes.func,
  moveCardToList: PropTypes.func,
};

CardList.fragments = {
  list: gql`
    fragment CardList_list on List {
      name
      id
      cards {
        ...Card_card
      }
    }
    ${Card.fragments.card}
  `,
};

const moveCardMutation = gql`
  mutation moveCard(
    $cardId: ID!
    $oldCardListId: ID!
    $cardListId: ID!
  ) {
    newList: updateList(
      data: { cards: { connect: { id: $cardId } } }
      where: { id: $cardListId }
    ) {
      ...CardList_list
    }
    oldList: updateList(
      data: { cards: { disconnect: { id: $cardId } } }
      where: { id: $oldCardListId }
    ) {
      ...CardList_list
    }
  }
  ${CardList.fragments.list}
`;

let addCardMutation = gql`
  mutation AddCardMutation(
    $cardListId: ID!
    $name: String!
  ) {
    updateList(
      data: { cards: { create: { name: $name } } }
      where: { id: $cardListId }
    ) {
      ...CardList_list
    }
  }
  ${CardList.fragments.list}
`;

const addCard = graphql(
  gql`
    mutation AddCardMutation(
      $cardListId: ID!
      $name: String!
    ) {
      updateList(
        data: { cards: { create: { name: $name } } }
        where: { id: $cardListId }
      ) {
        ...CardList_list
      }
    }
    ${CardList.fragments.list}
  `,
  {
    name: 'addCardMutation',
    props: ({ addCardMutation }) => ({
      addCard: ({ name, cardListId }) => {
        return addCardMutation({
          variables: {
            cardListId,
            name,
          },
        });
      },
    }),
  }
);

let moveCard = graphql(
  gql`
    mutation moveCard(
      $cardId: ID!
      $oldCardListId: ID!
      $cardListId: ID!
    ) {
      newList: updateList(
        data: { cards: { connect: { id: $cardId } } }
        where: { id: $cardListId }
      ) {
        ...CardList_list
      }
      oldList: updateList(
        data: {
          cards: { disconnect: { id: $cardId } }
        }
        where: { id: $oldCardListId }
      ) {
        ...CardList_list
      }
    }
    ${CardList.fragments.list}
  `,
  {
    name: 'moveCard',
  }
);

let deleteCardList = gql`
  mutation deletelist($cardListId: ID!) {
    # minimum data transfer:
    deleteList(where: { id: $cardListId }) {
      id
    }
  }
`;
