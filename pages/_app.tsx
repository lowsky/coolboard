import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';

import '../public/index.css';
import '../src/fomantic/dist/semantic.min.css';

import { InstanaEumScripts } from '../src/common/instanaEumScripts';
import { Footer } from '../src/components/Footer';

// Head's title and view-port-meta needs to go here, see https://nextjs.org/docs/messages/no-document-viewport-meta

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Coolboard - Hands-on Application Building with GraphQL</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      {false && <InstanaEumScripts />}
      <div
        style={{
          overflow: 'auto',
          flex: 1,
        }}>
        <ClerkProvider {...pageProps}>
          <Component {...pageProps} />
        </ClerkProvider>
      </div>

      <Footer />
    </>
  );
}
