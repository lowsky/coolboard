import Document, { Html, Head, Main, NextScript } from 'next/document';
import { InstanaEumScripts } from 'common/instanaEumScripts';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="twitter:card" content="/screenshot.png" />
          <meta name="twitter:site" content="@rhosts" />
          <meta name="twitter:creator" content="@rhosts" />
          <meta
            name="twitter:title"
            content="coolboard: graphql trello clone"
          />
          <meta
            name="twitter:description"
            content="Working live demo of /building an entire Trello-like application using GraphQL and React/ video course on PacktPub.com"
          />
          <meta name="twitter:image" content="/screenshot.png" />
          <meta
            name="description"
            content="Working live demo of /building an entire Trello-like application using GraphQL and React/ video course on PacktPub.com"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#ffffff"
          />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/favicons/mstile-144x144.png"
          />
          <meta
            name="msapplication-config"
            content="/favicons/browserconfig.xml"
          />
          <meta name="theme-color" content="#27ae60" />
        </Head>

        <body>
          <div id="root">
            <noscript>You need to enable JavaScript to run this app.</noscript>

            <Main />
          </div>

          <NextScript />
          <InstanaEumScripts />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
