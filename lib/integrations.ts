// Integrations status — surfaced in /api/health.
import { stripeConfigured, stripeRead } from "./stripe";
import { supabaseAdminConfigured } from "./supabase-server";
import { supabaseConfigured } from "./supabase-browser";
import { resendConfigured } from "./resend";

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
    resend: resendConfigured,
  };
}
