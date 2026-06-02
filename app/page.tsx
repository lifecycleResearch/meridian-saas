// app/page.tsx
// Meridian Client Retention Service — single landing.
// Hero: three-phone slide-module wireframe showing the real Meridian mobile app
// Body: 6-pillar grid, 3 pricing tiers, lifestyle imagery, lead form
// Constraint: no internal scroll inside widgets — everything fits in view

import Link from "next/link";
import { PRODUCT, formatPrice, type Tier } from "@/lib/catalog";
import { CheckoutButton } from "@/components/CheckoutButton";
import { LeadForm } from "@/components/LeadForm";
import { TierIcon, PillarIcon, AddonIcon, PhoneFrame } from "@/components/Icons";

export default function HomePage() {
  return (
    <div>
      {/* HERO with three-phone slide-module wireframe — navy gradient like the original travel app reference */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-950 to-brand-600 text-white">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="container relative py-20 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow !text-brand-200 mb-3">Client Retention Service</div>
              <h1 className="font-serif text-5xl md:text-7xl font-light leading-[0.95] tracking-tight text-cream-50 mb-2 text-balance">
                {PRODUCT.tagline.serif}
              </h1>
              <div className="font-script text-5xl md:text-6xl italic text-gold-200 mb-6">
                {PRODUCT.tagline.script}
              </div>
              <div className="ornament !my-4"><span className="diamond !bg-gold-200" /></div>
              <p className="text-lg text-navy-200 max-w-md mb-8 leading-relaxed">
                {PRODUCT.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#pricing" className="btn-gold">See The Plans</a>
                <Link href="/#story" className="btn-gold-outline bg-transparent !text-cream-50 border-cream-50/40 hover:bg-cream-50/10 hover:!text-cream-50">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M8 5v14l11-7z" /></svg>
                  Watch the Story
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-end gap-3">
              <PhoneFrame variant="splash" className="w-[170px] h-[350px] hidden md:block opacity-70 translate-y-6" />
              <PhoneFrame variant="browse" className="w-[200px] h-[400px] z-10" />
              <PhoneFrame variant="detail" className="w-[170px] h-[350px] hidden md:block opacity-70 translate-y-6" />
            </div>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section id="pricing" className="section bg-cream-50">
        <div className="container">
          <div className="text-center mb-10">
            <div className="eyebrow mb-2">The Plans</div>
            <div className="ornament"><span className="diamond" /></div>
            <h2 className="font-serif text-3xl md:text-4xl text-ink-900 mt-3 mb-2">Simple plans. Meaningful results.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRODUCT.tiers.map(tier => <PricingCard key={tier.id} tier={tier} />)}
          </div>
        </div>
      </section>

      {/* 6 PILLARS */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
            {PRODUCT.pillars.map(p => (
              <div key={p.title} className="text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full border border-gold-400/40 flex items-center justify-center">
                    <PillarIcon name={p.icon as any} className="w-4 h-4 text-gold-400" />
                  </div>
                  <div className="eyebrow">{p.title}</div>
                </div>
                <p className="text-sm text-ink-800 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE IMAGES */}
      <section className="py-16 bg-cream-50">
        <div className="container">
          <div className="text-center mb-8">
            <div className="eyebrow mb-2">Real Moments</div>
            <div className="ornament"><span className="diamond" /></div>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="aspect-square overflow-hidden rounded-card border border-ink-800/10 shadow-soft">
                <img src={`/images/meridian-panel-${i}.jpg`} alt={`Meridian moment ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-5 gap-6">
            {PRODUCT.addons.map(a => (
              <div key={a.title} className="text-center">
                <div className="mx-auto mb-3 w-12 h-12 rounded-full border border-ink-800/30 flex items-center justify-center">
                  <AddonIcon name={a.icon as any} className="w-5 h-5 text-ink-800" />
                </div>
                <div className="eyebrow mb-2">{a.title}</div>
                <p className="text-xs text-ink-500 leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE BANNER */}
      <section className="py-20 bg-ink-900 text-cream-50">
        <div className="container text-center">
          <div className="eyebrow !text-gold-200 mb-3">Our Promise</div>
          <h2 className="font-serif text-4xl md:text-5xl tracking-widest mb-4">{PRODUCT.brand.promise}</h2>
          <div className="ornament"><span className="diamond !bg-gold-200" /></div>
          <p className="mt-6 text-cream-200/80 max-w-2xl mx-auto">
            One moment at a time, until you are the only agent they will ever call.
          </p>
        </div>
      </section>

      {/* CONTACT / LEAD FORM */}
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
  const cardClass = isPopular ? 'card-gold p-6 flex flex-col relative' : 'card p-6 flex flex-col';
  return (
    <div id={tier.id} className={cardClass}>
      {isPopular ? (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-400 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1 rounded-pill">
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
      <p className="text-xs text-ink-500 leading-relaxed text-center mb-6">{tier.description}</p>
      <div className="mt-auto">
        <CheckoutButton product="meridian" tier={tier.id} label={tier.cta} popular={isPopular} />
      </div>
    </div>
  );
}
