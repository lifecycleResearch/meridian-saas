// Meridian — Client Retention Service
// Source of truth: the brand mockup at clientretentionservice.com
// Single product. Three tiers. One truth.

export type Tier = {
  id: string;                  // stable id, used for Stripe lookup_keys
  name: string;                // "Entry Card", "Threshold", "Foundation"
  subtitle: string;            // small caps under the name
  price: number;               // USD cents
  interval: 'month' | 'year' | 'one-time';
  description: string;
  features: string[];
  highlight?: boolean;         // marks Foundation as the most popular
  cta: string;
  icon: 'envelope' | 'gift' | 'star';
  // For the gold-bordered "MOST POPULAR" treatment
  popularLabel?: string;
};

export const PRODUCT = {
  id: 'meridian' as const,
  name: 'Meridian',
  wordmark: 'MERIDIAN',
  subtitle: 'CLIENT RETENTION SERVICE',
  description: "The only full-service client retention company built for the premier real estate agent.",
  tagline: {
    serif: 'PRESENCE',
    script: 'Without Pressure.',
    body: ['Nobody remembers another email.', 'People remember '],
    emphasis: 'moments',
    ending: '.',
  },
  brand: {
    domain: 'clientretentionservice.com',
    promise: 'PRESENCE WITHOUT PRESSURE',
  },
  hero: {
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80',
    imageAlt: 'Family opening a Meridian gift box together',
  },
  accent: 'cream', // not navy
  route: '/',
  heroPhoto:
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80',
  tiers: [
    {
      id: 'meridian-entry',
      name: 'Entry Card Plan',
      subtitle: 'ENTRY CARD PLAN',
      price: 1000,
      interval: 'month',
      description: 'Personalized cards delivered automatically for birthdays, anniversaries, holidays, and life’s important moments.',
      features: [
        'Automated birthday cards',
        'Anniversary reminders',
        'Holiday cards',
        'Personalized messages',
        'Up to 50 active clients',
      ],
      cta: 'Get Started',
      icon: 'envelope',
    },
    {
      id: 'meridian-threshold',
      name: 'Threshold',
      subtitle: 'FULL MOMENT PROGRAM',
      price: 9900,
      interval: 'one-time',
      description: 'Personalized moments designed to keep you remembered throughout the year.',
      features: [
        'Up to 12 curated touchpoints',
        'Custom gift sourcing',
        'Anniversary + holiday program',
        'Annual program built for you',
        'Up to 200 active clients',
      ],
      cta: 'Get Started',
      icon: 'gift',
    },
    {
      id: 'meridian-foundation',
      name: 'Foundation',
      subtitle: 'PREMIER MOMENT PROGRAM',
      price: 19900,
      interval: 'one-time',
      description: 'Our complete concierge experience with elevated touchpoints and multi-year follow-through.',
      features: [
        'Everything in Threshold',
        'Unlimited touchpoints per year',
        'Custom gift curation',
        'Multi-year follow-through',
        'Dedicated account manager',
        'Unlimited active clients',
      ],
      cta: 'Get Started',
      icon: 'star',
      highlight: true,
      popularLabel: 'MOST POPULAR',
    },
  ] as Tier[],

  // ── "How it works" 6-pillar grid ────────────────────────────────────────
  pillars: [
    { icon: 'person', title: 'Who We Are', body: 'Meridian is the only full-service client retention company built for the premier real estate agent.' },
    { icon: 'gift', title: 'What We Do', body: 'You send us your client list. We handle everything else. The cards. The gifts. The timing. The follow-through. You never think about it again.' },
    { icon: 'heart', title: 'Why It Matters', body: 'You already paid to acquire that client. You already delivered. The second deal should find you. When the gap between closing and referral is silence, there is no referral.' },
    { icon: 'clock', title: 'How It Works', body: 'Send us your client list. We build the program. Personalized cards and curated gifts delivered at exactly the right moment, for years. Referrals find you.' },
    { icon: 'star', title: 'The Promise', body: 'We are not selling your clients anything. We are architecting loyalty. One moment at a time until you are the only agent they will ever call.' },
    { icon: 'pen', title: 'This Is How Legacies Are Built', body: 'Your business isn’t transactions. It’s a relationship with a city. With families. With the people who trust you with the most important decisions of their lives.' },
  ],

  // ── 5 Add-on cards ──────────────────────────────────────────────────────
  addons: [
    { icon: 'home', title: 'Welcome Home Gift', body: 'Make their new chapter even more memorable.' },
    { icon: 'rings', title: 'Wedding', body: 'Celebrate love and milestone moments.' },
    { icon: 'baby', title: 'Baby & Family', body: 'Thoughtful gifts for life’s most meaningful moments.' },
    { icon: 'card', title: 'Gift Cards', body: 'A perfect thank you or closing gift that always makes an impact.' },
    { icon: 'agent', title: 'Built For Agents Who Want More', body: 'For those who want to lead with service and be remembered for it.' },
  ],
};

// ── Helpers ────────────────────────────────────────────────────────────────

export function findTier(tierId: string): Tier | undefined {
  return PRODUCT.tiers.find((t) => t.id === tierId);
}

export function formatPrice(cents: number, interval: Tier['interval'] = 'month'): string {
  if (cents === 0) return 'Free';
  const dollars = cents / 100;
  const formatted = `$${dollars % 1 === 0 ? dollars : dollars.toFixed(2)}`;
  if (interval === 'one-time') return formatted;
  return formatted;
}
