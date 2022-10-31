import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  getUser: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});
