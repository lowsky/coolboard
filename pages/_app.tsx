import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import 'public/index.css';

import { Footer } from 'components/Footer';

import { DBContext, UserContext, db } from '../src/setupInstaWeb';
import { Login } from 'auth/AuthUI';

import { theme } from 'common/theme';

export default function App({ Component, pageProps }: AppProps) {
  const { isLoading, user, error } = db.useAuth();
  const fetchUser = db.useQuery({
    user: {},
  });

  if (user?.id) {
    console.log({ fetchUser });
    /*
    debugger
    const {data} = user ? db.useQuery({users: {
        user.id
      }})
      : {}

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

  if (!user) {
    return <Login db={db} />;
  } else {
    /*
    //const data: UserBoardsQuery = {
      me: {
        boards: [], id: user.id, name: 'nomee',
      },
    } as UserBoardsQuery;
     */
    return (
      <>
        <Head>
          <title>Coolboard - Hands-on Application Building with GraphQL</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <UserContext.Provider value={user}>
          <DBContext.Provider value={db}>
            <ChakraProvider theme={theme}>
              <div
                style={{
                  overflow: 'auto',
                  flex: 1,
                }}>
                <Component {...pageProps} />
              </div>

              <Footer />
            </ChakraProvider>
          </DBContext.Provider>
        </UserContext.Provider>
      </>
    );
  }
}
