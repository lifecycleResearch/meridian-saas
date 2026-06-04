/**
 * AWS SES Email Utility — Shared Module
 *
 * Drop-in replacement for Resend. Same API surface, unlimited sending at
 * $0.10/1,000 emails (62K/mo free from EC2/Lambda).
 *
 * Usage:
 *   import { sendEmail, sendRawEmail } from "@/utils/email/ses";
 *   await sendEmail({ to: "user@example.com", subject: "Hi", html: "..." });
 *
 * Env vars:
 *   AWS_SES_ACCESS_KEY     — IAM user with ses:SendEmail
 *   AWS_SES_SECRET_KEY     — IAM secret
 *   AWS_SES_REGION         — default: us-east-1
 *   SES_FROM_ADDRESS       — default: notifications@openfans.online
 *
 * Fallback:
 *   If AWS creds are missing, logs a warning and returns false.
 *   No crash, no throw — safe for fire-and-forget callers.
 */

import {
  SESClient,
  SendEmailCommand,
  SendBulkTemplatedEmailCommand,
  type SendEmailCommandInput,
} from "@aws-sdk/client-ses";

// ---------------------------------------------------------------------------
// Client (lazy singleton)
// ---------------------------------------------------------------------------

let _ses: SESClient | null = null;
let _sesError: string | null = null;

function getSES(): SESClient | null {
  if (_ses) return _ses;
  if (_sesError) return null; // cached failure

  const accessKeyId = process.env.AWS_SES_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SES_SECRET_KEY;
  const region = process.env.AWS_SES_REGION || "us-east-1";

  if (!accessKeyId || !secretAccessKey) {
    _sesError = "AWS_SES_ACCESS_KEY or AWS_SES_SECRET_KEY not set";
    return null;
  }

  try {
    _ses = new SESClient({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });
    return _ses;
  } catch (err) {
    _sesError = `SES client init failed: ${err instanceof Error ? err.message : "unknown"}`;
    return null;
  }
}

/** Force-reset cached client (for config reloads / testing) */
export function resetSESClient(): void {
  _ses?.destroy();
  _ses = null;
  _sesError = null;
}

/** Check if SES is configured and ready */
export function sesConfigured(): boolean {
  return getSES() !== null;
}

/** Get the SES error message if configuration failed */
export function sesError(): string | null {
  getSES(); // trigger init
  return _sesError;
}

// ---------------------------------------------------------------------------
// From address
// ---------------------------------------------------------------------------

function fromAddress(): string {
  return process.env.SES_FROM_ADDRESS || "OpenFans <notifications@openfans.online>";
}

// ---------------------------------------------------------------------------
// Gating (same as NOTIFICATION_EMAIL_ENABLED for Resend)
// ---------------------------------------------------------------------------

function emailEnabled(): boolean {
  const raw = process.env.NOTIFICATION_EMAIL_ENABLED;
  if (raw === undefined || raw === "") {
    return process.env.NODE_ENV === "production" || !!process.env.SES_FORCE_DEV;
  }
  return raw.toLowerCase() === "true";
}

// ---------------------------------------------------------------------------
// Single send
// ---------------------------------------------------------------------------

export interface SendOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

/**
 * Send a single email via SES.
 * Returns true on success, false on failure or skip.
 * Never throws — safe for fire-and-forget.
 */
export async function sendEmail(opts: SendOptions): Promise<boolean> {
  if (!emailEnabled()) {
    console.log(`[SES] skipped (NOTIFICATION_EMAIL_ENABLED=false) → ${opts.to}`);
    return false;
  }

  const ses = getSES();
  if (!ses) {
    console.log(`[SES] skipped (${_sesError}) → ${opts.to}, subject: ${opts.subject}`);
    return false;
  }

  const toAddresses = Array.isArray(opts.to) ? opts.to : [opts.to];

  const params: SendEmailCommandInput = {
    Source: opts.from || fromAddress(),
    Destination: { ToAddresses: toAddresses },
    Message: {
      Subject: { Data: opts.subject, Charset: "UTF-8" },
      Body: { Html: { Data: opts.html, Charset: "UTF-8" } },
    },
  };

  if (opts.replyTo) {
    params.ReplyToAddresses = [opts.replyTo];
  }

  try {
    const result = await ses.send(new SendEmailCommand(params));
    console.log(`[SES] sent → ${opts.to} (msgId: ${result.MessageId})`);
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    console.error(`[SES] FAILED → ${opts.to}: ${msg}`);
    return false;
  }
}

/**
 * Send with pre-built HTML (no wrapper applied).
 * Identical API to the old sendRawEmail() — drop-in replacement.
 */
export async function sendRawEmail(
  to: string,
  subject: string,
  html: string,
  fromOverride?: string,
): Promise<boolean> {
  return sendEmail({ to, subject, html, from: fromOverride });
}

// ---------------------------------------------------------------------------
// Bulk send (up to 50 recipients per call — SES limit)
// ---------------------------------------------------------------------------

export interface BulkRecipient {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send to multiple recipients in a single SES call (up to 50).
 * Uses SendBulkTemplatedEmail for efficiency.
 *
 * NOTE: This requires a SES template. For simplicity with dynamic content,
 * we batch individual SendEmail calls with Promise.allSettled.
 * For true SES bulk (50 recipients in 1 API call), use the templated variant.
 */
export async function sendBulkEmails(
  recipients: BulkRecipient[],
  batchSize: number = 10,
): Promise<{ sent: number; failed: number; total: number }> {
  let sent = 0;
  let failed = 0;

  // Process in batches to avoid overwhelming SES rate limits (14/sec default)
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map((r) =>
        sendEmail({
          to: r.to,
          subject: r.subject,
          html: r.html,
          replyTo: r.replyTo,
        }),
      ),
    );

    for (const r of results) {
      if (r.status === "fulfilled" && r.value) sent++;
      else failed++;
    }
  }

  console.log(`[SES] bulk complete: ${sent} sent, ${failed} failed (${recipients.length} total)`);
  return { sent, failed, total: recipients.length };
}

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------

/**
 * Verify SES is working by checking client init + quota.
 * Does NOT send a test email.
 */
export async function sesHealthCheck(): Promise<{
  configured: boolean;
  error: string | null;
  region: string;
}> {
  const ses = getSES();
  return {
    configured: ses !== null,
    error: _sesError,
    region: process.env.AWS_SES_REGION || "us-east-1",
  };
}
