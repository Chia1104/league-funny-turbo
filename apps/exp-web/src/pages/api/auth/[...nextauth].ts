import NextAuth, { NextAuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import FacebookProvider from "next-auth/providers/facebook";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@wanin/db";

export const authOptions: NextAuthOptions = {
  // callbacks: {
  //   session({ session, user }) {
  //     if (session.user) {
  //       // @ts-ignore
  //       session.user.id = user.id;
  //     }
  //     return session;
  //   },
  // },
  // adapter: PrismaAdapter(prisma),
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  // },
  // session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
