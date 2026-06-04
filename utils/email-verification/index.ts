/**
 * Email Verification — Barrel Export
 *
 * LAYER 1: Supabase email confirmation (config in actions.ts)
 * LAYER 2: Client-side typo detection (mailcheck.ts)
 * LAYER 3: Self-hosted SMTP verification via reacherhq (server.ts)
 * LAYER 4: Free-tier API fallback (Abstract/ZeroBounce) (server.ts)
 */

// Client-side (safe for browser import)
export { suggestEmail, isDisposableDomain, extractDomain } from "./mailcheck";
export type { EmailSuggestion } from "./mailcheck";

// Server-side only (uses Node.js dns module)
export {
  verifyEmail,
  quickCheck,
  isDisposableServer,
} from "./server";
export type { EmailVerificationResult } from "./server";
