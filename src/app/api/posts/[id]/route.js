// app/api/posts/[id]/route.ts
import { NextResponse } from "next/server";
import {supabase } from "../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    // Query the post by its ID
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching post" }, { status: 500 });
  }
}

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

export async function PUT(req, { params }) {
  const { id:postId } = params;
  try {
    // Parse the incoming form data
    const formData = await req.formData();
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Fetch existing post data to retain non-updated fields
    const { data: existingPost, error: fetchError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (fetchError || !existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Extract fields from the form data
    const title = formData.get("title") || existingPost.title;
    const content = formData.get("content") || existingPost.content;
    const desc = formData.get("desc") || existingPost.desc;
    const file = formData.get("file");

    let image_url = existingPost.image_url; // Default to existing image URL

    if (file) {
      // Generate a unique filename using UUID
      const uniqueId = uuidv4();
      const newFileName = `${uniqueId}-${file.name}`;

      // Convert file to buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Check if the image already exists in storage
      const { data: existingFile, error: existingFileError } =
        await supabase.storage
          .from("post_imgs")
          .list("images", { search: newFileName });

      if (existingFileError) {
        return NextResponse.json(
          { error: "Error checking existing image" },
          { status: 500 }
        );
      }

      if (existingFile && existingFile.length > 0) {
        return NextResponse.json(
          { error: "Image already exists in storage" },
          { status: 400 }
        );
      }

      // Upload the new file to Supabase storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from("post_imgs")
        .upload(`images/${newFileName}`, buffer, {
          contentType: file.type,
        });

      if (storageError) {
        return NextResponse.json(
          { error: "Error uploading image" },
          { status: 500 }
        );
      }

      // Get the public URL for the uploaded image
      const { data: publicUrlData, error: publicUrlError } = supabase.storage
        .from("post_imgs")
        .getPublicUrl(`images/${newFileName}`);

      if (publicUrlError) {
        return NextResponse.json(
          { error: "Error fetching public image URL" },
          { status: 500 }
        );
      }

      image_url = publicUrlData.publicUrl; // Update image URL with new image
    }

    // Update the post with the provided fields
    const { data: updatedPost, error: postError } = await supabase
      .from("posts")
      .update({ title, content, desc, image_url })
      .eq("id", postId);

    if (postError) {
      return NextResponse.json(
        { error: "Error updating post" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}