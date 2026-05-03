import { Flex } from '@chakra-ui/react';
import { useFragment } from '@apollo/client/react';
import { FragmentType } from '@apollo/client';

import { BoardTitle } from './BoardTitle';
import { BoardContent } from './BoardContent';
import { DelAllListsButton } from './DelAllListsButton';
import { Board_BoardFragment } from '../../../gql/graphql';

import { BoardBoardDoc } from 'components/Board/board.graphql';

const ToIdsMapper = <T extends { id: string }>(itemWithId: T) => itemWithId.id;

interface BoardProps {
  board: FragmentType<Board_BoardFragment>;
  addListToBoard: (name?: string) => Promise<any>;
  deleteLists: (ids: string[]) => Promise<any>;
  readonly?: boolean;
}

export const BoardContainer = (props: BoardProps) => {
  const { deleteLists, readonly, addListToBoard } = props;
  const { complete, data } = useFragment({
    fragment: BoardBoardDoc,
    fragmentName: 'Board_board',
    from: props.board,
  });
  if (!complete || !data) return null;

  // @ts-expect-error TS2322: Type Board_BoardFragment[] is not assignable to type Board_BoardFragment
  // Type Board_BoardFragment[] is missing the following properties from type ...
  const board: Board_BoardFragment = data;

  const { name, lists } = board;

  const headerActions = !readonly && (
    <DelAllListsButton action={() => deleteLists(lists.map(ToIdsMapper))}>
      Delete All
    </DelAllListsButton>
  );
  return (
    <Flex flexDir="column" maxW="100%" flexGrow={1}>
      <BoardTitle boardName={name} headerActions={headerActions} />
      <BoardContent
        lists={lists}
        addList={addListToBoard}
        boardId={board.id}
        readonly={readonly ?? false}
      />
    </Flex>
  );
};
