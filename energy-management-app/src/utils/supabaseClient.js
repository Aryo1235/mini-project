import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sbwxeegxwgafmazqabsq.supabase.co"; // Ganti dengan URL proyek Anda
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNid3hlZWd4d2dhZm1henFhYnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5Njg2MDIsImV4cCI6MjA0NjU0NDYwMn0.-s8yNEH88VYyRlI1WC6ED4UfkEY6J9kTi9lFjgH6oUM"; // Ganti dengan anon public key proyek Anda

export const supabase = createClient(supabaseUrl, supabaseKey);
