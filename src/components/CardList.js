import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import {
  Button,
  Header,
  Icon,
  Loader,
  Popup,
} from 'semantic-ui-react';

import styles from './CardList.module.css';

import Card, { dndItemType } from './Card';

class CardListWithoutDnd extends React.Component {
  render() {
    const {
      isOver,
      id,
      addCardWithName = () => {},
      deleteListWithId = () => {},
    } = this.props;

    const { cardList } = this.props;
    const { list = {}, loading } = cardList;

    // use name injected as default if not yet available
    let { name = this.props.name, cards = [] } = list;

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
                <Icon name="trash" />
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
              onButtonClick={() =>
                addCardWithName(id)
              }>
              <Icon name="plus" />
              Add a card
            </CardListButton>
          </div>
        </div>
      </div>
    );
  }
}

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

const CardListfragments = {
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

export const CardList = ({ id, ...props }) => (
  <Query
    variables={{ cardListId: id }}
    query={gql`
      query CardList($cardListId: ID) {
        list(where: { id: $cardListId }) {
          ...CardList_list
        }
      }
      ${CardListfragments.list}
    `}>
    {({ loading, error, data }) => {
      if (error) {
        return <span>Load error!</span>;
      }
      const cardList = {
        ...data,
        loading,
      };
      return (
        <CardListWithDnd
          {...props}
          cardList={cardList}
          id={id}
        />
      );
    }}
  </Query>
);

const CardListHeader = ({ name, children }) => (
  <div className={styles.header}>
    <Header
      textAlign="center"
      className={styles.title}>
      {name}
    </Header>
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
    compact
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
  ...CardListfragments,
};
