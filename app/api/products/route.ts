// app/api/products/route.ts
// Public catalog — what the pricing pages render from.

import { NextResponse } from "next/server";
import { PRODUCT, formatPrice } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  const p = PRODUCT;
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
  return NextResponse.json({
    product: {
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      route: p.route,
      heroPhoto: p.heroPhoto,
      tiers,
    },
  });
}
