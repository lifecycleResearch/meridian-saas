// components/RegisterForm.tsx
// Registration form for realtors. Submits to /api/lead.

"use client";
import { useState } from "react";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [brokerage, setBrokerage] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("foundation");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          product: "meridian",
          tier: `meridian-${selectedPackage}`,
          name, email, phone, brokerage,
        }),
      });
    } catch {}
    setDone(true);
    setLoading(false);
  };

  if (done) {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-400/10 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-gold-400">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-ink-900 mb-2">You're on the list.</h3>
        <p className="text-ink-500 text-sm">We'll reach out to {email} within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-6 space-y-4">
      {/* Package Select */}
      <div>
        <label className="block text-xs tracking-widest uppercase text-ink-500 mb-2">Select Package</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "foundation", name: "Foundation", price: "$199" },
            { id: "concierge", name: "Concierge", price: "$499" },
          ].map(pkg => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedPackage(pkg.id)}
              className={`p-3 rounded text-left border transition ${
                selectedPackage === pkg.id
                  ? "border-gold-400 bg-cream-50 shadow-gold"
                  : "border-ink-800/10 hover:border-ink-800/30"
              }`}
            >
              <div className="font-serif text-sm text-ink-900">{pkg.name}</div>
              <div className="text-xs text-ink-500">{pkg.price}/client</div>
            </button>
          ))}
        </div>
      </div>

      {/* Fields */}
      <Field label="Name" value={name} onChange={setName} required />
      <Field label="Email" value={email} onChange={setEmail} type="email" required />
      <Field label="Phone" value={phone} onChange={setPhone} type="tel" />
      <Field label="Brokerage" value={brokerage} onChange={setBrokerage} />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold-400 text-white text-xs tracking-widest uppercase font-semibold py-3 rounded-pill hover:bg-gold-500 transition disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Register Now"}
      </button>
    </form>
  );
}

function Field({ label, value, onChange, type = "text", required = false }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs tracking-widest uppercase text-ink-500 mb-1 block">{label}{required ? " *" : ""}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className="w-full px-3 py-2.5 bg-white border border-ink-800/15 rounded text-ink-900 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
      />
    </label>
  );
}
