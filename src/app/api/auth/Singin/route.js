// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
// import { supabaseAdmin } from "../../../lib/admin_supabase";
import { supabase } from "../../../lib/supabase";

export async function POST(request ) {
  const { email, password , username } = await request.json();

  // Validate input
  if (!email || !password ) {
    return NextResponse.json(
      { error: "Email, password are required" },
      { status: 400 }
    );
  }

  // Create user in Supabase authentication
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 500 });
  }

  const userId = authData.user?.id;

  // Insert into users table with foreign key to authentication
  const { data: userData, error: userError } = await supabase
    .from("users")
    .insert({ id: userId, username });

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 500 });
  }

  return NextResponse.json({
    message: "User created successfully",
    user: userData,
  });
}

// return 
// {
//     "message": "User created successfully",
//     "user": null
// }
