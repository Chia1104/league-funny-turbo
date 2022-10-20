import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

class LeagueFunny extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="zh-tw">
        <Head />
        <body className="w-bg-primary scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default LeagueFunny;
