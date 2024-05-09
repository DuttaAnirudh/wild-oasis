import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseUrl = "https://khqyahuhuknuctbwujqy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtocXlhaHVodWtudWN0Ynd1anF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwOTQ4NzQsImV4cCI6MjAzMDY3MDg3NH0.9Lmz_dtJBruYA6ntIqqjW1opgsJcLermxH0IAPYfY6I";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
