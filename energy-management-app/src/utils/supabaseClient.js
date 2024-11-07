import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-project-url.supabase.co"; // Ganti dengan URL proyek Anda
const supabaseKey = "sbp_1a30b0702e1fc03edb3e5b01336999f683133826"; // Ganti dengan anon public key proyek Anda

export const supabase = createClient(supabaseUrl, supabaseKey);
