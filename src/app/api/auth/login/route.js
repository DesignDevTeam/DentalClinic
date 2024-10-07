// app/api/auth/login/route.js
import { supabase } from "../../../lib/supabase";
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { email, password } = await request.json();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const token = data.session?.access_token;
  console.log(token);
  // Use httpOnly cookie to store token securely
  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('access_token', token, { httpOnly: true, secure: true });
  
  return response;
}