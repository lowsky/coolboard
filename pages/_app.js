import Head from 'next/head'
import Link from "next/link";
import Script from 'next/script'


import '../public/index.css'
import '../src/fomantic/dist/semantic.css'

// Head's title and view-port-meta needs to go here, see https://nextjs.org/docs/messages/no-document-viewport-meta

export default function App({ Component, pageProps}) {
  return (
    <>
      <Head>
        <title>Coolboard - Hands-on Application Building with GraphQL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      </Head>
      {
        /*
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
      */
      }
      <div style={{
        overflow: "auto",
        flex: 1
      }}>
        <Component {...pageProps} />
      </div>

      <footer id="footer" className="ui fluid container">
        <p>
          <span style={{color:"black"}}>CoolBoard, powered by Prisma, GraphQL, Apollo, React.js, Netlify</span>
          <Link href="/imprint">
            <a>Imprint</a>
          </Link>
          <Link href="/privacy">
            <a>Privacy</a>
          </Link>

          <a href="mailto:coolboard@protonmail.com"><i className="icon mail "> Mail</i> </a>
          <a href="https://twitter.com/rhosts"><i className="icon twitter"> Twitter</i></a>
          <a href="https://github.com/lowsky/-Hands-on-Application-Building-with-GraphQL">
            <i className="icon github">classic version</i>
          </a>
        </p>
      </footer>
    </>
  )
}
