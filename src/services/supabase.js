import { createClient } from "@supabase/supabase-js";
export const supabaseUrl =
  "https://cfyjgkqrafybpgvsdpyr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmeWpna3FyYWZ5YnBndnNkcHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0NzM2NjUsImV4cCI6MjA0MjA0OTY2NX0.AEprIWeqsvUuO-TnhcJJBRoDteFW4ujCIUKEGoTSq98";
const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export default supabase;
