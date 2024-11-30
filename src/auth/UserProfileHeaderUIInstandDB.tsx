import React from 'react';
import { useRouter } from 'next/router';
import { Avatar, Button, Flex, Link, Spinner } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { useAuth, useDb } from 'src/setupInstaWeb';

export const UserProfileHeaderUIInstanaDb = ({
  isLoginInPage,
}: {
  isLoginInPage?: boolean;
}) => {
  const db = useDb();
  const { isLoading, user, error } = useAuth();
  const { replace } = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Uh oh! {error.message}</div>;
  }

  return (
    <>
      {isLoading && (
        <>
          <Spinner />
          Loading user...
        </>
      )}
      {!isLoading && !user && !isLoginInPage && (
        <>
          Not logged in.
          <Link href="sign-in">Login here</Link>
        </>
      )}
      {user && (
        <>
          <Flex alignItems="center" gap="0.5em">
            <Avatar size="sm" title={user.email} />
            <Button
              onClick={async (event) => {
                event.preventDefault();
                db.auth.signOut();
                await replace('/');
              }}
              data-cy="sign-out-button"
              leftIcon={<FaSignOutAlt />}
              color="unset">
              Sign Out
            </Button>
          </Flex>
        </>
      )}
    </>
  );
};
