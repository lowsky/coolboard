import { Flex } from '@chakra-ui/react';
import { useFragment } from '@apollo/client/react';

import { BoardTitle } from './BoardTitle';
import { BoardContent } from './BoardContent';
import { DelAllListsButton } from './DelAllListsButton';
import { Board_BoardFragment } from '../../../gql/graphql';

import { BoardBoardDoc } from 'components/Board/board.graphql';

const ToIdsMapper = <T extends { id: string }>(itemWithId: T) => itemWithId.id;

interface BoardProps {
  board: Board_BoardFragment;
  addListToBoard: (name?: string) => Promise<any>;
  deleteLists: (ids: string[]) => Promise<any>;
  readonly?: boolean;
}

export const BoardContainer = (props: BoardProps) => {
  const { deleteLists, readonly, addListToBoard } = props;
  const { complete, data } = useFragment<Board_BoardFragment>({
    fragment: BoardBoardDoc,
    from: props.board,
  });
  if (!complete || !data) return null;

  const { name, lists } = data;

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
        boardId={data.id}
        readonly={readonly ?? false}
      />
    </Flex>
  );
};
