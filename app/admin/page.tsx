// app/admin/page.tsx
// Admin dashboard. RLS-gated by is_admin in profiles table.

import { redirect } from "next/navigation";
import { createServerSupabase, createAdminSupabase } from "@/lib/supabase-server";

export default async function AdminPage() {
  const sb = createServerSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  // Check admin status
  const { data: profile } = await sb
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return (
      <section className="section">
        <div className="container max-w-2xl text-center">
          <h1 className="h-display text-4xl mb-4">Access denied</h1>
          <p className="text-navy-500">You don't have admin access. Contact your account manager if this is wrong.</p>
        </div>
      </section>
    );
  }

  // Admin view: list leads + orders
  const admin = createAdminSupabase();
  const { data: leads } = await admin?.from("leads").select("*").order("received_at", { ascending: false }).limit(50) ?? { data: null };
  const { data: orders } = await admin?.from("orders").select("*").order("created_at", { ascending: false }).limit(50) ?? { data: null };
  const { data: subs } = await admin?.from("subscriptions").select("*").order("updated_at", { ascending: false }).limit(50) ?? { data: null };

  return (
    <section className="section">
      <div className="container">
        <h1 className="h-display text-4xl mb-2">Admin</h1>
        <p className="text-navy-500 mb-8">Welcome, {user.email}.</p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { label: "Leads", value: leads?.length || 0, href: "#leads" },
            { label: "Orders", value: orders?.length || 0, href: "#orders" },
            { label: "Subscriptions", value: subs?.length || 0, href: "#subs" },
          ].map(s => (
            <a key={s.label} href={s.href} className="card p-6 hover:shadow-strong transition">
              <div className="text-3xl font-bold text-navy-900">{s.value}</div>
              <div className="text-sm text-navy-500">{s.label}</div>
            </a>
          ))}
        </div>

        <DataTable id="leads" title="Leads" columns={["received_at", "name", "email", "phone", "product", "tier", "status"]} rows={leads || []} />
        <DataTable id="orders" title="Orders" columns={["created_at", "customer_email", "product", "tier", "amount_total", "currency", "status"]} rows={orders || []} />
        <DataTable id="subs" title="Subscriptions" columns={["updated_at", "stripe_customer_id", "status", "current_period_end"]} rows={subs || []} />
      </div>
    </section>
  );
}

function DataTable({ id, title, columns, rows }: { id: string; title: string; columns: string[]; rows: any[] }) {
  return (
    <div id={id} className="card p-6 mb-6">
      <h2 className="text-xl font-bold text-navy-900 mb-4">{title} <span className="text-navy-500 text-sm font-normal">({rows.length})</span></h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-navy-100">
              {columns.map(c => <th key={c} className="py-2 pr-4 font-semibold text-navy-700">{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr><td colSpan={columns.length} className="py-6 text-center text-navy-500">No rows yet.</td></tr>
            ) : rows.map((r, i) => (
              <tr key={i} className="border-b border-navy-50">
                {columns.map(c => <td key={c} className="py-2 pr-4 text-navy-700">{r[c]?.toString().slice(0, 50) || "—"}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
