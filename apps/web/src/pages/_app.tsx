import "../styles/globals.scss";
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
  UserIntro,
  UserAbout,
} from "@/components";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Page } from "@wanin/ui";

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
                  {router.pathname.includes("/user") ? (
                    <div className="w-container flex px-5">
                      <UserIntro querykey={"1"} />
                      <div className="user-page">
                        <UserAbout />
                        <div className="w-full">
                          <Page>
                            <Component {...pageProps} key={router.route} />
                          </Page>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Component {...pageProps} key={router.route} />
                  )}
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
