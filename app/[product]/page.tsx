// app/[product]/page.tsx
// Single template, all product routes. Reads catalog[id].

import { notFound } from "next/navigation";
import Link from "next/link";
import { CATALOG, findProduct, formatPrice, type Product } from "@/lib/catalog";
import { CheckoutButton } from "@/components/CheckoutButton";
import { LeadForm } from "@/components/LeadForm";

export function generateStaticParams() {
  return CATALOG.map(p => ({ product: p.id }));
}

export default function ProductPage({ params }: { params: { product: string } }) {
  const product = findProduct(params.product);
  if (!product) notFound();

  return (
    <div>
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${product.accent} text-white`}>
        <div className="absolute inset-0">
          {product.heroPhoto ? (
            <img src={product.heroPhoto} alt={product.name} className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
        </div>
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl">
            <Link href="/" className="inline-block text-xs text-navy-200 hover:text-white mb-6">← All products</Link>
            <h1 className="h-display text-5xl md:text-6xl mb-4 text-balance">{product.name}</h1>
            <p className="text-xl md:text-2xl text-navy-200 mb-6 text-balance">{product.tagline}</p>
            <p className="text-base text-navy-300 max-w-2xl text-balance">{product.description}</p>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section id="pricing" className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">Pick your tier</h2>
            <p className="text-navy-500">All tiers include a {product.id === "services" ? "delivery" : "free trial"} period. Cancel anytime.</p>
          </div>
          <div className={`grid gap-6 max-w-6xl mx-auto ${
            product.tiers.length === 2 ? "md:grid-cols-2" :
            product.tiers.length === 3 ? "md:grid-cols-3" :
            product.tiers.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" :
            "md:grid-cols-3"
          }`}>
            {product.tiers.map(tier => (
              <div
                key={tier.id}
                id={tier.id}
                className={`card p-6 flex flex-col ${tier.highlight ? "ring-2 ring-navy-900 relative" : ""}`}
              >
                {tier.highlight ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-xs font-bold px-3 py-1 rounded-pill">Most popular</div>
                ) : null}
                <h3 className="text-xl font-bold text-navy-900 mb-1">{tier.name}</h3>
                <p className="text-sm text-navy-500 mb-4">{tier.description}</p>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-navy-900">{formatPrice(tier.price, tier.interval)}</span>
                  </div>
                  {tier.interval !== "one-time" && tier.price > 0 ? (
                    <div className="text-xs text-navy-500">per {tier.interval}, billed {tier.interval}ly</div>
                  ) : null}
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="text-sm text-navy-700 flex gap-2">
                      <span className="text-brand-600 font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <CheckoutButton product={product.id} tier={tier.id} label={tier.cta} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form (catches non-buyers) */}
      <section className="section bg-navy-50">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">Not ready yet?</h2>
            <p className="text-navy-500">Drop your info. We'll reach out within 24 hours.</p>
          </div>
          <div className="card p-8">
            <LeadForm product={product.id} />
          </div>
        </div>
      </section>
    </div>
  );
}
