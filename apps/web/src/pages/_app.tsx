import "../styles/globals.scss";
import "../styles/globals.css";
import "@wanin/ui/styles.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary, Layout, Provider } from "@/components";
import type { Session } from "next-auth";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function Web({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps<{ session: Session }>) {
  useEffect(() => {
    const routeChangeStart = () => NProgress.start();
    const routeChangeComplete = () => NProgress.done();

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);
    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
  }, []);
  return (
    <ErrorBoundary>
      <Provider session={session}>
        <Layout>
          <AnimatePresence mode="wait">
            <Component {...pageProps} />
          </AnimatePresence>
        </Layout>
      </Provider>
    </ErrorBoundary>
  );
}

export default Web;
