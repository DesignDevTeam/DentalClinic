// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  const token = request.cookies.get("access_token")?.value;

  if (token) {
    // Invalidate Supabase session
    await supabase.auth.signOut();
  }

  // Clear the HTTP-only cookie
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.set("access_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return response;
}
