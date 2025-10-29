import { graphql } from "../../gql";

export const BoardBoardDoc = graphql(`
fragment Board_board on Board {
  name
  id
  lists {
    name
    id
  }
}
`);
