import Head from 'next/head'

import '../public/index.css'
import "fomantic-ui-css/semantic.min.css"
import "inter-ui/inter.css"

// Head's title and view-port-meta needs to go here, see https://nextjs.org/docs/messages/no-document-viewport-meta

export default function App({ Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Coolboard - Hands-on Application Building with GraphQL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
