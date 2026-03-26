"use client";

import { useState } from "react";

const sports = [
  {
    title: "Formula 1",
    description:
      "From Monaco to Silverstone, experience the pinnacle of motorsport from Paddock Club suites and exclusive hospitality.",
    bg: "https://images.unsplash.com/photo-1635414765065-0924107bf919?w=1200&q=80",
  },
  {
    title: "Tennis",
    description:
      "Grand Slam hospitality at Wimbledon, Roland Garros, and the US Open. Debenture seats and private suites.",
    bg: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&q=80",
  },
  {
    title: "Football",
    description:
      "Premium matchday experiences across the Premier League, Champions League, and World Cup.",
    bg: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80",
  },
  {
    title: "Golf",
    description:
      "The Masters, The Open, and the Ryder Cup. The perfect setting for building lasting relationships.",
    bg: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",
  },
  {
    title: "Horse Racing",
    description:
      "Royal Ascot, the Derby, and the Melbourne Cup. Champagne hospitality at the world's finest racecourses.",
    bg: "https://images.unsplash.com/photo-1631448829489-6228f21df74c?w=1200&q=80",
  },
  {
    title: "Basketball",
    description:
      "Courtside at the NBA Finals, All-Star Weekend, and March Madness. Premium experiences across the USA.",
    bg: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  },
  {
    title: "Sailing",
    description:
      "America's Cup regattas and luxury yacht experiences. Executive gatherings on the world's most prestigious waters.",
    bg: "https://images.unsplash.com/photo-1759809278965-cce79bb60611?w=800&q=80",
  },
  {
    title: "Rugby",
    description:
      "Six Nations, World Cup, and Premiership hospitality. Pitch-side experiences at the most intense fixtures.",
    bg: "https://images.unsplash.com/photo-1725531140748-41a15c7d9340?w=800&q=80",
  },
  {
    title: "Cricket",
    description:
      "Lord's, The Ashes, and IPL. Long-form networking over a day of world-class cricket.",
    bg: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
  },
  {
    title: "Polo",
    description:
      "Guards Polo Club, Cartier Queen's Cup, and international tournaments. Where sport meets sophistication.",
    bg: "https://images.unsplash.com/photo-1742672631961-b0413e12113d?w=1200&q=80",
  },
  {
    title: "Motorsport",
    description:
      "Le Mans 24hr, MotoGP, and rally championships. Garage access and hospitality at iconic circuits.",
    bg: "https://images.unsplash.com/photo-1761092993834-967c046f0fa4?w=800&q=80",
  },
  {
    title: "Skiing",
    description:
      "Alpine hospitality at World Cup events and curated executive retreats in Verbier and St. Moritz.",
    bg: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
  },
];

/*
  Editorial layout: alternating row compositions
  Row A: 1 large (7fr) + 1 narrow (5fr)       — asymmetric duo
  Row B: 3 equal columns                       — balanced trio
  This creates a magazine-style rhythm.
*/
const rows: { indices: number[]; template: string; height: string }[] = [
  { indices: [0, 1],       template: "7fr 5fr",       height: "480px" },
  { indices: [2, 3, 4],    template: "1fr 1fr 1fr",   height: "360px" },
  { indices: [5, 6],       template: "5fr 7fr",       height: "480px" },
  { indices: [7, 8, 9],    template: "1fr 1fr 1fr",   height: "360px" },
  { indices: [10, 11],     template: "1fr 1fr",        height: "420px" },
];

function SportCard({
  sport,
  isHovered,
  onEnter,
  onLeave,
  tall,
}: {
  sport: (typeof sports)[number];
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  tall: boolean;
}) {
  return (
    <a
      href="#"
      className="group relative block overflow-hidden"
      style={{ borderRadius: "14px" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Background with zoom */}
      <div
        className="absolute inset-0 transition-transform duration-[900ms] ease-out"
        style={{
          backgroundImage: `url(${sport.bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-600"
        style={{
          background: isHovered
            ? "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.08) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.10) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col justify-end"
        style={{ padding: tall ? "36px" : "28px" }}
      >
        {/* Sport title */}
        <h3
          className="text-white mb-2"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
            fontSize: tall ? "2.6rem" : "1.8rem",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          {sport.title}
        </h3>

        {/* Gold accent line */}
        <div
          className="transition-all duration-600"
          style={{
            width: isHovered ? "56px" : "28px",
            height: "1.5px",
            backgroundColor: "#F7BE68",
            opacity: isHovered ? 1 : 0.5,
            marginBottom: "12px",
          }}
        />

        {/* Description — reveals on hover */}
        <div
          className="overflow-hidden transition-all duration-600"
          style={{
            maxHeight: isHovered ? "140px" : "0px",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <p
            className="text-white/80 leading-relaxed mb-5"
            style={{
              fontSize: "0.88rem",
              maxWidth: "440px",
              lineHeight: 1.65,
            }}
          >
            {sport.description}
          </p>
          <span
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase"
            style={{ color: "#F7BE68" }}
          >
            Explore
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function SportsBookshelf() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 md:px-12" style={{ backgroundColor: "#fafaf9" }}>
      <div className="max-w-[1320px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-5"
            style={{ color: "#F7BE68" }}
          >
            Explore Our World
          </p>
          <h2
            className="text-5xl md:text-6xl mb-6"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
              color: "#1a1a1a",
            }}
          >
            Our <em>Sporting Events</em>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span
              className="block h-px w-20"
              style={{ background: "rgba(247,190,104,0.4)" }}
            />
            <span
              className="block w-1.5 h-1.5 rounded-full"
              style={{ background: "#F7BE68" }}
            />
            <span
              className="block h-px w-20"
              style={{ background: "rgba(247,190,104,0.4)" }}
            />
          </div>
        </div>

        {/* Editorial rows */}
        <div className="flex flex-col" style={{ gap: "20px" }}>
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="grid"
              style={{
                gridTemplateColumns: row.template,
                gap: "20px",
                height: row.height,
              }}
            >
              {row.indices.map((sportIdx) => {
                const sport = sports[sportIdx];
                if (!sport) return null;
                const isTallRow = row.indices.length <= 2;
                return (
                  <SportCard
                    key={sport.title}
                    sport={sport}
                    isHovered={hoveredIndex === sportIdx}
                    onEnter={() => setHoveredIndex(sportIdx)}
                    onLeave={() => setHoveredIndex(null)}
                    tall={isTallRow}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
