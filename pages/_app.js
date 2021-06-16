import Head from 'next/head'

export default function MyApp({ Component, pageProps}) {
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
