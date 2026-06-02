// app/api/products/route.ts
// Public catalog — what the pricing pages render from.

import { NextResponse } from "next/server";
import { CATALOG, formatPrice } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  // Hydrate with Stripe price IDs (if Stripe configured)
  const products = await Promise.all(
    CATALOG.map(async (p) => {
      const tiers = p.tiers.map((t) => ({
        id: t.id,
        name: t.name,
        price: t.price,
        formatted: formatPrice(t.price, t.interval),
        interval: t.interval,
        description: t.description,
        features: t.features,
        highlight: t.highlight,
        cta: t.cta,
      }));
      return {
        id: p.id,
        name: p.name,
        tagline: p.tagline,
        description: p.description,
        route: p.route,
        accent: p.accent,
        heroPhoto: p.heroPhoto,
        tiers,
      };
    })
  );

  return NextResponse.json({ products });
}
