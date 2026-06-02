// components/Icons.tsx
// Custom icon set for Meridian. Hand-built SVGs to match the brand.

type IconProps = { className?: string; name: string };

const common = (className?: string) => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function TierIcon({ name, className }: { name: 'envelope' | 'gift' | 'star'; className?: string }) {
  if (name === 'envelope') {
    return (
      <svg {...common(className)}>
        <rect x="3" y="6" width="18" height="13" rx="1" />
        <path d="M3 8l9 6 9-6" />
      </svg>
    );
  }
  if (name === 'gift') {
    return (
      <svg {...common(className)}>
        <rect x="3" y="9" width="18" height="11" rx="1" />
        <path d="M3 13h18M12 9v11" />
        <path d="M12 9c-2-3-6-2-6 0s4 1 6 0c2 1 6 2 6 0s-4-3-6 0z" />
      </svg>
    );
  }
  // star
  return (
    <svg {...common(className)}>
      <path d="M12 3l2.5 5.5 6 0.8-4.4 4 1.1 6L12 16.5 6.8 19.3l1.1-6L3.5 9.3l6-0.8L12 3z" />
    </svg>
  );
}

export function PillarIcon({ name, className }: { name: 'person' | 'gift' | 'heart' | 'clock' | 'star' | 'pen'; className?: string }) {
  if (name === 'person') {
    return (
      <svg {...common(className)}>
        <circle cx="12" cy="7" r="3.5" />
        <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
      </svg>
    );
  }
  if (name === 'gift') {
    return (
      <svg {...common(className)}>
        <rect x="3" y="9" width="18" height="11" rx="1" />
        <path d="M3 13h18M12 9v11" />
        <path d="M12 9c-2-3-6-2-6 0s4 1 6 0" />
      </svg>
    );
  }
  if (name === 'heart') {
    return (
      <svg {...common(className)}>
        <path d="M20.8 7.5c-1.5-1.5-4-1.5-5.5 0L12 10.7l-3.3-3.2c-1.5-1.5-4-1.5-5.5 0s-1.5 4 0 5.5L12 21l8.8-8c1.5-1.5 1.5-4 0-5.5z" />
      </svg>
    );
  }
  if (name === 'clock') {
    return (
      <svg {...common(className)}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  if (name === 'star') {
    return (
      <svg {...common(className)}>
        <path d="M12 3l2.5 5.5 6 0.8-4.4 4 1.1 6L12 16.5 6.8 19.3l1.1-6L3.5 9.3l6-0.8L12 3z" />
      </svg>
    );
  }
  // pen
  return (
    <svg {...common(className)}>
      <path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" />
      <path d="M14 5l3 3" />
    </svg>
  );
}

export function AddonIcon({ name, className }: { name: 'home' | 'rings' | 'baby' | 'card' | 'agent'; className?: string }) {
  if (name === 'home') {
    return (
      <svg {...common(className)}>
        <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9z" />
      </svg>
    );
  }
  if (name === 'rings') {
    return (
      <svg {...common(className)}>
        <circle cx="9" cy="14" r="5" />
        <circle cx="15" cy="14" r="5" />
      </svg>
    );
  }
  if (name === 'baby') {
    return (
      <svg {...common(className)}>
        <circle cx="12" cy="9" r="3.5" />
        <path d="M8 9c0-2.2 1.8-4 4-4s4 1.8 4 4" />
        <path d="M6 21c0-3 2.5-5 6-5s6 2 6 5" />
      </svg>
    );
  }
  if (name === 'card') {
    return (
      <svg {...common(className)}>
        <rect x="3" y="6" width="18" height="13" rx="1" />
        <path d="M3 10h18" />
        <path d="M7 15h3" />
      </svg>
    );
  }
  // agent (person with tie/badge)
  return (
    <svg {...common(className)}>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
    </svg>
  );
}
