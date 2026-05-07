import { gql } from '@apollo/client';

export const CardCardDoc = gql`
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
`;

export const CardListListDoc = gql`
  fragment CardList_list on List {
    name
    id
    cards {
      ...Card_card
    }
  }
  ${CardCardDoc}
`;
