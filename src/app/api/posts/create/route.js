import { supabase } from "../../../lib/supabase"; // Update the import path based on your project structure

export async function POST(request) {
  try {
    // Parse the incoming request body
    const { title, content, author } = await request.json();

    if (!title || !content || !author) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    // Insert the new post into the Supabase database
    const { data, error } = await supabase.from("posts").insert([
      {
        title,
        content,
        author,
        slug: title.toLowerCase().replace(/ /g, "-"),
      },
    ]);

    // Handle any errors from Supabase
    if (error) {
      console.error("Error inserting post:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    // Return a success response
    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    console.error("Error in POST request:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
