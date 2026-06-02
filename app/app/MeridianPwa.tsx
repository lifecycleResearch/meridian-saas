// app/app/MeridianPwa.tsx
// Meridian mobile shell. Single product, three tiers, slide-module design.

"use client";
import { useState } from "react";

type Moment = { id: string; name: string; price: string; tier: string; description: string; tagline: string };

const PHOTOS: Record<string, string> = {
  "meridian-foundation":
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  "meridian-professional":
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
  "meridian-concierge":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
};
const FALLBACK = "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80";

export function MeridianPwa({ moments, productName, tagline }: { moments: Moment[]; productName: string; tagline: string }) {
  const [screen, setScreen] = useState<"splash" | "home" | "detail">("splash");
  const [active, setActive] = useState<Moment | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="bg-navy-950 min-h-screen flex items-center justify-center p-0 md:p-8">
      <div className="w-full max-w-[420px] h-screen md:h-[860px] bg-white md:rounded-[38px] md:border-[8px] md:border-navy-900 relative overflow-hidden shadow-strong">
        {/* Splash */}
        {screen === "splash" ? (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-brand-700 to-brand-400 flex flex-col items-center justify-center text-white p-12 text-center">
            <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(135,192,232,0.4)] animate-float">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12">
                <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="font-display italic text-6xl mb-4 leading-none">{productName}</h1>
            <p className="text-navy-200 mb-12">{tagline}</p>
            <button
              onClick={() => setScreen("home")}
              className="bg-white text-navy-900 font-semibold px-10 py-4 rounded-pill shadow-strong flex items-center gap-2 active:scale-95 transition"
            >
              Get Started
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ) : null}

        {/* Home */}
        {screen === "home" ? (
          <div className="absolute inset-0 flex flex-col overflow-y-auto">
            <div className="p-6 pt-16 flex justify-between items-start">
              <div>
                <div className="text-xs text-navy-500 mb-1">Welcome,</div>
                <div className="text-2xl font-bold text-navy-900">{productName} 👋</div>
              </div>
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-brand-300 flex items-center justify-center text-white font-bold">M</div>
            </div>

            <div className="px-6 mb-3 flex justify-between items-baseline">
              <h2 className="text-lg font-bold text-navy-900">Choose your tier</h2>
              <a className="text-xs text-brand-600 font-semibold">View all</a>
            </div>

            <div className="px-6 mb-8 flex flex-col gap-4">
              {moments.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setActive(m); setScreen("detail"); setBookmarked(false); }}
                  className="card flex overflow-hidden text-left active:scale-[0.99] transition"
                >
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img src={PHOTOS[m.id] || FALLBACK} alt={m.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-0.5 rounded-pill text-[10px] font-bold text-navy-900">
                      {m.price}
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="text-base font-bold text-navy-900 mb-1">{m.name}</div>
                    <div className="text-xs text-navy-500 leading-relaxed line-clamp-3">{m.tagline}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="px-6 pb-24">
              <div className="card p-6 bg-gradient-to-br from-navy-900 to-brand-600 text-white">
                <div className="text-xs font-semibold text-brand-200 mb-2">MOBILE APP</div>
                <h3 className="text-lg font-bold mb-1">Track your retention program</h3>
                <p className="text-sm text-navy-200">See which clients are due, what's been sent, and what comes next.</p>
              </div>
            </div>

            {/* Tab bar */}
            <div className="mt-auto border-t border-navy-100 bg-white/90 backdrop-blur flex justify-around pt-3 pb-6">
              {["Home", "Clients", "Sends", "Profile"].map(t => (
                <button
                  key={t}
                  className={`text-[10px] font-semibold flex flex-col items-center gap-1 ${t === "Home" ? "text-navy-900" : "text-navy-500"}`}
                >
                  <div className="w-6 h-6 rounded bg-navy-50" />
                  {t}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {/* Detail */}
        {screen === "detail" && active ? (
          <div className="absolute inset-0 flex flex-col overflow-y-auto">
            <div className="relative h-96 flex-shrink-0 bg-navy-100">
              <img src={PHOTOS[active.id] || FALLBACK} alt={active.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
              <button
                onClick={() => setScreen("home")}
                className="absolute top-14 left-5 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center"
              >
                ←
              </button>
              <button
                onClick={() => setBookmarked(b => !b)}
                className="absolute top-14 right-5 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" fill={bookmarked ? "#ff4d6d" : "none"} stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
            </div>
            <div className="bg-white -mt-8 rounded-t-3xl p-6 pb-32 relative z-10 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-navy-900 flex-1">{active.name}</h2>
                <div className="text-lg font-extrabold text-navy-900 ml-3">{active.price}</div>
              </div>
              <div className="text-sm text-navy-500 mb-5">📅 12-month program</div>
              <div className="flex gap-6 border-b border-navy-100 mb-5">
                {["Overview", "Details"].map((t, i) => (
                  <button
                    key={t}
                    className={`py-2 text-sm font-semibold ${i === 0 ? "text-navy-900 border-b-2 border-navy-900" : "text-navy-500"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-sm text-navy-500 leading-relaxed mb-6">
                {active.description}
              </p>
              <a
                href={`/#${active.tier}`}
                className="block w-full bg-navy-900 text-white text-center py-4 rounded-xl font-bold"
              >
                Get Started — {active.price}
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
