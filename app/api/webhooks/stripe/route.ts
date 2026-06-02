// app/api/webhooks/stripe/route.ts
// Stripe webhook handler. Fulfills orders based on event type.

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createAdminSupabase } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }
  const sig = req.headers.get("stripe-signature") || "";
  const body = await req.text();
  let event: any;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (e: any) {
    return NextResponse.json({ error: `Signature failed: ${e.message}` }, { status: 400 });
  }

  const admin = createAdminSupabase();
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const product = session.metadata?.catalog_product;
      const tier = session.metadata?.catalog_tier;
      console.log(`[stripe] checkout complete: ${product}/${tier} → ${session.customer_email}`);

      // Record the order in Supabase
      if (admin) {
        await admin.from("orders").insert({
          stripe_session_id: session.id,
          stripe_customer_id: session.customer,
          customer_email: session.customer_email,
          product,
          tier,
          amount_total: session.amount_total,
          currency: session.currency,
          status: "completed",
          created_at: new Date().toISOString(),
        }).then(({ error }) => {
          if (error) console.error("[stripe] order insert failed:", error.message);
        });
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object;
      console.log(`[stripe] subscription ${event.type}: ${sub.id} status=${sub.status}`);
      if (admin) {
        await admin.from("subscriptions").upsert({
          stripe_subscription_id: sub.id,
          stripe_customer_id: sub.customer,
          status: sub.status,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          metadata: sub.metadata,
          updated_at: new Date().toISOString(),
        }).then(({ error }) => {
          if (error) console.error("[stripe] subscription upsert failed:", error.message);
        });
      }
      break;
    }
    default:
      console.log(`[stripe] unhandled: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
