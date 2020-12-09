/* eslint-disable react/prop-types */
import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Header,
  Icon,
  Loader,
  Popup,
} from 'semantic-ui-react';

import Card, { dndItemType } from './Card';

import styles from './CardList.module.css';

const CardListWithoutDnd = props => {
  const {
    isOver,
    id,
    addCardWithName = () => {},
    deleteListWithId = () => {},
    loading,
  } = props;

  const { cardList } = props;
  const { list = {} } = cardList;

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

const fragments = {
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
  ${fragments.list}
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
  ${fragments.list}
`;

export const CardList = ({
  id,
  name,
  deleteListWithId,
}) => {
  const { loading, error, data } = useQuery(
      gql`
        query CardList($cardListId: ID) {
          list(where: { id: $cardListId }) {
            ...CardList_list
          }
        }
        ${CardList.fragments.list}
      `,
    {variables:{ cardListId: id }});

  const [moveCard] = useMutation(
    moveCardMutation
  );

  const [addCardWithName] = useMutation(
    addCardMutation,
    {
      variables: {
        cardListId: id,
        name: 'new card',
      }
    }
  );

  if(error) {
      return <span>Load error!</span>;
  }

  let list = [];
  if(!loading && data) {
    list = data.list; // fix data is undefined when loading...
  }


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
    <CardListWithDnd
      deleteListWithId={deleteListWithId}
      addCardWithName={addCardWithName}
      moveCardToList={onMoveCardToList}
      cardList={{ list }}
      name={name}
      loading={loading}
      id={id}
    />
  );
};

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
  <Button
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

CardList.fragments = fragments;
