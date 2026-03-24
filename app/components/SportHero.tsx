"use client";

import { useEffect, useState } from "react";

const slides = [
  "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=1920&q=80",   // F1
  "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1920&q=80",   // Football stadium
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1920&q=80",   // Golf
  "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920&q=80",      // Basketball
  "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1920&q=80",      // Tennis
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?w=1920&q=80",   // Sailing
  "https://images.unsplash.com/photo-1529753253655-470be9a42781?w=1920&q=80",   // Horse racing
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=80",   // Stadium wide
];

export default function SportHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[88vh] flex items-end overflow-hidden">
      {/* Slideshow images */}
      {slides.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: index === current ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay — lighter for the sailing/water slide */}
      <div
        className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: current === 6 ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.7)" }}
      />

      {/* Content */}
      <div className="relative z-10 px-12 pb-20 max-w-4xl">
        <h1
          className="text-white text-7xl leading-tight mb-6"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
        >
          <em>Ortus Sport</em>
        </h1>
        <p
          className="text-white/80 text-lg mb-8 max-w-2xl"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Impress and delight your clients by hosting them at world-class sporting events. Give them an experience they won&apos;t forget — the perfect ground to build and continue lasting business relationships.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            className="px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#F7BE68" }}
          >
            Request to Join
          </a>
          <a
            href="#"
            className="px-7 py-3 rounded-full text-white text-sm font-medium border border-white hover:bg-white hover:text-black transition-colors"
          >
            Become a Host
          </a>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="transition-all duration-300"
            style={{
              width: index === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: index === current ? "#F7BE68" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
