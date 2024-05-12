import React from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, Spinner } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { useAuth, useDb } from '../setupInstaWeb';

export const UserProfileHeaderUIInstanaDb = () => {
  const db = useDb();
  const { isLoading, user, error } = useAuth();
  const fetchUserResult = db.useQuery({
    users: {},
  });
  const { replace } = useRouter();

  if (user?.id) {
    console.log({ fetchUserResult });
    /*
    debugger
    const {data} = user ? db.useQuery({users: {
        user.id
      }})
      : {}

  const { colorMode } = useColorMode();
  const clerkAppearance = colorMode === 'dark' ? { baseTheme: dark } : {};
    db.transact(tx.users[user.id].update({
      id: user.id, email: user.email, createdAt: Date.now(),
    }));
    */
  }

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
      {!isLoading && !user && <>Not logged in.</>}
      {user && (
        <>
          <Flex alignItems="center" gap="0.5em">
            {user.id}
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
