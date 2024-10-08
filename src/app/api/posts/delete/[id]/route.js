// app/api/posts/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase"; 

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    // Delete the post from the database by its id
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
