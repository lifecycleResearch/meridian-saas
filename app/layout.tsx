// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { CATALOG } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Meridian SaaS — Multi-product portfolio",
  description: "Meridian, VOYPATH, APEX, and Services. One platform, many products.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

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
              {CATALOG.map(p => (
                <Link key={p.id} href={p.route} className="text-sm font-semibold text-navy-700 hover:text-navy-900">
                  {p.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Link href="/app" className="text-sm font-semibold text-navy-700 hover:text-navy-900 hidden sm:inline">
                Mobile App
              </Link>
              <Link href="/login" className="btn-ghost text-sm">Sign in</Link>
              <Link href="/admin" className="btn-primary text-sm">Admin</Link>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-12rem)]">{children}</main>

        <footer className="bg-navy-900 text-navy-100 mt-20">
          <div className="container py-12 grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold">M</div>
                <span className="font-bold text-white">Meridian</span>
              </div>
              <p className="text-sm text-navy-300 max-w-xs">
                Multi-product SaaS portfolio. Meridian, VOYPATH, APEX, and Services — one platform.
              </p>
            </div>
            {CATALOG.map(p => (
              <div key={p.id}>
                <div className="text-sm font-semibold text-white mb-3">{p.name}</div>
                <ul className="space-y-2">
                  {p.tiers.map(t => (
                    <li key={t.id}>
                      <Link href={`${p.route}#${t.id}`} className="text-sm text-navy-300 hover:text-white">
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-navy-700">
            <div className="container py-6 flex justify-between text-xs text-navy-300">
              <span>© {new Date().getFullYear()} Meridian SaaS. All rights reserved.</span>
              <span>Built on Vercel + Supabase + Stripe</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
