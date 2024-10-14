import { createClient } from "@supabase/supabase-js";

// Replace these values with your Supabase project URL and Service Role Key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // This key should have admin privileges
);

export { supabaseAdmin };
