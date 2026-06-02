// components/Logo.tsx
// Meridian brand mark — M in circle with serif font.

export function Logo() {
  return (
    <a href="/" className="flex flex-col items-center" aria-label="Meridian — Client Retention Service">
      <div className="relative w-10 h-10 mb-1 flex items-center justify-center border border-ink-800 rounded-full">
        <span className="font-serif text-xl text-ink-800 leading-none">M</span>
      </div>
      <span className="font-serif text-sm tracking-[0.32em] text-ink-800 leading-none">MERIDIAN</span>
      <span className="text-[8px] tracking-[0.28em] text-ink-500 uppercase leading-none mt-0.5">Client Retention Service</span>
    </a>
  );
}
