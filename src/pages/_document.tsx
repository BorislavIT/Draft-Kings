import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* dk logo */}
          <link
            rel="shortcut icon"
            href="https://d2tjpz01y5bfgl.cloudfront.net/favicon.ico"
            data-gatsby-head="true"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
