import { graphql } from '../../gql';

export const CardListListDoc = graphql(`
  fragment CardList_list on List {
    name
    id
    cards {
      ...Card_card
    }
  }
`);

export const CardCardDoc = graphql(`
  fragment Card_card on Card {
    id
    name
    description
    createdAt
    updatedAt
    updatedBy {
      avatarUrl
      email
      name
      id
    }
  }
`);
