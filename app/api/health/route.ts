// app/api/health/route.ts
// Deep health check. Public.

import { NextResponse } from "next/server";
import { integrationsReport } from "@/lib/integrations";
import { PRODUCT } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "meridian-saas",
    version: "1.0.0",
    product: { id: PRODUCT.id, name: PRODUCT.name, tierCount: PRODUCT.tiers.length },
    integrations: integrationsReport(),
    uptime: process.uptime(),
  });
}
