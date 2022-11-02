"use client";

import { GeistProvider } from "@/components/client";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { type FC, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface Props {
  session: Session;
  children: ReactNode;
}

const Provider: FC<Props> = (props) => {
  const { children, session } = props;
  const queryClient = new QueryClient();
  return (
    <SessionProvider session={session}>
      <ThemeProvider enableSystem={true} attribute="class">
        <GeistProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </GeistProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
