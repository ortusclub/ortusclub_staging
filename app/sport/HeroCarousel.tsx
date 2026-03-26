"use client";

import { useState, useEffect, useCallback } from "react";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1800&q=80",
    alt: "Swimming pool aerial",
  },
  {
    image: "/f1.png",
    alt: "Formula 1 Red Bull car in the rain",
  },
  {
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1800&q=80",
    alt: "Tennis court",
  },
  {
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1800&q=80",
    alt: "Football stadium",
  },
  {
    image: "/golf.jpg",
    alt: "Golf tee at links course",
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1800&q=80",
    alt: "Horse racing",
  },
  {
    image: "https://images.unsplash.com/photo-1567220720374-a67f33b2a6b9?w=1800&q=80",
    alt: "Rugby match",
  },
  {
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80",
    alt: "Boxing ring",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "80vh" }}>
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* Dark gradient overlay — heavier at bottom-left for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.4) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.25) 50%)",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-28 px-10 md:px-16 max-w-4xl">
        <h1
          className="text-white mb-6"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
            fontSize: "clamp(3rem, 6vw, 5rem)",
            lineHeight: 1.05,
            fontStyle: "italic",
          }}
        >
          Ortus Sport
        </h1>
        <p
          className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
          style={{ fontWeight: 300 }}
        >
          Impress and delight your clients by hosting them at world-class
          sporting events. Give them an experience they won&apos;t forget
          &mdash; the perfect ground to build and continue lasting business
          relationships.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="px-8 py-3.5 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#F7BE68" }}
          >
            Request to Join
          </a>
          <a
            href="#"
            className="px-8 py-3.5 rounded-full text-white text-sm font-medium border border-white hover:bg-white hover:text-black transition-colors"
          >
            Become a Host
          </a>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="transition-all duration-300 rounded-full cursor-pointer"
            style={{
              width: i === current ? 28 : 10,
              height: 10,
              backgroundColor:
                i === current ? "#F7BE68" : "rgba(255,255,255,0.4)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
