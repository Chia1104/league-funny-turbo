import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter, createContext } from "@wanin/trpc-api";

export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
}) as any;
