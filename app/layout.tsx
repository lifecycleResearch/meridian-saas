// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { PRODUCT } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Meridian — Client Retention Service",
  description: "The only full-service client retention company built for the premier real estate agent. Cards, gifts, and curated touchpoints delivered for years.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="border-b border-ink-800/10 bg-cream-100/95 backdrop-blur sticky top-0 z-50">
          <div className="container flex items-center justify-between h-24">
            <Link href="/" className="flex flex-col items-center">
              <div className="relative w-12 h-12 mb-1 flex items-center justify-center border border-ink-800 rounded-full">
                <span className="font-serif text-2xl text-ink-800">M</span>
              </div>
              <span className="font-serif text-base tracking-[0.32em] text-ink-800">MERIDIAN</span>
              <span className="text-[9px] tracking-[0.28em] text-ink-500 uppercase">Client Retention Service</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-xs font-semibold tracking-widest uppercase text-ink-800 hover:text-gold-400">
                Log in
              </Link>
              <span className="w-px h-4 bg-ink-800/30" />
              <Link href="/#story" className="btn-gold">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M8 5v14l11-7z" /></svg>
                Watch the Story
              </Link>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-cream-50 border-t border-ink-800/10 mt-0">
          <div className="container py-16 text-center">
            <div className="eyebrow mb-3">{PRODUCT.brand.promise}</div>
            <h3 className="font-serif text-2xl tracking-widest text-ink-800 mb-4">
              {PRODUCT.brand.domain.toUpperCase()}
            </h3>
            <div className="ornament"><span className="diamond" /></div>
            <div className="flex justify-center gap-6 text-xs text-ink-500 tracking-widest uppercase mt-6">
              <Link href="/login" className="hover:text-gold-400">Log in</Link>
              <span>·</span>
              <Link href="/app" className="hover:text-gold-400">Mobile app</Link>
              <span>·</span>
              <Link href="/admin" className="hover:text-gold-400">Admin</Link>
            </div>
            <div className="text-xs text-ink-300 mt-8">
              © {new Date().getFullYear()} Meridian Client Retention Service. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
