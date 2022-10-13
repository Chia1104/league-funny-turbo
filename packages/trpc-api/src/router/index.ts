import { t } from "../trpc";
import { userRouter } from "./user";
import { postRouter } from "./post";

export const appRouter = t.router({
  user: userRouter,
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
