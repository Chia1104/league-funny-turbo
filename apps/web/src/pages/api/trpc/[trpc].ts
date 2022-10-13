import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter, createContext } from "@wanin/trpc-api";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      console.error("Something went wrong", error);
    }
  },
});
