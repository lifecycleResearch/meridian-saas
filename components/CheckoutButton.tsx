// components/CheckoutButton.tsx
"use client";
import { useState } from "react";

export function CheckoutButton({ product, tier, label, popular }: { product: string; tier: string; label: string; popular?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    const email = prompt("Email to send checkout link to:") || "";
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, tier, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.free) {
        window.location.href = data.signup || "/login";
        return;
      }
      window.location.href = data.url;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  }

  const base = "w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-xs tracking-widest uppercase rounded-pill active:scale-95 transition disabled:opacity-50";
  const variant = popular
    ? "bg-gold-400 text-white hover:bg-gold-500 shadow-soft"
    : "bg-transparent text-ink-800 border border-ink-800 hover:bg-ink-800 hover:text-cream-50";

  return (
    <div className="space-y-2">
      <button onClick={onClick} disabled={loading} className={`${base} ${variant}`}>
        {loading ? "Loading..." : label}
      </button>
      {error ? <p className="text-xs text-red-600 text-center">{error}</p> : null}
    </div>
  );
}
