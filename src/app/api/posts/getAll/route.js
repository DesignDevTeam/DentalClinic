import { supabase } from "../../../lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("posts").select("*");

  console.log(data);

  if (error) {
    console.error("Error fetching posts:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
