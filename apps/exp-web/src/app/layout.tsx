import "./globals.css";
import "@wanin/ui/styles.css";
import { ErrorBoundary, MainNav, Provider } from "@/components/client";
import { type Session, unstable_getServerSession } from "next-auth";
import { type ReactNode } from "react";
import { authOptions as nextAuthOptions } from "@/pages/api/auth/[...nextauth]";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await unstable_getServerSession(nextAuthOptions);
  return (
    <html lang="zh_tw">
      <body className="w-bg-primary scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full">
        <ErrorBoundary>
          <Provider session={session as Session}>
            <MainNav />
            {children}
          </Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;
