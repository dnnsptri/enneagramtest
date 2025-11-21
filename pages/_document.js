import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="nl">
      <Head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Meta tags */}
        <meta name="theme-color" content="#467565" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

