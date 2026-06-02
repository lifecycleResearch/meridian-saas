// components/CheckoutButton.tsx
"use client";
import { useState } from "react";

export function CheckoutButton({ product, tier, label }: { product: string; tier: string; label: string }) {
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

  return (
    <div className="space-y-2">
      <button onClick={onClick} disabled={loading} className="w-full btn-primary disabled:opacity-50">
        {loading ? "Loading..." : label}
      </button>
      {error ? <p className="text-xs text-accent-600">{error}</p> : null}
    </div>
  );
}
