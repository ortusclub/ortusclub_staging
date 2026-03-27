"use client";

import { useEffect, useState } from "react";

const slides = [
  "/f1.png",   // F1 — Paddock Club view
  "https://images.unsplash.com/photo-1762013315117-1c8005ad2b41?w=1920&q=80&auto=format&fit=crop",   // Football — Allianz Arena packed, floodlit
  "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1920&q=80&auto=format&fit=crop",   // Basketball — NBA arena packed
  "https://media.cnn.com/api/v1/images/stellar/prod/220420110759-01-wimbledon-center-court-2021.jpg?c=16x9&q=h_1080,w_1920,c_fill",   // Tennis — Wimbledon Centre Court, grass visible, packed stands
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=80&auto=format&fit=crop",   // Cricket — packed stadium at dusk with floodlights
  "https://images.unsplash.com/photo-1631746556116-7559088141d6?w=1920&q=80&auto=format&fit=crop",   // Horse Racing — Flemington racecourse crowd
  "https://cdn.boatinternational.com/convert/bi_prd/bi/library_images/royvXCOoR6DTLUvAAK2Q_Emirates-Team-New-Zealand-racing-in-the-35th-Americas-cup-credit-acea-sander-van-der-borch.jpg/r[width]=1920/royvXCOoR6DTLUvAAK2Q_Emirates-Team-New-Zealand-racing-in-the-35th-Americas-cup-credit-acea-sander-van-der-borch.jpg",   // Sailing — America's Cup, Team NZ foiling
  "https://images.unsplash.com/photo-1742498626135-67a7d3501eff?w=1920&q=80&auto=format&fit=crop",   // Golf — aerial prestigious course
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
      {slides.map((src, index) => {
        // Custom positioning per slide
        let bgPos = "center";
        if (index === 7) bgPos = "center 40%";   // Golf aerial — show the fairway

        return (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: bgPos,
              opacity: index === current ? 1 : 0,
            }}
          />
        );
      })}

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
          <em>The Ortus Club Sports</em>
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
