import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    // Parse the incoming form data
    const formData = await req.formData();

    // Extract fields from form data
    const title = formData.get("title");
    const content = formData.get("content");
    const desc = formData.get("desc");
    const file = formData.get("file");
    const author_id = formData.get("author_id");

    // Check if all required fields are present
    if (!title || !content || !desc || !file) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // problem when usging postman  

    // const token = req.cookies.get("access_token");
    // console.log("Token:", token);
    // if (!token) {
    //   return NextResponse.json(
    //     { error: "Authentication error: No user session" },
    //     { status: 401 }
    //   );
    // }

    // const respp = await supabase.auth.getUser(
    //   token?.value || ""
    // );
    // console.log("Session data:", respp);
    // if (authError || !session) {
    //   return NextResponse.json(
    //     { error: "Authentication error: Invalid user session" },
    //     { status: 401 }
    //   );}
    

    // Generate a unique file name
    const uniqueId = uuidv4();
    const newFileName = `${uniqueId}-${file.name}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the file to Supabase storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from("post_imgs")
      .upload(`images/${newFileName}`, buffer, {
        contentType: file.type,
      });

    if (storageError) {
      return NextResponse.json(
        { error: "Error uploading image to storage" },
        { status: 500 }
      );
    }

    // Get the public URL for the uploaded image
    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("post_imgs")
      .getPublicUrl(`images/${newFileName}`);

    if (publicUrlError) {
      return NextResponse.json(
        { error: "Error fetching public URL for the image" },
        { status: 500 }
      );
    }

    // Insert the post into the database
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .insert([
        {
          title,
          content,
          desc,
          author_id,
          image_url: publicUrlData.publicUrl,
        },
      ]);

    if (postError) {
      return NextResponse.json(
        { error: "Error creating the post" },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json({
      message: "Post created successfully",
      data: postData,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
