// scripts/stripe-sync.ts
// One-shot: read lib/catalog.ts, push every product + tier to Stripe as
// products + prices. Idempotent: uses lookup_keys to avoid duplicates.
//
// Run: npx tsx scripts/stripe-sync.ts
// or:  npm run stripe:sync

import { PRODUCT, type Tier } from "../lib/catalog";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("[stripe-sync] STRIPE_SECRET_KEY is required");
  process.exit(1);
}

const stripe = new Stripe(key, { apiVersion: "2024-11-20.acacia" as any });

async function getOrCreateProduct(product: typeof PRODUCT): Promise<Stripe.Product> {
  const existing = await stripe.products.search({
    query: `metadata["catalog_id"]:"${product.id}"`,
  });
  if (existing.data[0]) {
    console.log(`  [exists] ${product.id} -> ${existing.data[0].id}`);
    return existing.data[0];
  }
  const created = await stripe.products.create({
    name: product.name,
    description: product.description,
    metadata: { catalog_id: product.id, tagline: product.brand.promise, route: product.route },
  });
  console.log(`  [create] ${product.id} -> ${created.id}`);
  return created;
}

async function getOrCreatePrice(product: Stripe.Product, tier: Tier): Promise<Stripe.Price | null> {
  if (tier.price === 0) {
    console.log(`  [skip]   ${tier.id} (free)`);
    return null;
  }
  const existing = await stripe.prices.list({ lookup_keys: [tier.id], limit: 1 });
  if (existing.data[0]) {
    const p = existing.data[0];
    if (p.unit_amount === tier.price && p.currency === "usd") {
      console.log(`  [exists] ${tier.id} -> ${p.id}`);
      return p;
    }
    console.log(`  [mismatch] ${tier.id}: existing ${p.unit_amount} != new ${tier.price}`);
  }
  const created = await stripe.prices.create({
    product: product.id,
    unit_amount: tier.price,
    currency: "usd",
    lookup_key: tier.id,
    nickname: `${product.name} -- ${tier.name}`,
    recurring: tier.interval === "one-time" ? undefined : { interval: tier.interval as any },
    metadata: { catalog_id: `${product.id}.${tier.id}` },
  });
  console.log(`  [create] ${tier.id} -> ${created.id} ($${tier.price / 100}/${tier.interval})`);
  return created;
}

async function main() {
  console.log(`[stripe-sync] pushing ${PRODUCT.name} to Stripe`);
  const p = await getOrCreateProduct(PRODUCT);
  for (const tier of PRODUCT.tiers) {
    await getOrCreatePrice(p, tier);
  }
  console.log("\n[stripe-sync] done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
