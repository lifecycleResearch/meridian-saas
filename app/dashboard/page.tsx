// app/dashboard/page.tsx
// Authenticated home. Shows the user's products/subscriptions.

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import { PRODUCT } from "@/lib/catalog";
import Link from "next/link";

export default async function DashboardPage() {
  const sb = createServerSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");

  // Fetch the user's orders + subscriptions from Supabase (if admin key set)
  const { data: orders } = await sb
    .from("orders")
    .select("*")
    .eq("customer_email", user.email)
    .order("created_at", { ascending: false })
    .limit(20);

  const { data: subs } = await sb
    .from("subscriptions")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(20);

  return (
    <section className="section">
      <div className="container max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="h-display text-4xl mb-1">Welcome back.</h1>
            <p className="text-navy-500">{user.email}</p>
          </div>
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="btn-ghost text-sm">Sign out</button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Your subscriptions</h2>
            {subs && subs.length > 0 ? (
              <ul className="space-y-3">
                {subs.map((s: any) => (
                  <li key={s.id} className="p-3 bg-navy-50 rounded-xl">
                    <div className="font-semibold text-navy-900">{s.stripe_subscription_id}</div>
                    <div className="text-xs text-navy-500">Status: {s.status} · {s.current_period_end}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-navy-500">No active subscriptions yet. <Link href="/" className="text-brand-600">See products</Link></p>
            )}
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Order history</h2>
            {orders && orders.length > 0 ? (
              <ul className="space-y-3">
                {orders.map((o: any) => (
                  <li key={o.id} className="p-3 bg-navy-50 rounded-xl">
                    <div className="font-semibold text-navy-900">{o.product} / {o.tier}</div>
                    <div className="text-xs text-navy-500">${(o.amount_total / 100).toFixed(2)} {o.currency} · {o.created_at}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-navy-500">No orders yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
