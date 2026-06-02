// app/page.tsx
// Multi-product portfolio landing.

import Link from "next/link";
import { CATALOG, formatPrice } from "@/lib/catalog";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-950 to-brand-600 text-white">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-pill text-xs font-semibold mb-6">
              {CATALOG.length} products · {CATALOG.reduce((n,p)=>n+p.tiers.length,0)} tiers · one platform
            </div>
            <h1 className="h-display text-5xl md:text-7xl mb-6 text-balance">
              A portfolio of products, <span className="text-brand-300">built to compound.</span>
            </h1>
            <p className="text-lg md:text-xl text-navy-200 max-w-2xl mb-10 text-balance">
              Meridian, VOYPATH, APEX, and Services. Each one a real product with real tiers and real customers. One codebase, one deploy, one truth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#products" className="btn-primary bg-white text-navy-900 hover:bg-navy-100">
                See all products
              </Link>
              <Link href="/login" className="btn-secondary bg-transparent text-white border-white/30 hover:bg-white/10">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section id="products" className="section">
        <div className="container">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-navy-900 mb-3">Products</h2>
            <p className="text-navy-500 max-w-2xl">Each product has its own tiers, its own pricing, and its own go-to-market. Click in to see the catalog.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {CATALOG.map((p) => (
              <Link key={p.id} href={p.route} className="card group hover:shadow-strong transition">
                <div className={`h-48 bg-gradient-to-br ${p.accent} relative overflow-hidden`}>
                  {p.heroPhoto ? (
                    <img src={p.heroPhoto} alt={p.name} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
                  ) : null}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/95 flex items-center justify-center font-display italic text-2xl text-navy-900">
                    {p.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-navy-900 mb-1">{p.name}</h3>
                  <p className="text-sm text-navy-500 mb-4">{p.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tiers.map(t => (
                      <span key={t.id} className="text-xs px-3 py-1 bg-navy-50 text-navy-700 rounded-pill font-semibold">
                        {t.name} · {formatPrice(t.price, t.interval)}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="section bg-navy-900 text-white">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12">One stack, every product.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Vercel", desc: "Edge + serverless. Free tier, zero idle cost, global CDN." },
              { name: "Supabase", desc: "Auth + Postgres + RLS. Same DB for users, leads, orders, subscriptions." },
              { name: "Stripe", desc: "One account, many products. Sync catalog → products, lookup_keys for prices." },
              { name: "Resend", desc: "Transactional email. Free 100/day. All sends logged." },
              { name: "TypeScript", desc: "End-to-end types. Catalog is the source of truth — apps render from it." },
              { name: "Tailwind", desc: "Fast UI iteration. Dark, aggressive, anti-corporate by default." },
            ].map(s => (
              <div key={s.name}>
                <div className="text-brand-300 font-semibold mb-2">{s.name}</div>
                <p className="text-sm text-navy-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
