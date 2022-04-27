import Head from 'next/head';
//import Script from 'next/script'
import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';

import '../public/index.css';
import '../src/fomantic/dist/semantic.min.css';
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
      {/*
      <Script strategy='afterInteractive' id="eum-init"
      >
        {`
              (function(s,t,a,n){s[t] || (s[t] = a, n = s[a] = function() {
                n.q.push(arguments)
              },
              n.q = [], n.v = 2, n.l = 1 * new Date)})(window,'InstanaEumObject','ineum');

              ineum('reportingUrl', 'https://eum-pink-saas');
              ineum('key', 'C_tJGFlMS7WBNuGg');
              ineum('trackSessions');
          `}
      </Script>
      <Script strategy='afterInteractive' id="eum" crossOrigin="anonymous"
              src="https://eum.instana.io/eum.min.js" defer/>
      */}
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
