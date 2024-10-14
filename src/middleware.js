import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./app/lib/supabase";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

//  next-intl middleware (for internationalization) translation 
const intlMiddleware = createMiddleware(routing);

export async function middleware(req) {
  //   handling the internationalized routes
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  //  auth middleware for "/admin" routes
  const token = req.cookies.get("access_token");
  const { data } = await supabase.auth.getUser(token?.value || "");

  if (!data.user && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If both middlewares pass, next handler
  return NextResponse.next();
}

export const config = {
 //both middlewares
  matcher: [
    "/",               // Handle homepage
    "/(ar|en|fr)/:path*", // Internationalized routes
    "/admin/:path*",    // Admin routes for authentication
  ],
};
