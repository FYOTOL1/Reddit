import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Tower</title>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        <meta name="description" content="For Portfolio" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
