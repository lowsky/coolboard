import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Loader, Popup } from 'semantic-ui-react';

import Card, { dndItemType } from './Card';

import styles from './CardList.module.css';
import {
  useAddCardMutationMutation,
  useCardListQuery,
  useMoveCardMutation,
} from '../generated/graphql';

const CardListWithoutDnd = (props) => {
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
      <div
        className={styles.list}
        style={{
          backgroundColor: isOver ? 'yellow' : 'lightgrey',
        }}>
        <CardListHeader name={name}>
          <CardListButton onButtonClick={() => deleteListWithId(id)}>
            <Icon name="trash" color={'red'} />
            delete list
          </CardListButton>
        </CardListHeader>

        {loading ? (
          <Loader active />
        ) : (
          <div className={styles.inner}>
            <div className={styles.container}>
              {cards.map((c) => (
                <Card key={c.id} {...c} cardListId={id} />
              ))}
            </div>
          </div>
        )}

        <CardListButton onButtonClick={() => addCardWithName(id)}>
          <Icon name="plus" />
          Add a card
        </CardListButton>
      </div>
    </div>
  );
};

const drop = (props, cardItem) => {
  const cardId = cardItem.id;
  const cardListId = props.id;
  const oldCardListId = cardItem.cardListId;
  props.moveCardToList(cardId, oldCardListId, cardListId);
};

const CardListWithDnd = (props) => {
  const [dndProps, ref] = useDrop({
    accept: dndItemType,
    drop: (item) => drop(props, item),
    // @ts-ignore
    canDrop: (item) => props.id !== item.cardListId,
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  });

  return (
    <div ref={ref}>
      <CardListWithoutDnd {...props} {...dndProps} />
    </div>
  );
};

export const CardList = ({ id, name, deleteListWithId }) => {
  const { loading, error, data } = useCardListQuery({
    variables: { cardListId: id },
  });

  const [moveCard] = useMoveCardMutation();

  const [addCardWithName] = useAddCardMutationMutation({
    variables: {
      cardListId: id,
      name: 'new card',
    },
  });

  if (error) {
    return <span>Load error!</span>;
  }

  const list = data?.list ?? []; // fix data is undefined when loading...

  const onMoveCardToList = (cardId, oldCardListId, newCardListId) => {
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
  <div className={styles.header} data-cy="card-list-header">
    <Header className={styles.title}>{name}</Header>
    <Popup
      trigger={
        <Button
          data-cy="card-list-header-menu"
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

const CardListButton = ({ onButtonClick, children }) => (
  <Button className={styles.button} onClick={() => onButtonClick()}>
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
