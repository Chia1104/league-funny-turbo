import "../styles/globals.css";
import "@wanin/ui/styles.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary, GeistProvider, Layout } from "@/components";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Web({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps<{ session: Session }>) {
  const queryClient = new QueryClient();
  return (
    <ErrorBoundary>
      <DefaultSeo />
      <ThemeProvider enableSystem={true} attribute="class">
        <GeistProvider>
          <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <AnimatePresence mode="wait">
                  <Component {...pageProps} key={router.route} />
                </AnimatePresence>
              </Layout>
            </QueryClientProvider>
          </SessionProvider>
        </GeistProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Web;
