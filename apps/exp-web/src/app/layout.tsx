import "./globals.css";
import "@wanin/ui/styles.css";
import { ErrorBoundary, MainNav, Provider } from "@/components/client";
import { getBaseUrl } from "@/utils/get-base-url";
import type { Session } from "next-auth";
import { headers } from "next/headers";
import { type ReactNode } from "react";

const getSession = async (cookie: string): Promise<Session> => {
  const response = await fetch(`${getBaseUrl()}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getSession(headers().get("cookie") ?? "");
  return (
    <html lang="en">
      <head>
        <title>League Funny</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="w-bg-primary scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full">
        <ErrorBoundary>
          <Provider session={session}>
            <MainNav />
            {children}
          </Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;