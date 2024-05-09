import React from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, Spinner } from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';

import { DBContext } from '../setupInstaWeb';
import { Login } from 'auth/AuthUI';

export const UserProfileHeaderUIInstanaDb = () => {
  const db = React.useContext(DBContext);
  const { isLoading, user, error } = db.useAuth();
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
      {!isLoading && !user && (
        <>
          <Login db={db} />
        </>
      )}
      {user && (
        <>
          <Flex alignItems="center" gap="0.5em">
            {user.id}
            <Button
              onClick={async (event) => {
                event.preventDefault();
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
