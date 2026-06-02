// components/BottomTabs.tsx
// Bottom tab nav. Every tab ultimately leads to register + 2 packages.
// Sticky on mobile, inline on desktop.

"use client";
import { useState } from "react";
import { RegisterModal } from "./RegisterModal";

type TabKey = "home" | "packages" | "register" | "story" | "contact";

const TABS: { key: TabKey; label: string; icon: React.ReactNode; action: "register" | "packages" | "scroll" }[] = [
  { key: "home", label: "Home", action: "scroll", icon: <path d="M3 12L12 3l9 9v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9z" /> },
  { key: "packages", label: "Packages", action: "packages", icon: <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" /> },
  { key: "register", label: "Register", action: "register", icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM19 8v6M22 11h-6" /> },
  { key: "story", label: "Story", action: "scroll", icon: <path d="M12 2v6M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M22 12h-6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" /> },
  { key: "contact", label: "Contact", action: "register", icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /> },
];

export function BottomTabs() {
  const [open, setOpen] = useState<null | "register" | "packages">(null);

  return (
    <>
      <nav className="sticky bottom-0 z-40 bg-cream-50 border-t border-ink-800/10 backdrop-blur">
        <div className="container">
          <ul className="grid grid-cols-5">
            {TABS.map(tab => (
              <li key={tab.key}>
                <button
                  onClick={() => {
                    if (tab.action === "register") setOpen("register");
                    else if (tab.action === "packages") setOpen("packages");
                    else if (tab.key === "home") window.scrollTo({ top: 0, behavior: "smooth" });
                    else if (tab.key === "story") {
                      const el = document.getElementById("story");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full flex flex-col items-center gap-1 py-3 text-ink-800 hover:text-gold-400 transition group"
                  aria-label={tab.label}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    {tab.icon}
                  </svg>
                  <span className="text-[10px] tracking-widest uppercase font-semibold">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <RegisterModal
        open={open !== null}
        context={open === "packages" ? "Packages tab" : "Tab nav"}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
