import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          {/*a script hack to deal with Firefox FOUC*/}
          <script>0</script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
