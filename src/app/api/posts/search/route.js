import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(req) {
  // Access search parameter from the URL
  const search = req.nextUrl.searchParams.get("search");

  try {
    if (!search) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Search across title, desc, and content using Supabase's `.ilike` for case-insensitive search
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .or(
        `title.ilike.%${search}%,desc.ilike.%${search}%,content.ilike.%${search}%`
      );

    if (error) {
      throw new Error("Error in search query");
    }

    return NextResponse.json({ posts: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
