import "../styles/globals.css";
import "@wanin/ui/styles.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import {
  ErrorBoundary,
  MainNav,
  MainEdit,
  GeistProvider,
  Layout,
  Footer,
} from "@/components";
import { ThemeProvider } from "next-themes";
import { trpcSSR } from "@/utils/trpc.util";
import { DefaultSeo } from "next-seo";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

function Web({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps<{ session: Session }>) {
  return (
    <ErrorBoundary>
      <DefaultSeo />
      <ThemeProvider enableSystem={true} attribute="class">
        <GeistProvider>
          <SessionProvider session={session}>
            <MainNav />
            <MainEdit className="fixed bottom-0 right-0 mr-5 mb-5 md:mr-10 md:mb-10" />
            <Layout title="League Funny" description="League Funny">
              <AnimatePresence mode="wait">
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </Layout>
            <Footer />
          </SessionProvider>
        </GeistProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default trpcSSR.withTRPC(Web);
