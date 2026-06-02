// app/api/health/route.ts
// Deep health check. Public.

import { NextResponse } from "next/server";
import { integrationsReport } from "@/lib/integrations";
import { CATALOG } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "meridian-saas",
    version: "1.0.0",
    products: CATALOG.length,
    tiers: CATALOG.reduce((n, p) => n + p.tiers.length, 0),
    integrations: integrationsReport(),
    uptime: process.uptime(),
  });
}
