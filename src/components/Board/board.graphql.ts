import { gql, TypedDocumentNode } from '@apollo/client';

import { Board_BoardFragment } from '../../gql/graphql';

export const BoardBoardDoc: TypedDocumentNode<Board_BoardFragment> = gql`
  fragment Board_board on Board {
    name
    id
    lists {
      name
      id
    }
  }
`;
