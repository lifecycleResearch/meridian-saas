// components/PackageCard.tsx
// Widget-style package card. Beige palette, no blue.

"use client";

type Props = {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  popular?: boolean;
};

export function PackageCard({ id, name, price, interval, description, features, popular }: Props) {
  const scrollToRegister = () => {
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={`relative rounded-card overflow-hidden border ${popular ? "border-gold-400 shadow-gold bg-cream-50" : "border-ink-800/10 bg-white shadow-card"}`}>
      {popular && (
        <div className="absolute top-0 left-0 right-0 bg-gold-400 text-white text-[10px] font-bold tracking-[0.2em] uppercase text-center py-1.5">
          Most Popular
        </div>
      )}
      <div className={`p-6 ${popular ? "pt-10" : ""}`}>
        <h3 className="font-serif text-xl text-ink-900 mb-1">{name}</h3>
        <div className="flex items-baseline gap-1 mb-3">
          <span className="font-serif text-4xl font-light text-ink-900">${price}</span>
          <span className="text-sm text-ink-500">{interval}</span>
        </div>
        <p className="text-sm text-ink-500 mb-5 leading-relaxed">{description}</p>
        <ul className="space-y-2 mb-6">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <button
          onClick={scrollToRegister}
          className={`w-full text-xs tracking-widest uppercase font-semibold py-3 rounded-pill transition ${
            popular
              ? "bg-gold-400 text-white hover:bg-gold-500"
              : "border border-ink-800 text-ink-800 hover:bg-ink-800 hover:text-cream-50"
          }`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
