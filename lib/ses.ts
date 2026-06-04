/**
 * Meridian SES adapter — thin wrapper around the shared SES module.
 * Drop-in replacement for the old Resend SDK (lib/resend.ts).
 */

import {
  sendEmail,
  sendRawEmail,
  sesConfigured,
  sesError,
} from "@/utils/email/ses";

const DEFAULT_FROM = "Meridian <hello@clientretentionservice.com>";
const leadNotifyEmail = process.env.LEAD_NOTIFY_EMAIL || "hello@clientretentionservice.com";

/** Send a lead notification */
export async function sendLeadNotification(opts: {
  name: string;
  email: string;
  phone?: string;
  brokerage?: string;
  notes?: string;
  plan?: string;
}): Promise<boolean> {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px;">
      <h2 style="color: #c9a84c;">New Meridian Lead</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Name</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${opts.name || "—"}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Email</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${opts.email}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Phone</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${opts.phone || "—"}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Brokerage</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${opts.brokerage || "—"}</td></tr>
        <tr><td style="padding:8px; border-bottom:1px solid #eee;"><strong>Plan</strong></td><td style="padding:8px; border-bottom:1px solid #eee;">${opts.plan || "—"}</td></tr>
        <tr><td style="padding:8px;"><strong>Notes</strong></td><td style="padding:8px;">${opts.notes || "—"}</td></tr>
      </table>
    </div>`;

  return sendEmail({
    to: leadNotifyEmail,
    subject: `New Lead: ${opts.name || "Unknown"}${opts.brokerage ? ` (${opts.brokerage})` : ""}`,
    html,
    from: DEFAULT_FROM,
  });
}

// Drop-in replacement exports (matching old lib/resend.ts surface)
export { sendEmail, sendRawEmail, sesConfigured, sesError };
export const ses = { sendEmail, sendRawEmail }; // object form for callers that use `ses.emails.send()`
export const sesConfiguredBool = sesConfigured;

// Backward compat: expose old names for gradual migration
export const resend = process.env.RESEND_API_KEY ? { emails: { send: async (opts: any) => {
  // Forward Resend-format calls to SES
  return sendEmail({
    to: opts.to,
    subject: opts.subject,
    html: opts.html || opts.text || "",
    from: opts.from || DEFAULT_FROM,
  });
}}} : null;
export const resendConfigured = Boolean(process.env.RESEND_API_KEY);
