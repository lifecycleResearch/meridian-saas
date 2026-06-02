// app/page.tsx
// Meridian — single product landing.

import { CATALOG, formatPrice } from "@/lib/catalog";
import { CheckoutButton } from "@/components/CheckoutButton";
import { LeadForm } from "@/components/LeadForm";

const product = CATALOG[0];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-brand-600 text-white">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-pill text-xs font-semibold mb-6">
              {product.tiers.length} tiers · 12-month program
            </div>
            <h1 className="h-display text-5xl md:text-7xl mb-6 text-balance">
              {product.tagline}
            </h1>
            <p className="text-lg md:text-xl text-navy-200 max-w-2xl mb-10 text-balance">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#pricing" className="btn-primary bg-white text-navy-900 hover:bg-navy-100">
                See pricing
              </a>
              <a href="#contact" className="btn-secondary bg-transparent text-white border-white/30 hover:bg-white/10">
                Talk to us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy-900 mb-3">How Meridian works</h2>
            <p className="text-navy-500 max-w-2xl mx-auto">Twelve months. Forty-eight touchpoints. Zero effort after setup.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Set up your sphere", desc: "Import your past clients. We handle the birthdays, anniversaries, and closing-day reminders." },
              { step: "02", title: "We send for you", desc: "Personalized cards, curated gifts, follow-up emails — all timed to the moment that matters." },
              { step: "03", title: "You stay top-of-mind", desc: "When a past client thinks real estate, they think you. Referrals come back to the only agent they remember." },
            ].map(s => (
              <div key={s.step} className="card p-6">
                <div className="text-3xl font-display italic text-brand-600 mb-3">{s.step}</div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{s.title}</h3>
                <p className="text-sm text-navy-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section bg-navy-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3">Pick your tier</h2>
            <p className="text-navy-500">All tiers include a 14-day free trial. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {product.tiers.map(tier => (
              <div
                key={tier.id}
                id={tier.id}
                className={`card p-6 flex flex-col bg-white ${tier.highlight ? "ring-2 ring-navy-900 relative" : ""}`}
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
                <CheckoutButton product="meridian" tier={tier.id} label={tier.cta} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="contact" className="section">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-2">Not ready yet?</h2>
            <p className="text-navy-500">Drop your info. We'll reach out within 24 hours.</p>
          </div>
          <div className="card p-8">
            <LeadForm product="meridian" />
          </div>
        </div>
      </section>
    </div>
  );
}
