
import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase"; 

export async function POST(req) {
  try {
    // Parse the incoming form data using the FormData API
    const formData = await req.formData();
    
    // Extract fields and file from form data
    const title = formData.get("title") ;
    const content = formData.get("content") ;
    // const author_id = formData.get("author_id") ;
    const desc = formData.get("desc") ;
    const file = formData.get("file") ;
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the file to Supabase storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from("post_imgs")
      .upload(`images/${file.name}`, buffer, {
        contentType: file.type,
      });

    if (storageError) throw storageError;

    // Get the public URL for the image
    const { data: publicUrlData, error: publicUrlError } = await supabase.storage
      .from("post_imgs")
      .getPublicUrl(`images/${file.name}`);

    if (publicUrlError) throw publicUrlError;

    // Insert the post into the database with the image URL
    const { data, error } = await supabase.from("posts").insert([
      {
        title,
        content,
        author_id: session.user.id, 
        desc,
        image_url: publicUrlData.publicUrl,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ message: "Post created successfully", data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
