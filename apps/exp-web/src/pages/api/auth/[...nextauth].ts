import NextAuth, { Awaitable, NextAuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import FacebookProvider from "next-auth/providers/facebook";
import jwt from "jsonwebtoken";
import { laravelLogin } from "@/helpers/api/server-only";
import { ApiResponse, LaravelToken, LoginSession, User } from "@wanin/types";
import NodeCache from "node-cache";
import { JWT } from "next-auth/jwt";

const laravelCache = new NodeCache();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    async encode({ secret, token }) {
      const _laravelCache = laravelCache.get("laravelCache") as ApiResponse<{
        access: LaravelToken;
        refresh: LaravelToken;
        user: User;
      }>;
      return jwt.sign(
        {
          uid: _laravelCache?.data?.user.uid,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          ...token,
        },
        secret
      );
    },
    async decode({ secret, token }) {
      return jwt.verify(token as string, secret) as Awaitable<JWT>;
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      const loginSession: LoginSession = {
        loginBy: account?.provider === "facebook" ? "fb" : "twitch",
        id: user.id,
        email: user.email as string,
        name: user.name as string,
      };
      const result = await laravelLogin(loginSession);
      if (result.status !== "success") return false;
      laravelCache.set("laravelCache", result, 1000);
      return true;
    },
  },
};

export default NextAuth(authOptions);
