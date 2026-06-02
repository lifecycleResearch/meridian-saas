// app/page.tsx
// Meridian Client Retention Service — the flyer as a landing page.
// Beige + gold. 2 packages. Widget cards. Real product images.
// For realtors to select their client retention package.

import { Logo } from "@/components/Logo";
import { PackageCard } from "@/components/PackageCard";
import { RegisterForm } from "@/components/RegisterForm";
import { ProductImages } from "@/components/ProductImages";
import Link from "next/link";

const packages = [
  {
    id: "foundation",
    name: "Foundation",
    price: 199,
    interval: "/client",
    description: "Handwritten card + curated gift for every client. Welcome Home, Anniversary, Just Checking In.",
    features: ["Up to 50 clients/year", "Handwritten cards", "Curated gifts", "12-month program", "Welcome Home package", "Anniversary touchpoints"],
    popular: true,
  },
  {
    id: "concierge",
    name: "Concierge",
    price: 499,
    interval: "/client",
    description: "Everything in Foundation, plus referral mobile, custom occasions, white-glove sourcing, dedicated concierge.",
    features: ["Everything in Foundation", "Unlimited clients", "Referral mobile app", "Custom occasions", "White-glove sourcing", "Dedicated concierge", "Priority support"],
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* ── Header ────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur border-b border-ink-800/8">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs tracking-widest uppercase text-ink-500 hover:text-gold-400 font-medium">
              Log in
            </Link>
            <a href="#register" className="bg-ink-900 text-cream-50 text-xs tracking-widest uppercase font-semibold px-4 py-2 rounded-pill hover:bg-ink-800 transition">
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero / Flyer Section ──────────────────────── */}
      <section className="relative overflow-hidden bg-cream-100">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left: Copy */}
            <div>
              <div className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">
                Client Retention Service
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-light leading-[0.95] text-ink-900 mb-1">
                PRESENCE
              </h1>
              <h2 className="font-script text-4xl md:text-5xl text-gold-400 italic mb-6">
                Without Pressure.
              </h2>
              <p className="text-ink-500 text-lg leading-relaxed mb-8 max-w-md">
                The only full-service client retention company built for the premier real estate agent. 
                Cards, gifts, and curated touchpoints that keep you top of mind — years after closing.
              </p>
              <div className="flex gap-3">
                <a href="#packages" className="bg-gold-400 text-white text-xs tracking-widest uppercase font-semibold px-6 py-3 rounded-pill hover:bg-gold-500 transition">
                  View Packages
                </a>
                <a href="#register" className="border border-ink-800 text-ink-800 text-xs tracking-widest uppercase font-semibold px-6 py-3 rounded-pill hover:bg-ink-800 hover:text-cream-50 transition">
                  Register Now
                </a>
              </div>
            </div>
            
            {/* Right: Hero image — the flyer product shot */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-phone border-4 border-cream-50">
                <img 
                  src="/images/meridian-grid-top-1.jpg" 
                  alt="Meridian — handwritten card with gold M seal"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl overflow-hidden shadow-phone border-4 border-cream-50 rotate-6">
                <img 
                  src="/images/meridian-grid-top-3.jpg" 
                  alt="Meridian gift box"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Images Strip ──────────────────────── */}
      <ProductImages />

      {/* ── How It Works ─────────────────────────────── */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">How It Works</div>
            <h2 className="font-serif text-3xl text-ink-900">We handle everything after closing.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "You Close", desc: "Tell us about your new client. We take it from there." },
              { step: "02", title: "We Curate", desc: "Handwritten cards, curated gifts, timed perfectly throughout the year." },
              { step: "03", title: "They Remember", desc: "Your clients feel genuinely cared for — and send referrals your way." },
            ].map(s => (
              <div key={s.step} className="card p-6 text-center">
                <div className="font-serif text-4xl text-gold-400 mb-3">{s.step}</div>
                <h3 className="font-serif text-lg text-ink-900 mb-2">{s.title}</h3>
                <p className="text-sm text-ink-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2 Packages ────────────────────────────────── */}
      <section id="packages" className="py-16 bg-cream-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Choose Your Package</div>
            <h2 className="font-serif text-3xl text-ink-900">Two plans. One promise.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {packages.map(pkg => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Register Form ─────────────────────────────── */}
      <section id="register" className="py-16 bg-cream-50">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Get Started</div>
            <h2 className="font-serif text-3xl text-ink-900 mb-2">Ready to retain more clients?</h2>
            <p className="text-ink-500">Tell us about your business. We'll reach out within 24 hours.</p>
          </div>
          <RegisterForm />
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="bg-ink-900 text-cream-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-gold-200 text-xs font-semibold tracking-[0.3em] uppercase mb-3">PRESENCE WITHOUT PRESSURE</div>
          <h3 className="font-serif text-2xl tracking-[0.3em] text-cream-50 mb-4">MERIDIAN</h3>
          <p className="text-cream-200/60 text-sm">Client Retention Service · clientretentionservice.com</p>
        </div>
      </footer>
    </div>
  );
}
