// components/Icons.tsx
// Meridian brand icons + the three-phone slide-module wireframe.

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
  return (
    <svg {...common(className)}>
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// PhoneFrame — the slide-module three-phone wireframe
// Three variants: 'splash' | 'browse' | 'detail'
// The middle phone (browse) shows the real Meridian referral mobile screen.
// ──────────────────────────────────────────────────────────────────────────

export function PhoneFrame({ variant, className = "" }: { variant: 'splash' | 'browse' | 'detail'; className?: string }) {
  return (
    <div className={`phone-frame flex-shrink-0 ${className}`}>
      <div className="phone-notch" />
      <div className="phone-screen">
        {variant === 'splash' ? <SplashScreen /> :
         variant === 'browse' ? <BrowseScreen /> :
         <DetailScreen />}
      </div>
    </div>
  );
}

function SplashScreen() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-navy-900 via-brand-700 to-brand-400 flex flex-col items-center justify-center text-white p-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(135,192,232,0.4)]">
        <span className="font-serif italic text-2xl">M</span>
      </div>
      <h2 className="font-serif italic text-3xl mb-1 leading-none">Meridian</h2>
      <p className="text-[10px] text-navy-200 mb-4">Client Retention Service</p>
      <button className="bg-white text-navy-900 font-semibold px-6 py-2 rounded-pill text-[10px] tracking-widest uppercase">
        Get Started
      </button>
    </div>
  );
}

function BrowseScreen() {
  // The Meridian mobile app — referral receive screen (matches panel-6/7 imagery)
  return (
    <div className="h-full w-full bg-ink-900 text-white flex flex-col">
      {/* Status bar */}
      <div className="flex justify-between items-center px-5 py-2 text-[10px]">
        <span>11:47</span>
        <span className="flex gap-1">
          <span>●●●</span>
          <span>📶</span>
          <span>🔋</span>
        </span>
      </div>

      {/* Caller header */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="text-[10px] tracking-widest uppercase text-navy-200 mb-2">Incoming</div>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center mb-3 text-2xl font-serif">
          M
        </div>
        <div className="font-serif text-xl text-cream-50 mb-1">Referral</div>
        <div className="text-xs text-navy-200">from Meridian Network</div>
        <div className="mt-3 px-2 py-1 bg-white/5 rounded-pill text-[9px] tracking-widest uppercase">
          Past Client
        </div>
      </div>

      {/* Action buttons (mimic Decline / Accept from real screen) */}
      <div className="px-6 pb-8 pt-4 flex justify-around items-center">
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-red-500/90 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
              <path d="M21 15.4l-2.5-.3c-.5-.1-.9-.4-1-.9l-.5-1.4c-.2-.5 0-1 .4-1.3l1.6-1.3c-1-2.2-2.7-3.9-4.9-4.9l-1.3 1.6c-.3.4-.8.5-1.3.4L9.6 6.9c-.5-.1-.8-.5-.9-1L8.4 3.4C5.4 3.7 3 6.3 3 9.4c0 6.4 5.2 11.6 11.6 11.6 3.1 0 5.7-2.4 6-5.4z" />
            </svg>
          </div>
          <span className="text-[8px] tracking-widest uppercase text-navy-200">Decline</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-cream-50">
              <path d="M12 14c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3S9 3.3 9 5v6c0 1.7 1.3 3 3 3zM17 11c0 2.8-2.2 5-5 5s-5-2.2-5-5H5c0 3.5 2.6 6.4 6 6.9V21h2v-3.1c3.4-.5 6-3.4 6-6.9h-2z" />
            </svg>
          </div>
          <span className="text-[8px] tracking-widest uppercase text-navy-200">Message</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-full bg-emerald-500/90 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-white">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[8px] tracking-widest uppercase text-navy-200">Accept</span>
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-24 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
}

function DetailScreen() {
  // Tier detail — "Entry Card Plan" view
  return (
    <div className="h-full w-full bg-cream-50 flex flex-col">
      <div className="relative h-2/5 bg-gradient-to-br from-navy-900 to-brand-600 flex items-end p-3">
        <span className="text-cream-50 text-[10px] tracking-widest uppercase font-semibold">Tier Detail</span>
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/95 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>
      <div className="flex-1 bg-white -mt-2 rounded-t-2xl p-3 flex flex-col">
        <div className="font-serif text-sm font-semibold text-ink-900 mb-1">Entry Card Plan</div>
        <div className="text-[9px] text-ink-500 mb-2">Automated cards · 50 clients</div>
        <div className="flex gap-1 mb-2">
          {['Overview', 'Details'].map((t, i) => (
            <div key={t} className={`text-[8px] px-2 py-1 rounded ${i === 0 ? 'bg-ink-900 text-cream-50' : 'text-ink-500'}`}>
              {t}
            </div>
          ))}
        </div>
        <div className="text-2xl font-serif text-ink-900 mb-2">$10<span className="text-[10px] text-ink-500">/mo</span></div>
        <button className="mt-auto w-full bg-ink-900 text-cream-50 py-2 rounded text-[10px] tracking-widest uppercase font-semibold">
          Get Started
        </button>
      </div>
    </div>
  );
}
