// components/LeadForm.tsx
"use client";
import { useState } from "react";

export function LeadForm({ product }: { product: string }) {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const f = e.currentTarget;
    const body = {
      name: (f.elements.namedItem("name") as HTMLInputElement).value,
      email: (f.elements.namedItem("email") as HTMLInputElement).value,
      phone: (f.elements.namedItem("phone") as HTMLInputElement).value,
      notes: (f.elements.namedItem("notes") as HTMLTextAreaElement).value,
      product,
      tier: "lead",
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submit failed");
      setOk(true);
      f.reset();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-3">🎯</div>
        <h3 className="text-2xl font-bold text-navy-900 mb-2">Got it.</h3>
        <p className="text-navy-500">We'll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-navy-700 mb-1">Name</label>
        <input name="name" className="w-full px-4 py-3 border border-navy-200 rounded-xl" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy-700 mb-1">Email *</label>
          <input name="email" type="email" required className="w-full px-4 py-3 border border-navy-200 rounded-xl" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy-700 mb-1">Phone</label>
          <input name="phone" type="tel" className="w-full px-4 py-3 border border-navy-200 rounded-xl" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-navy-700 mb-1">Tell us about your business</label>
        <textarea name="notes" rows={3} className="w-full px-4 py-3 border border-navy-200 rounded-xl" />
      </div>
      {error ? <p className="text-sm text-accent-600">{error}</p> : null}
      <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
        {loading ? "Sending..." : "Get in touch"}
      </button>
    </form>
  );
}
