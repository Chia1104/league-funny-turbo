"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { type FC, type ReactNode } from "react";

const NextAuthSession: FC<{ session: Session; children: ReactNode }> = ({
  session,
  children,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextAuthSession;
