// Resend email client (server-only)
import { Resend } from "resend";

const key = process.env.RESEND_API_KEY || "";
const LEAD_NOTIFY_EMAIL = process.env.LEAD_NOTIFY_EMAIL || "hello@clientretentionservice.com";

export const resend = key ? new Resend(key) : null;
export const resendConfigured = Boolean(resend);
export const leadNotifyEmail = LEAD_NOTIFY_EMAIL;
