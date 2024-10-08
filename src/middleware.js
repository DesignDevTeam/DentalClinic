// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./app/lib/supabase";

export async function middleware(req) {
  const token = req.cookies.get("access_token");
console.log('in midd ', token);
  const { data } = await supabase.auth.getUser(token?.value || "");

  if (!data.user) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
