// lib/supabase-browser.ts
// Safe to import from client components.
// No next/headers, no service_role key.

import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function createBrowserSupabase() {
  if (!url || !anon) {
    throw new Error("Supabase env not set: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return createBrowserClient(url, anon);
}

export const supabaseConfigured = Boolean(url && anon);
