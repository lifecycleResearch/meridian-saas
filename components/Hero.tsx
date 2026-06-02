// components/Hero.tsx
// Full-bleed photo grid. 3 top, 4 bottom. The image IS the landing page.
// Each photo opens the register modal.

"use client";
import { useState } from "react";
import { RegisterModal } from "./RegisterModal";

type Photo = { src: string; alt: string; label: string };

export function Hero({ topPhotos, bottomPhotos }: { topPhotos: Photo[]; bottomPhotos: Photo[] }) {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  return (
    <section className="flex-1 p-1 bg-cream-100">
      {/* Top row: 3 large photos */}
      <div className="grid grid-cols-3 gap-1 mb-1">
        {topPhotos.map((p) => (
          <button
            key={p.src}
            onClick={() => setSelectedLabel(p.label)}
            className="relative group overflow-hidden aspect-square focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label={`${p.label} — register for Meridian`}
          >
            <img
              src={p.src}
              alt={p.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/30 transition-colors duration-300 flex items-end justify-center pb-6">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cream-50 text-xs tracking-widest uppercase font-semibold">
                Get Started
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom row: 4 photos */}
      <div className="grid grid-cols-4 gap-1">
        {bottomPhotos.map((p) => (
          <button
            key={p.src}
            onClick={() => setSelectedLabel(p.label)}
            className="relative group overflow-hidden aspect-[3/4] focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label={`${p.label} — register for Meridian`}
          >
            <img
              src={p.src}
              alt={p.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/30 transition-colors duration-300 flex items-end justify-center pb-6">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-cream-50 text-xs tracking-widest uppercase font-semibold">
                Get Started
              </span>
            </div>
          </button>
        ))}
      </div>

      <RegisterModal open={selectedLabel !== null} context={selectedLabel} onClose={() => setSelectedLabel(null)} />
    </section>
  );
}
