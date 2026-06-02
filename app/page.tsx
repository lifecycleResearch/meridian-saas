// app/page.tsx
// Meridian Client Retention Service
// The image IS the page. 7 photos (top 3, bottom 4), full bleed.
// Click any photo → opens register modal
// Bottom tab nav → register + 2 packages
//
// Brand: cream + gold + ink. No text overlays on the photos.

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { RegisterModal } from "@/components/RegisterModal";
import { BottomTabs } from "@/components/BottomTabs";
import { Hero } from "@/components/Hero";

// Top row: 3 large squares
const topPhotos = [
  { src: "/images/meridian-grid-top-1.jpg", alt: "Handwritten card with gold M seal", label: "Cards" },
  { src: "/images/meridian-grid-top-2.jpg", alt: "Hands holding house keychain", label: "Keys" },
  { src: "/images/meridian-grid-top-3.jpg", alt: "Black Meridian gift box with Enjoy. inside", label: "Gifts" },
];

// Bottom row: 4 portraits
const bottomPhotos = [
  { src: "/images/meridian-grid-bot-1.jpg", alt: "Framed family photo on counter", label: "Memory" },
  { src: "/images/meridian-grid-bot-2.jpg", alt: "Cream envelope with Thinking of you and gold M seal", label: "Sealed" },
  { src: "/images/meridian-grid-bot-3.jpg", alt: "Phone screen showing Referral mobile call", label: "Referred" },
  { src: "/images/meridian-grid-bot-4.jpg", alt: "Ceramic coffee mug with olive branch", label: "Moments" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      {/* Top brand bar — minimal, doesn't compete with photos */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-ink-800/10 bg-cream-50/90 backdrop-blur">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-xs font-semibold tracking-widest uppercase text-ink-800 hover:text-gold-400">
            Log in
          </Link>
          <a href="#register" className="btn-gold text-[10px] py-2 px-4">Get Started</a>
        </div>
      </header>

      {/* HERO: full-bleed 3-top + 4-bottom photo grid — the image IS the page */}
      <Hero topPhotos={topPhotos} bottomPhotos={bottomPhotos} />

      {/* Bottom tab nav — funnels to register + 2 packages */}
      <BottomTabs />

      {/* Hidden modal trigger anchor */}
      <div id="register" />
    </div>
  );
}
