/**
 * Email Verification API — POST /api/email-verification
 *
 * Client calls this to get instant feedback on email quality before signup.
 * Returns the result of syntax, disposable, and MX checks.
 * SMTP handshake (reacherhq/API) is optional and slow — client skips it.
 *
 * Body: { email: string }
 * Response: EmailVerificationResult
 */

import { NextRequest, NextResponse } from "next/server";
import { verifyEmail } from "@/utils/email-verification/server";
import { checkRateLimit } from "@/utils/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limit: 10 checks per minute per IP
  const rateLimitResult = await checkRateLimit(req, "email-verify", {
    maxRequests: 10,
    windowMs: 60_000,
  });
  if (rateLimitResult) return rateLimitResult;

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const email = (body.email ?? "").trim();
  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  // Run full verification (async — all layers)
  const result = await verifyEmail(email);

  return NextResponse.json(result);
}
