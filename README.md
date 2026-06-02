# Meridian SaaS

Multi-product SaaS portfolio on Vercel + Supabase + Stripe.

**Live:** _not yet deployed — run `vercel` after setup_

## Products (4 SaaS lines, 15 tiers)

| Line | Tiers |
|---|---|
| **Meridian** (Client Retention) | Foundation $99/yr · Professional $199/yr · Concierge $499/yr |
| **VOYPATH** (Travel) | Solo Free · Explorer $7.99/mo · Crew $19.99/mo · Agency $99.99/mo |
| **APEX** (Regulatory) | Free · State Single $49/mo · State Bundle $199/mo · Federal $999/mo |
| **Services** (One-off) | 30-Day Graphics $99 · Zapier $499 · Landing Page $1499 · Brand $4999 |

All in `lib/catalog.ts`. Edit there, run `npm run stripe:sync`, done.

## Routes

- `/` — multi-product portfolio
- `/meridian`, `/voypath`, `/apex`, `/services` — per-product landing + tiered pricing
- `/app` — mobile PWA shell
- `/login` — Google OAuth + magic link (Supabase Auth)
- `/dashboard` — authenticated user home (orders + subscriptions)
- `/admin` — admin dashboard (RLS-gated by `profiles.is_admin`)
- `/api/health` — integrations report
- `/api/products` — public catalog
- `/api/checkout` — Stripe Checkout session creator
- `/api/lead` — capture lead
- `/api/webhooks/stripe` — fulfillment

## Stack

- **Next.js 14** App Router + Server Components
- **Supabase** Auth (Google + magic link) + Postgres (RLS) + Realtime
- **Stripe** Checkout (subscription + one-time), webhooks, product sync
- **Resend** transactional email
- **Tailwind** dark aggressive UI
- **Vercel** Edge + Serverless (free tier, no idle cost)

## Local dev

```bash
cp .env.example .env.local
# Fill in: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
# Optional: SUPABASE_SERVICE_ROLE_KEY, STRIPE_SECRET_KEY, RESEND_API_KEY

npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel
# follow prompts
# then in Vercel dashboard: set env vars from .env.example
```

## Bootstrap Supabase

```bash
# Option 1: CLI
supabase link --project-ref qncqiuqjmovdgmsuwopb
supabase db push

# Option 2: Studio
# Open Supabase Studio → SQL editor → paste supabase/migrations/20260602_init.sql → Run
```

Then in Studio: enable Google provider in Authentication → Providers.

## Bootstrap Stripe

```bash
# Push catalog to Stripe (creates products + prices)
export STRIPE_SECRET_KEY=sk_test_...   # or sk_live_...
npm run stripe:sync

# Local webhook listener
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Architecture

```
meridian-saas/
├── app/
│   ├── page.tsx                 # Multi-product home
│   ├── [product]/page.tsx       # Per-product landing (Meridian, VOYPATH, APEX, Services)
│   ├── app/page.tsx             # Mobile PWA
│   ├── login/                   # Auth
│   ├── dashboard/               # User home
│   ├── admin/                   # Admin (RLS-gated)
│   └── api/
│       ├── health/
│       ├── products/
│       ├── checkout/
│       ├── lead/
│       ├── webhooks/stripe/
│       └── auth/signout/
├── components/                  # CheckoutButton, LeadForm, etc.
├── lib/
│   ├── catalog.ts               # ⭐ SOURCE OF TRUTH
│   ├── supabase.ts              # Browser/server/admin clients
│   ├── stripe.ts                # Server-only Stripe client
│   └── resend.ts                # Server-only email client
├── supabase/migrations/         # Schema + RLS
├── scripts/stripe-sync.ts       # Catalog → Stripe
├── public/                      # Static assets
└── vercel.json                  # Cron config
```

## Catalog → Stripe flow

1. Edit `lib/catalog.ts` (add tier, change price)
2. Run `npm run stripe:sync` (creates/updates Stripe products + prices)
3. Vercel auto-deploys on push
4. Live within 60s

## Outbound (Human-in-the-loop)

Outreach ONLY via `/api/cron/outreach-daily` (Vercel cron, daily 9am).
NO autonomous sends without daily review. See `SAAS-ARCHITECTURE.md`.
