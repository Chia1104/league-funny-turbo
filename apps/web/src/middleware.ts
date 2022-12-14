import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NEXTAUTH_SECRET } from "@/shared/constants";
import { IS_PRODUCTION } from "@/shared/constants";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req, secret: NEXTAUTH_SECRET, raw: true });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/login");
    const isTestPage = req.nextUrl.pathname.startsWith("/test");

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/b", req.url));
      }
      return null;
    }

    if (isTestPage && IS_PRODUCTION) {
      return NextResponse.redirect(new URL("/b", req.url));
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      );
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/new-post", "/login", "/mailbox/:path*", "/test/:path*"],
};
