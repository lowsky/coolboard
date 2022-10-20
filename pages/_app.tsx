import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import '../public/index.css';

import { InstanaEumScripts } from '../src/common/instanaEumScripts';
import { Footer } from '../src/components/Footer';

// Head's title and view-port-meta needs to go here, see https://nextjs.org/docs/messages/no-document-viewport-meta

export default function App({ Component, pageProps }: AppProps) {
  /*
More background about theming:
https://chakra-ui.com/docs/styled-system/theming/theme
https://chakra-ui.com/docs/styled-system/theming/customize-theme#customizing-component-styles
 */

  const theme = extendTheme({
    config: {
      initialColorMode: 'light',
    },
    components: {
      Text: {
        baseStyle: {
          mb: '1rem',
        },
      },
      Heading: {
        baseStyle: {
          fontWeight: '700',
          mb: '1rem',
        },
      },
    },
    styles: {
      global: (props) => ({
        body: {
          fontFamily: 'Inter',
        },
        a: {
          color: mode('#3273dc', 'blue.200')(props),
          _hover: {
            textDecoration: 'underline',
          },
        },
      }),
    },
  });

  return (
    <>
      <Head>
        <title>Coolboard - Hands-on Application Building with GraphQL</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      {<InstanaEumScripts />}
      <div
        style={{
          overflow: 'auto',
          flex: 1,
        }}>
        <ChakraProvider theme={theme}>
          <ClerkProvider {...pageProps}>
            <Component {...pageProps} />
          </ClerkProvider>
        </ChakraProvider>
      </div>

      <Footer />
    </>
  );
}
