import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && req.nextUrl.pathname === "/log-in") {
    return NextResponse.redirect(new URL("/list", req.url));
  }

  if (user && req.nextUrl.pathname === "/sign-up") {
    return NextResponse.redirect(new URL("/list", req.url));
  }

  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/list", req.url));
  }

  if (!user && req.nextUrl.pathname === "/list") {
    return NextResponse.redirect(new URL("/log-in", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/list", "/sign-up", "/log-in"],
};
