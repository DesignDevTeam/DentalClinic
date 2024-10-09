// app/api/posts/[id]/route.ts
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();  // Fetch only one post

    if (error) throw error;

    return NextResponse.json({ post: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
