import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter, createContext } from "@wanin/trpc-api";

// @ts-ignore
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
