import Head from 'next/head'

import '../public/index.css'
import "fomantic-ui-css/semantic.min.css"

export default function MyApp({ Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Coolboard - Hands-on Application Building with GraphQL</title>
      </Head>

      <Component {...pageProps} />
    </>
  )
}
