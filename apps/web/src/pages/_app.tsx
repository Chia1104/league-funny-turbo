import "../styles/globals.scss";
import "../styles/globals.css";
import "@wanin/ui/styles.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary, Layout, Provider } from "@/components";
import type { Session } from "next-auth";

function Web({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps<{ session: Session }>) {
  return (
    <ErrorBoundary>
      <Provider session={session}>
        <Layout>
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </Provider>
    </ErrorBoundary>
  );
}

export default Web;
