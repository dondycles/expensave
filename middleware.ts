import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  switch (req.nextUrl.pathname) {
    case "/log-in":
      if (user) {
        return NextResponse.redirect(new URL("/list", req.url));
      }
      break;
    case "/sign-up":
      if (user) {
        return NextResponse.redirect(new URL("/list", req.url));
      }
      break;
    case "/":
      if (user) {
        return NextResponse.redirect(new URL("/list", req.url));
      }
      break;
    case "/list":
      if (!user) {
        return NextResponse.redirect(new URL("/log-in", req.url));
      }
      break;
    case "/activity":
      if (!user) {
        return NextResponse.redirect(new URL("/log-in", req.url));
      }
      break;
  }

  return res;
}

export const config = {
  matcher: ["/", "/list", "/sign-up", "/log-in", "/activity"],
};
