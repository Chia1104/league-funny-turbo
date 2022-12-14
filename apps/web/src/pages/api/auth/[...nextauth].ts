import NextAuth, { type Awaitable, type NextAuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import FacebookProvider from "next-auth/providers/facebook";
import jwt from "jsonwebtoken";
import { laravelLogin } from "@/helpers/api/routes/auth";
import {
  type LoginSession,
  type User,
  LoginProvider,
  ApiResponseStatus,
} from "@wanin/shared/types";
import { type IApiResponse } from "@/utils/fetcher.util";
import { loginSessionSchema } from "@wanin/shared/utils/zod-schema";
import type { JWT } from "next-auth/jwt";
import NodeCache from "node-cache";
import {
  NEXTAUTH_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  TWITCH_CLIENT_SECRET,
  TWITCH_CLIENT_ID,
  TOKEN_EXPIRE,
  IS_PRODUCTION,
} from "@/shared/constants";

const laravelCache = new NodeCache();
const CACHE_TTL = 1000; // 1 second

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  useSecureCookies: IS_PRODUCTION,
  providers: [
    FacebookProvider({
      clientId: FACEBOOK_ID as string,
      clientSecret: FACEBOOK_SECRET as string,
    }),
    TwitchProvider({
      clientId: TWITCH_CLIENT_ID as string,
      clientSecret: TWITCH_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt", maxAge: TOKEN_EXPIRE },
  jwt: {
    maxAge: TOKEN_EXPIRE,
    async encode({ secret, token }) {
      const _laravelCache = laravelCache.get(
        token?.email || "laravelCache"
      ) as IApiResponse<User>;
      return jwt.sign(
        {
          id: _laravelCache?.data?.uid,
          a: _laravelCache?.data?.admin_id,
          b: _laravelCache?.data?.ban,
          name: _laravelCache?.data?.u_name,
          exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRE,
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
        loginBy:
          account?.provider === "facebook"
            ? LoginProvider.FB
            : LoginProvider.TWITCH,
        id: user.id,
        email: user.email as string,
        name: user.name as string,
        imgUrl: user.image as string,
      };
      if (!loginSessionSchema.safeParse(loginSession).success) return false;
      const result = await laravelLogin(loginSession);
      if (result.status !== ApiResponseStatus.SUCCESS) return false;
      laravelCache.set(user.email as string, result, CACHE_TTL);
      return true;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user = {
          id: token?.id?.toString() ?? session.user.id,
          admin_id: token.a as number,
          ban: token.b as number,
          name: token.name,
          email: token.email,
          image: session.user.image,
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
