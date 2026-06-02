// lib/supabase-server.ts
// Server-only. Uses next/headers and service_role key.
// Do NOT import from client components.

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // server component can't set; cookie will be set on next request
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {}
      },
    },
  });
}

export function createAdminSupabase() {
  if (!serviceRole) return null;
  return createClient(url, serviceRole, { auth: { persistSession: false } });
}

export const supabaseAdminConfigured = Boolean(serviceRole);
