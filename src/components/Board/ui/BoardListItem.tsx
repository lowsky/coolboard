import React, { useState } from 'react';
import { IconButton, ListItem } from '@chakra-ui/react';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';

import styles from 'components/Board/Boards.module.css';

export interface BoardListItemProps {
  name: string;
  id: string;
  deleteBoard: (id: string) => Promise<void>;
}

export const BoardListItem = (props: BoardListItemProps) => {
  const { name, id, deleteBoard } = props;
  const [deleting, setDeleting] = useState(false);

  return (
    <ListItem
      padding="0.25rem 0.5rem"
      marginBottom="0.5px"
      display="flex"
      data-cy={`board-list-item_${name}`}>
      <Link href={`/board/${id}`} passHref className={styles.wideColumn}>
        {name}
      </Link>

      <IconButton
        backgroundColor="transparent"
        onClick={() => {
          setDeleting(true);
          deleteBoard(id).finally(() => setDeleting(false));
        }}
        isLoading={deleting}
        aria-label="delete board"
        data-cy="delete-board"
        icon={<FaTrash />}
        size="mini"
      />
    </ListItem>
  );
};
