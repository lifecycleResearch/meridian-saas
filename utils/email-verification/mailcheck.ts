/**
 * Email Verification — Layer 2: Client-Side Typo Detection
 *
 * Reimplements the mailcheck.js algorithm natively for Next.js (no deps).
 * Detects common email domain typos at signup time with zero API calls.
 *
 * Algorithm:
 *   1. Extract domain from email
 *   2. Compare against common email domains
 *   3. Calculate string distance
 *   4. If close but not exact match, suggest correction
 *
 * Based on the mailcheck.js approach by Derrick Ko (Kicksend).
 * Reimplemented for TypeScript / ESM compatibility.
 */

// Common email domains ordered by popularity
const COMMON_DOMAINS = [
  // Global
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com",
  "protonmail.com", "aol.com", "mail.com", "zoho.com", "yandex.com",
  "gmx.com", "fastmail.com", "tutanota.com", "proton.me",
  // US ISPs
  "comcast.net", "att.net", "verizon.net", "cox.net", "charter.net",
  // Regional
  "qq.com", "163.com", "126.com", "sina.com", "naver.com", "daum.net",
  "mail.ru", "rambler.ru", "wp.pl", "o2.pl", "seznam.cz",
  // Business
  "live.com", "msn.com", "me.com", "mac.com",
  // Education
  "edu.com",
];

// Known second-level domains (e.g., "co.uk", "com.au")
const SECOND_LEVEL_DOMAINS = [
  "yahoo.co.uk", "yahoo.co.jp", "yahoo.com.br", "yahoo.com.au",
  "hotmail.co.uk", "hotmail.fr", "live.co.uk", "live.fr",
  "gmail.co.uk",
];

const ALL_DOMAINS = [...COMMON_DOMAINS, ...SECOND_LEVEL_DOMAINS];

// Domains to never suggest (corporate, internal)
const BLOCKED_DOMAINS = new Set<string>();

export interface EmailSuggestion {
  /** The full suggested email address (user@suggested-domain.com) */
  full: string;
  /** The suggested domain only */
  domain: string;
  /** Original address for comparison */
  address: string;
}

/**
 * Calculate Sift3 distance — a fast, approximate string distance.
 * Optimized for catching typos, transpositions, and single-character errors.
 */
function sift3Distance(s1: string, s2: string, maxOffset: number = 5): number {
  if (!s1 || !s1.length) return s2?.length ?? 0;
  if (!s2 || !s2.length) return s1.length;

  let c = 0;
  let offset1 = 0;
  let offset2 = 0;
  let lcs = 0;

  while (c + offset1 < s1.length && c + offset2 < s2.length) {
    if (s1[c + offset1] === s2[c + offset2]) {
      lcs++;
    } else {
      offset1 = 0;
      offset2 = 0;
      for (let i = 0; i < maxOffset; i++) {
        if (c + i < s1.length && s2[c] !== undefined && s1[c + i] === s2[c]) {
          offset1 = i;
          break;
        }
        if (c + i < s2.length && s1[c] !== undefined && s2[c + i] === s1[c]) {
          offset2 = i;
          break;
        }
      }
    }
    c++;
  }
  return (s1.length + s2.length) / 2 - lcs;
}

/**
 * Extract the domain from an email address.
 */
export function extractDomain(email: string): string | null {
  const parts = email.trim().toLowerCase().split("@");
  if (parts.length !== 2) return null;
  return parts[1].trim() || null;
}

/**
 * Extract the local part (before @) from an email address.
 */
export function extractLocal(email: string): string | null {
  const parts = email.trim().toLowerCase().split("@");
  if (parts.length !== 2) return null;
  return parts[0].trim() || null;
}

/**
 * Check if a domain is a known disposable email provider.
 * Returns true if disposable (should be blocked).
 */
export function isDisposableDomain(domain: string): boolean {
  const d = domain.toLowerCase().trim();
  const disposables = [
    "mailinator.com", "guerrillamail.com", "10minutemail.com",
    "temp-mail.org", "throwaway.email", "sharklasers.com",
    "yopmail.com", "trashmail.com", "dispostable.com",
    "maildrop.cc", "getairmail.com", "tempmail.com",
    "emailondeck.com", "spam4.me", "grr.la", "guerrillamail.info",
    "guerrillamail.biz", "guerrillamail.org", "guerrillamail.net",
    "guerrillamail.de", "guerrillamailblock.com", "pokemail.net",
    "spam4.me", "fakeinbox.com", "tempinbox.com", "throwaway.email",
    "33mail.com", "anonaddy.com", "simplelogin.com",
  ];
  return disposables.includes(d);
}

/**
 * Run mailcheck against an email address.
 * Returns a suggestion if a likely typo is detected, or null if the address looks valid.
 */
export function suggestEmail(email: string): EmailSuggestion | null {
  if (!email || !email.includes("@")) return null;

  const domain = extractDomain(email);
  const local = extractLocal(email);
  if (!domain || !local) return null;

  // Skip if domain is already common
  const normalizedDomain = domain.toLowerCase().trim();
  if (ALL_DOMAINS.includes(normalizedDomain)) return null;
  if (BLOCKED_DOMAINS.has(normalizedDomain)) return null;

  // Check if it looks like a valid TLD (at least one dot, reasonable length)
  const domainParts = normalizedDomain.split(".");
  if (domainParts.length < 2) return null;
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2 || tld.length > 10) return null;

  let bestDomain: string | null = null;
  let bestDistance = Infinity;

  // Find the closest common domain
  for (const commonDomain of ALL_DOMAINS) {
    const distance = sift3Distance(normalizedDomain, commonDomain);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestDomain = commonDomain;
    }
  }

  // Threshold: only suggest if the distance is small (close miss)
  // and the domains share the same TLD or the distance is very small
  if (!bestDomain || bestDistance > 2) return null;

  // Don't suggest if the original is a subdomain of the suggestion
  if (normalizedDomain.endsWith("." + bestDomain)) return null;

  const suggestedEmail = `${local}@${bestDomain}`;

  // Don't return if the suggestion is the same
  if (suggestedEmail === email.toLowerCase().trim()) return null;

  return {
    full: suggestedEmail,
    domain: bestDomain,
    address: email,
  };
}
