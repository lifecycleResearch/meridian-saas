/**
 * Email Verification — Server-Side Validation
 *
 * LAYER 3: Self-hosted reacherhq/check-if-email-exists (SMTP handshake)
 * LAYER 4: Free-tier API fallback (Abstract / ZeroBounce)
 *
 * Architecture:
 *   1. Syntax check (fast, always runs)
 *   2. Disposable domain check (fast, always runs)
 *   3. MX record check (DNS lookup, always runs)
 *   4. SMTP handshake via reacherhq (self-hosted, primary)
 *   5. API fallback if reacherhq is unreachable (Abstract / ZeroBounce)
 *
 * All checks beyond syntax are fire-and-forget from the signup path —
 * the user gets through signup quickly, and the verification result
 * is stored for downstream enforcement.
 */

const DNS_TIMEOUT_MS = 3000;
const REACHER_TIMEOUT_MS = 5000;
const API_TIMEOUT_MS = 5000;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EmailVerificationResult {
  email: string;
  valid_syntax: boolean;
  disposable: boolean;
  mx_accepts: boolean | null; // null = couldn't check
  smtp_verified: boolean | null; // null = couldn't check
  catch_all: boolean | null;
  risk: "low" | "medium" | "high" | "invalid";
  details: string[];
  verified_at: string; // ISO timestamp
  provider: "none" | "reacherhq" | "abstract" | "zerobounce";
}

// ---------------------------------------------------------------------------
// Syntax check (regex + structural validation)
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function checkSyntax(email: string): { valid: boolean; reason?: string } {
  if (!email || email.length > 254) {
    return { valid: false, reason: "Email too long (>254 chars)" };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, reason: "Invalid email format" };
  }
  const [local, domain] = email.split("@");
  if (local.length > 64) {
    return { valid: false, reason: "Local part too long (>64 chars)" };
  }
  if (domain.length > 253) {
    return { valid: false, reason: "Domain too long (>253 chars)" };
  }
  // Check for consecutive dots
  if (local.includes("..") || domain.includes("..")) {
    return { valid: false, reason: "Consecutive dots not allowed" };
  }
  // Domain must have at least one dot (TLD)
  if (!domain.includes(".")) {
    return { valid: false, reason: "Missing TLD in domain" };
  }
  const tld = domain.split(".").pop()!;
  if (tld.length < 2) {
    return { valid: false, reason: "TLD too short" };
  }
  return { valid: true };
}

// ---------------------------------------------------------------------------
// Disposable email detection (comprehensive server-side list)
// ---------------------------------------------------------------------------

// Curated from multiple sources — regularly updated
const DISPOSABLE_DOMAINS = new Set([
  // Major disposable services
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "10minutemail.net",
  "temp-mail.org", "throwaway.email", "sharklasers.com", "yopmail.com",
  "trashmail.com", "dispostable.com", "maildrop.cc", "getairmail.com",
  "tempmail.com", "emailondeck.com", "spam4.me", "grr.la",
  "guerrillamail.info", "guerrillamail.biz", "guerrillamail.org",
  "guerrillamail.net", "guerrillamail.de", "guerrillamailblock.com",
  "pokemail.net", "fakeinbox.com", "tempinbox.com", "33mail.com",
  "anonaddy.com", "simplelogin.com",
  // Extended list
  "tmpmail.org", "tmpmail.net", "moakt.com", "mohmal.com", "emailfake.com",
  "emailtemporanea.net", "getnada.com", "inboxalias.com", "mailcatch.com",
  "mintemail.com", "mytrashmail.com", "spambox.us", "teepmail.com",
  "tempmail.net", "tempmail.de", "throwawaymail.com", "trashmail.de",
  "mailnesia.com", "spamgourmet.com", "spambog.com", "spambog.de",
  "spambog.ru", "discard.email", "discardmail.com", "discardmail.de",
  "mailmetrash.com", "thankyou2010.com", "trash2009.com", "mt2009.com",
  "trashymail.com", "tyldd.com", "uggsrock.com", "wegwerfmail.de",
  "wegwerfmail.net", "wegwerfmail.org", "wh4f.org", "whyspam.me",
  "willselfdestruct.com", "winemaven.info", "wronghead.com",
  "wuzup.net", "xagloo.com", "xemaps.com", "xents.com", "xmaily.com",
  "xoxy.net", "yep.it", "yogamaven.com", "yopmail.fr", "yopmail.net",
  "ypmail.webarnak.fr.eu.org", "yuurok.com", "zehnminutenmail.de",
  "zippymail.info", "zoaxe.com", "zoemail.org",
]);

export function isDisposableServer(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}

// ---------------------------------------------------------------------------
// MX Record check (DNS lookup — runs on Node.js with dns.promises)
// ---------------------------------------------------------------------------

let dnsPromises: typeof import("dns").promises | null = null;

async function checkMX(domain: string): Promise<boolean | null> {
  try {
    if (!dnsPromises) {
      dnsPromises = (await import("dns")).promises;
    }
    const records = await Promise.race([
      dnsPromises.resolveMx(domain),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("DNS timeout")), DNS_TIMEOUT_MS)
      ),
    ]);
    return Array.isArray(records) && records.length > 0;
  } catch {
    return null; // couldn't determine
  }
}

// ---------------------------------------------------------------------------
// Reacherhq/check-if-email-exists (self-hosted SMTP handshake)
// ---------------------------------------------------------------------------

const REACHER_URL = process.env.REACHERHQ_URL || ""; // e.g. http://reacher:8080

async function checkReacherhq(email: string): Promise<{
  verified: boolean | null;
  catch_all: boolean | null;
  details: string[];
}> {
  if (!REACHER_URL) {
    return { verified: null, catch_all: null, details: ["reacherhq: not configured"] };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REACHER_TIMEOUT_MS);

    const response = await fetch(`${REACHER_URL}/v0/check_email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to_email: email,
        from_email: "verify@openfans.online",
        hello_name: "openfans.online",
        smtp_port: 25,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return {
        verified: null,
        catch_all: null,
        details: [`reacherhq: HTTP ${response.status}`],
      };
    }

    const data = await response.json();
    const isReachable = data.is_reachable === "safe" || data.is_reachable === "risky";
    const isCatchAll = data.is_catch_all === true;

    return {
      verified: isReachable ? true : data.is_reachable === "invalid" ? false : null,
      catch_all: isCatchAll,
      details: [
        `reacherhq: reachable=${data.is_reachable}, catch_all=${data.is_catch_all}`,
      ],
    };
  } catch (err) {
    return {
      verified: null,
      catch_all: null,
      details: [`reacherhq: error — ${err instanceof Error ? err.message : "unknown"}`],
    };
  }
}

// ---------------------------------------------------------------------------
// Free-tier API fallback (Abstract API)
// ---------------------------------------------------------------------------

const ABSTRACT_API_KEY = process.env.ABSTRACT_EMAIL_API_KEY || "";

async function checkAbstractAPI(email: string): Promise<{
  verified: boolean | null;
  details: string[];
}> {
  if (!ABSTRACT_API_KEY) {
    return { verified: null, details: ["abstract: not configured"] };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&email=${encodeURIComponent(email)}`,
      { signal: controller.signal }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      return {
        verified: null,
        details: [`abstract: HTTP ${response.status}`],
      };
    }

    const data = await response.json();
    // deliverability: "DELIVERABLE" | "UNDELIVERABLE" | "RISKY" | "UNKNOWN"
    const isDeliverable = data.deliverability === "DELIVERABLE";
    const quality = ((data as any).quality_score ?? "0").toString();

    return {
      verified: isDeliverable ? true : data.deliverability === "UNDELIVERABLE" ? false : null,
      details: [
        `abstract: deliverability=${data.deliverability}, score=${quality}`,
      ],
    };
  } catch (err) {
    return {
      verified: null,
      details: [`abstract: error — ${err instanceof Error ? err.message : "unknown"}`],
    };
  }
}

// ---------------------------------------------------------------------------
// Main verification orchestrator
// ---------------------------------------------------------------------------

/**
 * Verify an email address using all configured layers.
 *
 * Layers executed (fast path → deep verification):
 *   1. Syntax check (always, blocking)
 *   2. Disposable domain check (always, blocking)
 *   3. MX record check (always, blocking, 3s timeout)
 *   4. reacherhq SMTP handshake (if REACHERHQ_URL configured, 5s timeout)
 *   5. Abstract API fallback (if ABSTRACT_EMAIL_API_KEY set, 5s timeout)
 *
 * Use in signup flow as an async fire-and-forget: call after the Supabase
 * signUp completes, store the result, and enforce downstream (e.g., require
 * verified email before payouts, creator claims, or sensitive operations).
 */
export async function verifyEmail(
  email: string
): Promise<EmailVerificationResult> {
  const details: string[] = [];
  const normalized = email.toLowerCase().trim();

  // Layer 1: Syntax
  const syntaxResult = checkSyntax(normalized);
  if (!syntaxResult.valid) {
    return {
      email: normalized,
      valid_syntax: false,
      disposable: false,
      mx_accepts: null,
      smtp_verified: null,
      catch_all: null,
      risk: "invalid",
      details: [syntaxResult.reason!],
      verified_at: new Date().toISOString(),
      provider: "none",
    };
  }
  details.push("syntax: valid");

  // Layer 2: Disposable domain
  const disposable = isDisposableServer(normalized);
  details.push(`disposable: ${disposable ? "YES" : "no"}`);

  // Layer 3: MX check
  const domain = normalized.split("@")[1];
  const mxAccepts = await checkMX(domain);
  details.push(`mx: ${mxAccepts === null ? "unknown" : mxAccepts ? "accepts" : "no MX records"}`);

  if (mxAccepts === false) {
    return {
      email: normalized,
      valid_syntax: true,
      disposable,
      mx_accepts: false,
      smtp_verified: null,
      catch_all: null,
      risk: "high",
      details,
      verified_at: new Date().toISOString(),
      provider: "none",
    };
  }

  // Layer 4: reacherhq (self-hosted)
  const reacherResult = await checkReacherhq(normalized);
  details.push(...reacherResult.details);

  let smtpVerified = reacherResult.verified;
  let catchAll = reacherResult.catch_all;
  let provider: EmailVerificationResult["provider"] = "none";

  if (smtpVerified !== null) {
    provider = "reacherhq";
  }

  // Layer 5: Abstract API fallback (only if reacherhq didn't respond)
  if (smtpVerified === null) {
    const abstractResult = await checkAbstractAPI(normalized);
    details.push(...abstractResult.details);
    if (abstractResult.verified !== null) {
      smtpVerified = abstractResult.verified;
      provider = "abstract";
    }
  }

  // Risk assessment
  let risk: EmailVerificationResult["risk"] = "low";
  if (disposable) risk = "high";
  else if (smtpVerified === false) risk = "high";
  else if (smtpVerified === null && mxAccepts === null) risk = "medium";
  else if (catchAll) risk = "medium";

  return {
    email: normalized,
    valid_syntax: true,
    disposable,
    mx_accepts: mxAccepts,
    smtp_verified: smtpVerified,
    catch_all: catchAll,
    risk,
    details,
    verified_at: new Date().toISOString(),
    provider,
  };
}

/**
 * Quick check — lightweight version that only runs syntax + disposable.
 * Use when you need an instant answer and don't want to wait for DNS/SMTP.
 */
export function quickCheck(email: string): {
  valid: boolean;
  disposable: boolean;
  reason?: string;
} {
  const normalized = email.toLowerCase().trim();
  const syntaxResult = checkSyntax(normalized);
  if (!syntaxResult.valid) {
    return { valid: false, disposable: false, reason: syntaxResult.reason };
  }
  return {
    valid: true,
    disposable: isDisposableServer(normalized),
  };
}
