// app/app/page.tsx
// Mobile PWA shell. Uses the mobile-slide-module design system.
// All data fetched from /api/products at runtime (or build-time).

import { CATALOG } from "@/lib/catalog";
import { MobileAppShell } from "./MobileAppShell";

export const dynamic = "force-static";

export default function PwaPage() {
  // For the prototype, embed a curated subset of tiers as "moments".
  const moments = CATALOG
    .find(p => p.id === "voypath")!
    .tiers
    .map(t => ({
      id: t.id,
      name: t.name,
      price: `$${t.price / 100}`,
      tier: t.id,
      cat: t.id.split("-")[0],
    }));
  const recommended = CATALOG
    .find(p => p.id === "meridian")!
    .tiers
    .map(t => ({
      id: t.id,
      name: t.name,
      loc: "Boulder, Colorado",
      price: `$${t.price / 100}`,
      rating: 4.9,
      reviews: 234,
    }));

  return <MobileAppShell moments={moments} recommended={recommended} />;
}
