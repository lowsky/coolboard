import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ClerkProvider } from '@clerk/nextjs';
import { ChakraProvider } from '@chakra-ui/react';

import 'public/index.css';

import { instrumentBrowserOtel } from 'src/instrumentBrowserOtel';
import { Footer } from 'components/Footer';
import { theme } from 'common/theme';

if (typeof window !== 'undefined') {
  // TODO investigate later...: top-level await in this place
  // Won't be possible with yarn next dev --turbo
  // -> it hangs completely on the initial page load !
  await instrumentBrowserOtel();
}

// The title of the Head and view-port-meta needs to go here, see https://nextjs.org/docs/messages/no-document-viewport-meta

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
      <ChakraProvider theme={theme}>
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
      </ChakraProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
