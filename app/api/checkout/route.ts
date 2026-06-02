// app/api/checkout/route.ts
// Create a Stripe Checkout session for a given catalog tier.

import { NextRequest, NextResponse } from "next/server";
import { findTier, findProduct } from "@/lib/catalog";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not configured. Set STRIPE_SECRET_KEY." },
      { status: 503 }
    );
  }
  const body = await req.json();
  const { product: productId, tier: tierId, email } = body || {};

  if (!productId || !tierId) {
    return NextResponse.json({ error: "product and tier required" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const product = findProduct(productId);
  const tier = findTier(productId, tierId);
  if (!product || !tier) {
    return NextResponse.json({ error: "Unknown product or tier" }, { status: 404 });
  }

  // Free tier = no checkout, just signup
  if (tier.price === 0) {
    return NextResponse.json(
      { free: true, message: `${tier.name} is free. Sign up to get started.`, signup: "/login" },
      { status: 200 }
    );
  }

  try {
    // Look up Stripe price by lookup_key (set by stripe-sync script)
    const prices = await stripe.prices.list({ lookup_keys: [tierId], limit: 1 });
    const priceId = prices.data[0]?.id;
    if (!priceId) {
      return NextResponse.json(
        { error: `Stripe price not found for ${tierId}. Run: npm run stripe:sync` },
        { status: 503 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const mode = tier.interval === "one-time" ? "payment" : "subscription";

    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      success_url: `${siteUrl}/${product.route}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/${product.route}?checkout=cancel`,
      metadata: {
        catalog_product: productId,
        catalog_tier: tierId,
      },
    });

    return NextResponse.json({ url: session.url, id: session.id });
  } catch (e: any) {
    console.error("[checkout] failed:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
