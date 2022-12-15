import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { type FC, type ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDarkMode, useIsMounted } from "@/hooks";
import { GeistProvider as GP } from "@geist-ui/core";
import { DefaultSeo } from "next-seo";
import { TokenProvider } from "@/components";

interface Props {
  session: Session;
  children: ReactNode;
}

const GeistProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  const isMounted = useIsMounted();

  return (
    <GP themeType={isMounted && isDarkMode ? "dark" : "light"}>{children}</GP>
  );
};

const Provider: FC<Props> = (props) => {
  const { children, session } = props;
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider session={session}>
      <DefaultSeo />
      <ThemeProvider enableSystem={true} attribute="class">
        <GeistProvider>
          <QueryClientProvider client={queryClient}>
            <TokenProvider>{children}</TokenProvider>
          </QueryClientProvider>
        </GeistProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
