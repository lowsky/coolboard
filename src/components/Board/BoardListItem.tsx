import React, { useState } from 'react';
import { IconButton, ListItem } from '@chakra-ui/react';
import Link from 'next/link';
import styles from 'components/Board/Boards.module.css';
import { FaTrash } from 'react-icons/fa';
import { User } from 'generated/graphql';

interface Props {
  name: string;
  id: string;
  user?: User;
  deleteBoard: ({ id }: { id: string }) => Promise<void>;
}

export const BoardListItem = (props: Props) => {
  const { name, id, user, deleteBoard } = props;
  const [deleting, setDeleting] = useState(false);

  return (
    <ListItem
      padding="0.25rem 0.5rem"
      marginBottom="0.5px"
      display="flex"
      data-cy={`board-list-item_${name}`}>
      <Link
        href={`/board/${id}`}
        passHref
        className={styles.wideColumn}
        title={user ? JSON.stringify(user) : '-none'}>
        {name}
      </Link>

      <IconButton
        backgroundColor="transparent"
        onClick={() => {
          setDeleting(true);
          deleteBoard({ id }).finally(() => setDeleting(false));
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
