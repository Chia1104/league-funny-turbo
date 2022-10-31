import { appRouter, createContext } from "@wanin/trpc-api";
import * as trpcNext from "@trpc/server/adapters/next";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
