// Meridian — Client Retention Service
// Single product. Three tiers. One truth.

export type Tier = {
  id: string;                  // stable id, used for Stripe lookup_keys
  name: string;
  price: number;               // USD cents
  interval: 'month' | 'year' | 'one-time';
  description: string;
  features: string[];
  highlight?: boolean;         // marks the recommended tier
  cta: string;
  trialDays?: number;
};

export type Product = {
  id: 'meridian';
  name: string;
  tagline: string;
  description: string;
  accent: string;
  route: '/';
  heroPhoto: string;
  tiers: Tier[];
};

export const CATALOG: Product[] = [
  {
    id: 'meridian',
    name: 'Meridian',
    tagline: 'Client Retention, Automated.',
    description:
      'A 12-month program of personalized cards, gifts, and follow-through — built for real estate agents who want to be the only one their clients remember.',
    accent: 'from-navy-950 to-brand-600',
    route: '/',
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
];

// ── Helpers ────────────────────────────────────────────────────────────────

export function findProduct(id: string): Product | undefined {
  return CATALOG.find((p) => p.id === id);
}

export function findTier(tierId: string): Tier | undefined {
  return CATALOG[0]?.tiers.find((t) => t.id === tierId);
}

export function formatPrice(cents: number, interval: Tier['interval'] = 'month'): string {
  if (cents === 0) return 'Free';
  const dollars = cents / 100;
  const formatted = dollars % 1 === 0 ? `$${dollars}` : `$${dollars.toFixed(2)}`;
  if (interval === 'one-time') return formatted;
  if (interval === 'year') return `${formatted}/yr`;
  return `${formatted}/mo`;
}
