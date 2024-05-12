import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import 'public/index.css';

import { Footer } from 'components/Footer';

import { db, useAuth, DBContext, UserContext } from '../src/setupInstaWeb';

import { theme } from 'common/theme';

export default function App({ Component, pageProps }: AppProps) {
  const { user } = useAuth();
  /*
              {isLoading && <div>Loading...</div>}
              {error && <div>Uh oh! Authentication error: {error.message}</div>}

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
