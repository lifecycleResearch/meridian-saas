// app/api/lead/route.ts
// Capture a lead. Persists to Supabase (if admin key) + emails notify (if Resend).

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findProduct, findTier } from "@/lib/catalog";
import { createAdminSupabase } from "@/lib/supabase-server";
import { resend, leadNotifyEmail } from "@/lib/resend";
import { randomUUID } from "node:crypto";

export const dynamic = "force-dynamic";

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  email: z.string().email().optional(),
  phone: z.string().trim().min(7).max(40).optional(),
  brokerage: z.string().trim().max(200).optional(),
  notes: z.string().trim().max(2000).optional(),
  product: z.string().min(1),
  tier: z.string().min(1),
  source: z.string().max(80).optional(),
}).refine(d => d.email || d.phone, { message: "email or phone required" });

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0]?.message || "Invalid input" }, { status: 400 });
  }
  const lead = parsed.data;
  const product = findProduct(lead.product);
  const tier = findTier(lead.product, lead.tier);
  if (!product || !tier) {
    return NextResponse.json({ error: "Unknown product or tier" }, { status: 404 });
  }

  const id = randomUUID();
  const receivedAt = new Date().toISOString();
  const row = {
    id,
    received_at: receivedAt,
    name: lead.name || null,
    email: lead.email || null,
    phone: lead.phone || null,
    brokerage: lead.brokerage || null,
    notes: lead.notes || null,
    product: lead.product,
    tier: lead.tier,
    product_name: product.name,
    tier_name: tier.name,
    source: lead.source || "meridian-saas",
    user_agent: req.headers.get("user-agent") || null,
    ip: req.headers.get("x-forwarded-for")?.split(",")[0] || null,
    status: "new",
  };

  let storage = "none";
  const admin = createAdminSupabase();
  if (admin) {
    const { error } = await admin.from("leads").insert(row);
    if (error) {
      console.error("[lead] supabase insert failed:", error.message);
    } else {
      storage = "supabase";
    }
  } else {
    // No admin key — log to stdout as a fallback. In production with no DB,
    // the lead is still recorded in app logs.
    console.log("[lead]", JSON.stringify(row));
  }

  // Notify via Resend (fire-and-forget, never block lead capture)
  if (resend) {
    resend.emails.send({
      from: "Meridian Leads <leads@clientretentionservice.com>",
      to: [leadNotifyEmail],
      subject: `New lead: ${product.name} ${tier.name}`,
      html: `<h2>New lead</h2>
        <ul>
          <li><b>Product</b>: ${product.name} (${tier.name})</li>
          <li><b>Name</b>: ${lead.name || "—"}</li>
          <li><b>Email</b>: ${lead.email || "—"}</li>
          <li><b>Phone</b>: ${lead.phone || "—"}</li>
          <li><b>Brokerage</b>: ${lead.brokerage || "—"}</li>
          <li><b>Notes</b>: ${lead.notes || "—"}</li>
          <li><b>Source</b>: ${lead.source || "—"}</li>
          <li><b>Time</b>: ${receivedAt}</li>
        </ul>`,
    }).catch((e) => console.error("[lead] resend failed:", e.message));
  }

  return NextResponse.json({ success: true, id, storage });
}
