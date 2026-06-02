// components/ProductImages.tsx
// Real Meridian product images — no placeholders.

const images = [
  { src: "/images/meridian-grid-top-1.jpg", alt: "Handwritten card with gold M seal" },
  { src: "/images/meridian-grid-top-2.jpg", alt: "Hands holding house keychain" },
  { src: "/images/meridian-grid-top-3.jpg", alt: "Black Meridian gift box with Enjoy." },
  { src: "/images/meridian-grid-bot-1.jpg", alt: "Framed family photo" },
  { src: "/images/meridian-grid-bot-2.jpg", alt: "Cream envelope with gold M seal" },
  { src: "/images/meridian-grid-bot-3.jpg", alt: "Phone showing Referral mobile" },
  { src: "/images/meridian-grid-bot-4.jpg", alt: "Ceramic coffee mug with olive branch" },
];

export function ProductImages() {
  return (
    <section className="py-12 bg-cream-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Real Moments</div>
          <h2 className="font-serif text-2xl text-ink-900">Every touchpoint, crafted by hand.</h2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
          {images.map((img, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden shadow-soft border border-ink-800/10">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
