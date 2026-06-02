// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { CATALOG } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Meridian — Client Retention, Automated",
  description: "A 12-month program of personalized cards, gifts, and follow-through for real estate agents. Three tiers. One platform.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

const product = CATALOG[0];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-navy-100">
          <div className="container flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-900 to-brand-600 flex items-center justify-center text-white font-bold">M</div>
              <span className="font-bold text-navy-900">Meridian</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/#how-it-works" className="text-sm font-semibold text-navy-700 hover:text-navy-900">How it works</Link>
              <Link href="/#pricing" className="text-sm font-semibold text-navy-700 hover:text-navy-900">Pricing</Link>
              <Link href="/app" className="text-sm font-semibold text-navy-700 hover:text-navy-900">Mobile App</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/login" className="btn-ghost text-sm">Sign in</Link>
              <Link href="/#pricing" className="btn-primary text-sm">Get Started</Link>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-12rem)]">{children}</main>

        <footer className="bg-navy-900 text-navy-100 mt-20">
          <div className="container py-12 grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold">M</div>
                <span className="font-bold text-white">Meridian</span>
              </div>
              <p className="text-sm text-navy-300 max-w-xs">
                {product.tagline}
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-white mb-3">Product</div>
              <ul className="space-y-2">
                {product.tiers.map(t => (
                  <li key={t.id}>
                    <Link href={`/#${t.id}`} className="text-sm text-navy-300 hover:text-white">{t.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-white mb-3">Account</div>
              <ul className="space-y-2">
                <li><Link href="/login" className="text-sm text-navy-300 hover:text-white">Sign in</Link></li>
                <li><Link href="/dashboard" className="text-sm text-navy-300 hover:text-white">Dashboard</Link></li>
                <li><Link href="/app" className="text-sm text-navy-300 hover:text-white">Mobile app</Link></li>
                <li><Link href="/admin" className="text-sm text-navy-300 hover:text-white">Admin</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-navy-700">
            <div className="container py-6 flex justify-between text-xs text-navy-300">
              <span>© {new Date().getFullYear()} Meridian. All rights reserved.</span>
              <span>Built on Vercel + Supabase + Stripe</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
