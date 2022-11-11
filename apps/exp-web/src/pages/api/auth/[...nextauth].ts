import NextAuth, { NextAuthOptions } from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import FacebookProvider from "next-auth/providers/facebook";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { Redis } from "@upstash/redis";
import jwt from "jsonwebtoken";

const redis = new Redis({
  // @ts-ignore
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
});

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
  adapter: UpstashRedisAdapter(redis),
  session: { strategy: "jwt" },
  jwt: {
    async encode({ secret, token }) {
      return jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          ...token,
        },
        secret
      );
    },
    // @ts-ignore
    async decode({ secret, token }) {
      return jwt.verify(token as string, secret);
    },
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("signIn", user, account, profile, email, credentials);
    //   return true;
    // },
    // async session({ session, token, user }) {
    //   console.log("session", session, token, user);
    //   return session;
    // },
    // async jwt({ token, account }) {
    //   console.log("jwt", token, account);
    //   return token;
    // },
  },
};

export default NextAuth(authOptions);
