import { createClient } from "@supabase/supabase-js";

// Ensure environment variables are loaded correctly
const supabaseUrl = "https://dzzrzxurigcilmrrfgai.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Use VITE_ for frontend env vars

export const supabase = createClient(supabaseUrl, supabaseKey);


