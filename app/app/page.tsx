// app/app/page.tsx
// Meridian mobile PWA — slide-module design.

import { PRODUCT, formatPrice } from "@/lib/catalog";
import { MeridianPwa } from "./MeridianPwa";

export const dynamic = "force-static";

export default function PwaPage() {
  const product = PRODUCT; // Meridian

  // Tier → "moment" card. Use the tier id as a stable photo key.
  const moments = PRODUCT.tiers.map(t => ({
    id: t.id,
    name: t.name,
    price: formatPrice(t.price, t.interval),
    tier: t.id,
    description: t.description,
    tagline: t.features[0] || t.description,
  }));

  return <MeridianPwa moments={moments} productName={product.name} tagline={`${product.tagline.serif} ${product.tagline.script}`} />;
}
