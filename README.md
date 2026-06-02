# Meridian

Client Retention, Automated. A 12-month program of personalized cards, gifts, and follow-through for real estate agents.

**Live:** https://meridian-saas.vercel.app

## Tiers

| Tier | Price | Highlight |
|---|---|---|
| Foundation | $99/yr | Solo agents building their sphere |
| Professional | $199/yr | Top producers with growing databases |
| Concierge | $499/yr | White-glove for teams and brokerages |

All in `lib/catalog.ts`. To change a price, edit the file, push, redeploy. To push to Stripe, run `npm run stripe:sync` (after `STRIPE_SECRET_KEY` is set).

## Routes

- `/` — single-product landing
- `/app` — mobile PWA shell (slide-module design)
- `/login` — Supabase Auth (Google + magic link)
- `/dashboard` — authenticated user home
- `/admin` — admin dashboard (RLS-gated)
- `/api/health` — integrations report
- `/api/products` — public catalog
- `/api/checkout` — Stripe Checkout session
- `/api/lead` — lead capture
- `/api/webhooks/stripe` — fulfillment

## Stack

- **Next.js 14** App Router + Server Components
- **Supabase** Auth + Postgres with RLS
- **Stripe** Checkout + webhooks
- **Resend** transactional email
- **Tailwind** dark UI
- **Vercel** Edge + Serverless (free tier)

## Local dev

```bash
cp .env.example .env.local
# Fill in: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
# Optional: SUPABASE_SERVICE_ROLE_KEY, STRIPE_SECRET_KEY, RESEND_API_KEY
npm install
npm run dev
```

## Bootstrap

```bash
# 1. Push schema to Supabase
supabase db push

# 2. Push catalog to Stripe (creates products + prices)
export STRIPE_SECRET_KEY=***   # sk_test_... or sk_live_...
npm run stripe:sync

# 3. Local webhook listener (for dev)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Deploy

Push to `main` → Vercel auto-deploys. Set env vars in Vercel dashboard.
