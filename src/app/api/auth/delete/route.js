import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { supabaseAdmin } from "../../../lib/admin_supabase";

export async function DELETE(req) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    // Get user based on token
    const { data: session, error: sessionError } = await supabaseAdmin.auth.getUser(
      token
    );
    if (sessionError || !session.user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Delete the user from the custom 'users' table first
    const { error: userDeleteError } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);
    if (userDeleteError) throw userDeleteError;

    // Then delete the user from the Supabase auth table
    const { error: authDeleteError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authDeleteError) throw authDeleteError;

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
