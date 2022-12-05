import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      admin_id: number;
      ban: number;
    } & DefaultSession["user"];
  }
  interface JWT {
    a: number;
    b: number;
  }
}
