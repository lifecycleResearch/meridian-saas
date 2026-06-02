// Meridian SaaS — Catalog
// Source of truth for all products, tiers, and features.
// This file is what the app renders from, and what gets synced to Stripe.
//
// To add a new product line: add a Product entry to CATALOG.
// To add a new tier to a product: add a Tier to that product's tiers[].
// Run `npm run stripe:sync` to push catalog to Stripe (creates products + prices).

export type Feature = {
  name: string;
  free?: boolean | string;     // shown as string (e.g. "3/mo") instead of ✓/✗
  tiers?: Record<string, boolean | string>;  // tier-specific value
};

export type Tier = {
  id: string;                  // stable id used for Stripe lookup_keys
  name: string;                // "Foundation", "Professional", "Concierge"
  price: number;               // USD cents
  interval: 'month' | 'year' | 'one-time';
  description: string;
  features: string[];          // bullet list under the tier card
  highlight?: boolean;         // marks the recommended tier
  cta: string;                 // "Get Started", "Contact Sales"
  trialDays?: number;          // optional free trial
};

export type Product = {
  id: string;                  // "meridian", "voypath", "apex", "services"
  name: string;
  tagline: string;
  description: string;
  icon: string;                // emoji or symbol for nav
  accent: string;              // tailwind color
  route: string;               // "/meridian", etc.
  heroPhoto: string;           // unsplash or local
  tiers: Tier[];
};

// ────────────────────────────────────────────────────────────────────────────
// CATALOG
// ────────────────────────────────────────────────────────────────────────────

export const CATALOG: Product[] = [
  // ── Meridian (Client Retention Service) ─────────────────────────────────
  {
    id: 'meridian',
    name: 'Meridian',
    tagline: 'Client Retention, Automated.',
    description:
      'A 12-month program of personalized cards, gifts, and follow-through — built for real estate agents who want to be the only one their clients remember.',
    icon: 'M',
    accent: 'from-[#0f1729] to-[#1e6fb8]',
    route: '/meridian',
    heroPhoto:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    tiers: [
      {
        id: 'meridian-foundation',
        name: 'Foundation',
        price: 9900,
        interval: 'year',
        description: 'Perfect for solo agents building their sphere.',
        features: [
          '24 personalized cards per year',
          '4 curated gifts per year',
          'Birthday + closing-day automation',
          'Email follow-up sequences',
          'Basic client tracking dashboard',
          'Up to 100 active clients',
        ],
        cta: 'Get Started',
      },
      {
        id: 'meridian-professional',
        name: 'Professional',
        price: 19900,
        interval: 'year',
        description: 'For top-producing agents with growing databases.',
        features: [
          'Everything in Foundation',
          '48 personalized cards per year',
          '12 curated gifts per year',
          'Anniversary + holiday automation',
          'SMS + email follow-up',
          'Advanced client segmentation',
          'Up to 500 active clients',
          'Dedicated account manager',
        ],
        highlight: true,
        cta: 'Get Started',
      },
      {
        id: 'meridian-concierge',
        name: 'Concierge',
        price: 49900,
        interval: 'year',
        description: 'White-glove retention for teams and brokerages.',
        features: [
          'Everything in Professional',
          'Unlimited cards + gifts',
          'Custom gift sourcing',
          'Multi-agent team dashboard',
          'Brokerage-wide campaigns',
          'API access for CRM integration',
          'Unlimited active clients',
          'Priority phone support',
        ],
        cta: 'Contact Sales',
      },
    ],
  },

  // ── VOYPATH (Travel) ────────────────────────────────────────────────────
  {
    id: 'voypath',
    name: 'VOYPATH',
    tagline: 'Plan trips together. Forever.',
    description:
      'Real-time collaborative trip planning with maps, budgets, packing lists, and offline support. Built for couples, families, friend groups, and travel agencies.',
    icon: 'V',
    accent: 'from-[#1e6fb8] to-[#5a9fd4]',
    route: '/voypath',
    heroPhoto:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80',
    tiers: [
      {
        id: 'voypath-solo',
        name: 'Solo',
        price: 0,
        interval: 'month',
        description: 'Free for solo travelers.',
        features: [
          '3 active trips',
          '1 user',
          'Maps + budgets + packing lists',
          'PWA support (install to phone)',
          'Email support',
        ],
        cta: 'Start Free',
      },
      {
        id: 'voypath-explorer',
        name: 'Explorer',
        price: 799,
        interval: 'month',
        description: 'For couples and small groups.',
        features: [
          'Unlimited trips',
          'Up to 5 users',
          'Real-time collaboration',
          'Shared budgets + voting',
          'Offline mode',
          'Document storage (1GB)',
        ],
        cta: 'Get Started',
      },
      {
        id: 'voypath-crew',
        name: 'Crew',
        price: 1999,
        interval: 'month',
        description: 'For travel clubs and small agencies.',
        features: [
          'Unlimited trips',
          'Up to 20 users',
          'Team trip templates',
          'Advanced permissions',
          'Document storage (10GB)',
          'Custom branding',
        ],
        highlight: true,
        cta: 'Get Started',
      },
      {
        id: 'voypath-agency',
        name: 'Agency',
        price: 9999,
        interval: 'month',
        description: 'White-label for travel agencies.',
        features: [
          'Unlimited trips + users',
          'White-label branding',
          'Client-facing portal',
          'API + webhook access',
          'Document storage (100GB)',
          'Dedicated success manager',
        ],
        cta: 'Contact Sales',
      },
    ],
  },

  // ── APEX (Regulatory Intelligence) ──────────────────────────────────────
  {
    id: 'apex',
    name: 'APEX',
    tagline: 'Regulatory intelligence, on tap.',
    description:
      'Real-time EPA, legal, and chemical regulation tracking. State-by-state, with AI-powered alerts. Built for compliance officers, EHS teams, and legal departments.',
    icon: 'A',
    accent: 'from-[#0f1729] to-[#175a99]',
    route: '/apex',
    heroPhoto:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80',
    tiers: [
      {
        id: 'apex-free',
        name: 'Free',
        price: 0,
        interval: 'month',
        description: 'Sample APEX data and weekly digest.',
        features: [
          'Federal register weekly digest',
          '3 saved searches',
          'Email-only alerts',
          'Public API (rate-limited)',
        ],
        cta: 'Start Free',
      },
      {
        id: 'apex-state',
        name: 'State Single',
        price: 4900,
        interval: 'month',
        description: 'Track one state in depth.',
        features: [
          'Real-time updates for 1 state',
          'EPA + state regulations',
          'Chemical inventory tracking',
          'SMS + email alerts',
          '10 saved searches',
          'PDF report builder',
        ],
        cta: 'Get Started',
      },
      {
        id: 'apex-bundle',
        name: 'State Bundle',
        price: 19900,
        interval: 'month',
        description: 'All 50 states, federal, and 12 industry verticals.',
        features: [
          'All 50 states + DC + federal',
          '12 industry verticals',
          'AI-powered impact analysis',
          'Unlimited saved searches',
          'Multi-user workspace (5 seats)',
          'Priority support',
        ],
        highlight: true,
        cta: 'Get Started',
      },
      {
        id: 'apex-federal',
        name: 'Federal Enterprise',
        price: 99900,
        interval: 'month',
        description: 'White-glove for federal contractors and agencies.',
        features: [
          'Everything in State Bundle',
          'SAM.gov + FAR integration',
          'Custom regulation feeds',
          'Unlimited seats',
          'SSO + SCIM',
          'Dedicated compliance officer',
        ],
        cta: 'Contact Sales',
      },
    ],
  },

  // ── Services (one-off gigs) ─────────────────────────────────────────────
  {
    id: 'services',
    name: 'Services',
    tagline: 'Done-for-you digital services.',
    description:
      'Custom integrations, automation, design, and brand work. Fixed-price engagements delivered on time.',
    icon: 'S',
    accent: 'from-[#1a2233] to-[#3a4253]',
    route: '/services',
    heroPhoto:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80',
    tiers: [
      {
        id: 'service-graphic-30day',
        name: '30-Day Social Bundle',
        price: 9900,
        interval: 'one-time',
        description: '30 days of social media graphics, ready to post.',
        features: [
          '30 custom graphics',
          'Brand-aligned color palette',
          '3 rounds of revisions',
          'Source files (Figma + PNG)',
          'Delivered in 7 business days',
        ],
        cta: 'Order Now',
      },
      {
        id: 'service-zapier',
        name: 'Zapier Automation',
        price: 49900,
        interval: 'one-time',
        description: 'Custom Zapier flows for CRM, email, and spreadsheets.',
        features: [
          'Up to 5 Zaps',
          'CRM + email + spreadsheet',
          'Error handling + retry logic',
          'Loom walkthrough video',
          '30 days of bug-fix support',
        ],
        cta: 'Order Now',
      },
      {
        id: 'service-landing',
        name: 'Landing Page',
        price: 149900,
        interval: 'one-time',
        description: 'High-converting landing page design + build.',
        features: [
          'Figma + XD design files',
          'Next.js + Tailwind build',
          'Mobile responsive',
          'Stripe + Supabase wiring',
          'Deployed to Vercel',
        ],
        highlight: true,
        cta: 'Order Now',
      },
      {
        id: 'service-brand',
        name: 'Brand Identity System',
        price: 499900,
        interval: 'one-time',
        description: 'Logo, color, type, and full collateral system.',
        features: [
          'Logo + wordmark',
          'Color palette + typography',
          'Brand guidelines (40+ pages)',
          'Social templates + business cards',
          'Source files in all formats',
        ],
        cta: 'Order Now',
      },
    ],
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

export function findProduct(id: string): Product | undefined {
  return CATALOG.find((p) => p.id === id);
}

export function findTier(productId: string, tierId: string): Tier | undefined {
  return findProduct(productId)?.tiers.find((t) => t.id === tierId);
}

export function formatPrice(cents: number, interval: Tier['interval'] = 'month'): string {
  if (cents === 0) return 'Free';
  const dollars = cents / 100;
  const formatted = dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`;
  if (interval === 'one-time') return formatted;
  if (interval === 'year') return `${formatted}/yr`;
  return `${formatted}/mo`;
}
