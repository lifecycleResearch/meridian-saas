// app/page.tsx
// Meridian — single landing, full brand redesign matching the mockup.

import { PRODUCT, formatPrice, type Tier } from "@/lib/catalog";
import { CheckoutButton } from "@/components/CheckoutButton";
import { LeadForm } from "@/components/LeadForm";
import { TierIcon, PillarIcon, AddonIcon } from "@/components/Icons";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-cream-100">
        <div className="container grid md:grid-cols-2 gap-12 py-12 items-center">
          <div>
            <h1 className="font-serif text-7xl md:text-[110px] font-light leading-[0.95] tracking-tight text-ink-900 mb-2">
              {PRODUCT.tagline.serif}
            </h1>
            <div className="h-script text-6xl md:text-7xl italic mb-8">
              {PRODUCT.tagline.script}
            </div>
            <div className="ornament"><span className="diamond" /></div>
            <p className="text-lg text-ink-800 mt-6 leading-relaxed max-w-md">
              {PRODUCT.tagline.body[0]}<br />
              {PRODUCT.tagline.body[1]}
              <span className="h-script text-3xl">{PRODUCT.tagline.emphasis}</span>
              {PRODUCT.tagline.ending}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a href="#story" className="btn-gold">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M8 5v14l11-7z" /></svg>
                Watch the Story
              </a>
              <a href="#how" className="btn-gold-outline">See How It Works</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-card overflow-hidden shadow-card border border-ink-800/10">
              <img src={PRODUCT.hero.image} alt={PRODUCT.hero.imageAlt} className="w-full h-full object-cover" />
            </div>
            {/* small brand mark in corner */}
            <div className="absolute -bottom-3 -right-3 bg-ink-900 text-cream-50 px-4 py-3 rounded-card shadow-strong">
              <div className="font-serif text-sm tracking-widest text-gold-200">MERIDIAN</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline + Plans intro */}
      <section className="py-16 bg-cream-50 border-y border-ink-800/5">
        <div className="container text-center">
          <p className="font-serif text-2xl md:text-3xl text-ink-800 max-w-3xl mx-auto leading-snug">
            The difference between a closed transaction<br />
            and a lifelong advocate is what happens
          </p>
          <p className="h-script text-4xl md:text-5xl mt-3">
            after the closing table.
          </p>
          <div className="ornament mt-6"><span className="diamond" /></div>
        </div>
      </section>

      {/* Plans (pricing) */}
      <section id="pricing" className="section">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 items-start">
            <div className="md:pt-16">
              <div className="eyebrow mb-3">The Plans</div>
              <div className="ornament !my-2 !justify-start"><span className="diamond" /></div>
              <p className="font-serif text-xl text-ink-800 mt-4">Simple plans.<br/>Meaningful results.</p>
            </div>
            {PRODUCT.tiers.map(tier => (
              <PricingCard key={tier.id} tier={tier} />
            ))}
          </div>
        </div>
      </section>

      {/* 6-pillar grid (Who/What/Why/How/Promise/Legacy) */}
      <section id="how" className="section bg-cream-50 border-y border-ink-800/5">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-x-12 gap-y-12">
            {PRODUCT.pillars.map(p => (
              <div key={p.title} className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <PillarIcon name={p.icon as any} className="w-5 h-5 text-gold-400" />
                  <div className="eyebrow">{p.title}</div>
                </div>
                <p className="text-sm text-ink-800 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons strip */}
      <section className="py-16 bg-cream-100">
        <div className="container">
          <div className="grid md:grid-cols-6 gap-6 items-start">
            <div className="md:col-span-1">
              <div className="eyebrow mb-3">Add-ons</div>
              <div className="ornament !my-2 !justify-start"><span className="diamond" /></div>
            </div>
            {PRODUCT.addons.map(a => (
              <div key={a.title} className="md:col-span-1 text-center">
                <div className="mx-auto mb-3 w-12 h-12 rounded-full border border-ink-800/30 flex items-center justify-center">
                  <AddonIcon name={a.icon as any} className="w-5 h-5 text-ink-800" />
                </div>
                <div className="font-serif text-sm font-semibold tracking-widest uppercase text-ink-800 mb-2">{a.title}</div>
                <p className="text-xs text-ink-500 leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise banner */}
      <section className="py-20 bg-ink-900 text-cream-50">
        <div className="container text-center">
          <div className="eyebrow !text-gold-200 mb-3">Our Promise</div>
          <h2 className="font-serif text-4xl md:text-5xl tracking-widest mb-4">
            {PRODUCT.brand.promise}
          </h2>
          <div className="ornament"><span className="diamond !bg-gold-200" /></div>
          <p className="mt-6 text-cream-200/80 max-w-2xl mx-auto">
            One moment at a time, until you are the only agent they will ever call.
          </p>
        </div>
      </section>

      {/* Contact / lead form */}
      <section id="story" className="section">
        <div className="container max-w-2xl text-center">
          <div className="eyebrow mb-3">Get In Touch</div>
          <div className="ornament"><span className="diamond" /></div>
          <h2 className="font-serif text-4xl text-ink-900 mt-4 mb-3">Ready when you are.</h2>
          <p className="text-ink-500 mb-8">Tell us a bit about your business. We&apos;ll reach out within 24 hours.</p>
          <div className="card p-8 text-left">
            <LeadForm product="meridian" />
          </div>
        </div>
      </section>
    </div>
  );
}

function PricingCard({ tier }: { tier: Tier }) {
  const isPopular = !!tier.highlight;
  const CardTag = isPopular ? 'div' : 'div';
  const cardClass = isPopular
    ? 'card-gold p-6 flex flex-col relative'
    : 'card p-6 flex flex-col';
  return (
    <div id={tier.id} className={cardClass}>
      {isPopular ? (
        <div className="absolute -top-3 left-1/5 -translate-x-1/5 bg-gold-400 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-pill">
          {tier.popularLabel || 'Most Popular'}
        </div>
      ) : null}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="w-12 h-12 rounded-full border border-ink-800/30 flex items-center justify-center mb-3">
          <TierIcon name={tier.icon} className="w-5 h-5 text-ink-800" />
        </div>
        <div className="font-serif text-base font-semibold tracking-widest uppercase text-ink-800">{tier.name}</div>
        <div className="text-[10px] tracking-widest uppercase text-ink-500 mt-1">{tier.subtitle}</div>
      </div>
      <div className="text-center mb-4">
        <div className="font-serif text-4xl font-light text-ink-900">
          {formatPrice(tier.price, tier.interval)}
          <span className="text-base text-ink-500 font-serif italic">
            {tier.interval === 'one-time' ? ' / client' : ' / month'}
          </span>
        </div>
        {tier.interval === 'one-time' ? (
          <div className="text-[10px] tracking-widest uppercase text-ink-500 mt-1">One-time fee</div>
        ) : null}
      </div>
      <p className="text-xs text-ink-500 leading-relaxed text-center mb-6">
        {tier.description}
      </p>
      <div className="mt-auto">
        <CheckoutButton product="meridian" tier={tier.id} label={tier.cta} popular={isPopular} />
      </div>
    </div>
  );
}
