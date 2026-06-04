// Integrations status — surfaced in /api/health.
import { stripeConfigured, stripeRead } from "./stripe";
import { supabaseAdminConfigured } from "./supabase-server";
import { supabaseConfigured } from "./supabase-browser";
import { sesConfigured } from "@/utils/email/ses";

export function integrationsReport() {
  return {
    stripe: {
      write: stripeConfigured,
      read: Boolean(stripeRead),
    },
    supabase: {
      public: supabaseConfigured,
      admin: supabaseAdminConfigured,
    },
    ses: sesConfigured(),
  };
}
