// app/login/LoginForm.tsx
"use client";
import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import { suggestEmail, isDisposableDomain, extractDomain } from "@/utils/email-verification/mailcheck";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  let sb: ReturnType<typeof createBrowserSupabase> | null = null;
  try { sb = createBrowserSupabase(); } catch { sb = null; }

  async function signInWithGoogle() {
    if (!sb) { setError("Auth not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."); return; }
    setLoading(true);
    setError(null);
    const { error } = await sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
    setLoading(false);
  }

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!sb) { setError("Auth not configured."); return; }

    // LAYER 2: Block disposable email addresses before wasting a send
    const domain = extractDomain(email);
    if (domain && isDisposableDomain(domain)) {
      setError("Disposable email addresses are not allowed. Please use a permanent email.");
      return;
    }

    setLoading(true);
    setError(null);
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
    else setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="text-center py-6">
        <div className="h-script text-5xl mb-3">Check your email</div>
        <p className="text-ink-500 text-sm">Magic link sent to <span className="font-semibold text-ink-800">{email}</span></p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={signInWithGoogle} disabled={loading || !sb} className="w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-white border border-ink-800 text-ink-800 font-semibold text-xs tracking-widest uppercase rounded-pill hover:bg-ink-800 hover:text-cream-50 active:scale-95 transition disabled:opacity-50">
        <svg viewBox="0 0 24 24" width="18" height="18"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-ink-800/10" /></div>
        <div className="relative flex justify-center text-xs tracking-widest uppercase"><span className="bg-cream-50 px-2 text-ink-500">or</span></div>
      </div>
      <form onSubmit={sendMagicLink} className="space-y-3">
        <div>
          <label className="eyebrow block mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => {
              const val = e.target.value;
              setEmail(val);
              if (val.includes("@") && val.length > 7) {
                const suggestion = suggestEmail(val);
                setEmailSuggestion(suggestion?.full ?? null);
              } else {
                setEmailSuggestion(null);
              }
            }}
            onBlur={() => {
              if (email.includes("@")) {
                const suggestion = suggestEmail(email);
                setEmailSuggestion(suggestion?.full ?? null);
              }
            }}
            type="email" required disabled={!sb}
            className="w-full px-4 py-3 bg-cream-100 border border-ink-800/10 rounded-card focus:border-gold-400 outline-none disabled:opacity-50"
          />
        </div>
        {!error && emailSuggestion && emailSuggestion !== email && (
          <div className="flex items-center gap-2 rounded-card border border-gold-400/40 bg-gold-400/10 px-3 py-2 text-sm">
            <svg className="h-4 w-4 flex-shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <span className="text-ink-800">Did you mean{" "}
              <button type="button" onClick={() => { setEmail(emailSuggestion); setEmailSuggestion(null); }} className="font-semibold text-gold-400 underline decoration-gold-400/60 underline-offset-2 hover:text-gold-500">{emailSuggestion}</button>
            ?</span>
          </div>
        )}
        {error ? (
        <div className="space-y-1">
          <p className="text-xs text-red-600">{error}</p>
          {error.toLowerCase().includes("provider") || error.toLowerCase().includes("google") ? (
            <p className="text-xs text-ink-500">
              Enable Google in <a href="https://supabase.com/dashboard/project/qncqiuqjmovdgmsuwopb/auth/providers" target="_blank" rel="noopener" className="text-gold-400 underline">Supabase → Auth → Providers</a>, then add <code className="bg-cream-100 px-1 rounded">https://meridian-saas.vercel.app/auth/callback</code> to the redirect allow-list.
            </p>
          ) : null}
        </div>
      ) : null}
        <button type="submit" disabled={loading || !email || !sb} className="w-full btn-gold disabled:opacity-50">
          {loading ? "Sending..." : "Send Magic Link"}
        </button>
      </form>
    </div>
  );
}
