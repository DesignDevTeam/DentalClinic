import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./app/lib/supabase";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// next-intl middleware (for internationalization) translation
const intlMiddleware = createMiddleware(routing);

export async function middleware(req) {
  // Check if it's an admin route, and handle authentication first
  if (req.nextUrl.pathname.includes("/admin")) {
    console.log("in admin");

    const token = req.cookies.get("access_token");
    const { data } = await supabase.auth.getUser(token?.value || "");
    console.log(data);

    if (!data.user) {
      return NextResponse.redirect(new URL("/en", req.url));
    }
  }

  // If it's not an admin route, handle the internationalized routes
  const intlResponse = intlMiddleware(req);
  console.log("in long");

  if (intlResponse) return intlResponse;

  // If both middlewares pass, proceed to the next handler
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // Handle homepage
    "/(ar|en|fr)/:path*", // Internationalized routes
    "/(ar|en|fr):path*", // Admin routes for authentication
  ],
};
