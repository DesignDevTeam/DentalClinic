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
    const email = formData.get("email");

    // Check if all required fields are present
    if (!title || !content || !desc || !file || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the user with the given email exists
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: "User with the provided email not found" },
        { status: 404 }
      );
    }

    // Generate a unique file name
    const uniqueId = uuidv4();
    const newFileName = `${uniqueId}-${file.name}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Check if the image already exists in storage
    const { data: existingImg } = await supabase.storage
      .from("post_imgs")
      .list("images", { search: newFileName });

    if (existingImg.length > 0) {
      return NextResponse.json(
        { error: "Image already exists in storage" },
        { status: 409 }
      );
    }

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
          author_id: userData.id, // Use the found user's ID
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
