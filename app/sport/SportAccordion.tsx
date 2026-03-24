"use client";

import { useState } from "react";

const SPORTS = [
  {
    name: "Formula 1",
    image: "https://images.unsplash.com/photo-1580651214613-f4692d6d138f?w=1200&q=80",
    description: "Experience the pinnacle of motorsport from Paddock Club suites and exclusive hospitality at every Grand Prix on the 2026 calendar.",
  },
  {
    name: "Football",
    image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200&q=80",
    description: "From the FIFA World Cup to El Clásico and the Champions League Final — premium hospitality at the world's biggest football events.",
  },
  {
    name: "Golf",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80",
    description: "The Masters, The Open, the Ryder Cup and more. Corporate hospitality at the most prestigious golf events worldwide.",
  },
  {
    name: "Basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80",
    description: "Courtside at the NBA Finals, All-Star Weekend, and March Madness. Premium basketball hospitality across the USA and Europe.",
  },
  {
    name: "Tennis",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80",
    description: "Wimbledon debenture seats, Roland Garros suites, and US Open hospitality. All four Grand Slams and ATP/WTA events.",
  },
  {
    name: "Sailing",
    image: "https://images.unsplash.com/photo-1534854638093-bada1813ca19?w=1200&q=80",
    description: "The America's Cup, Cowes Week, and Sydney to Hobart. Yacht-based hospitality on the world's most prestigious waters.",
  },
  {
    name: "Rugby",
    image: "https://images.unsplash.com/photo-1567220720374-a67f33b2a6b9?w=1200&q=80",
    description: "Six Nations, the Nations Championship, and Hong Kong Sevens. Premium rugby hospitality at Twickenham and beyond.",
  },
  {
    name: "Cricket",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80",
    description: "Lord's Test Matches, The Ashes, IPL, and T20 World Cup. Traditional hospitality at cricket's finest grounds.",
  },
  {
    name: "Horse Racing",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
    description: "Royal Ascot, the Kentucky Derby, and Dubai World Cup. The finest boxes and enclosures at the world's top racecourses.",
  },
  {
    name: "Polo",
    image: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=1200&q=80",
    description: "Guards Polo Club, Argentine Open, and exclusive private matches. The sport of kings with bespoke hospitality.",
  },
  {
    name: "Motorsport",
    image: "https://images.unsplash.com/photo-1504016798967-59a258e9386d?w=1200&q=80",
    description: "Le Mans 24 Hours, Indianapolis 500, Goodwood, and MotoGP. Paddock access and premium suites at iconic circuits.",
  },
  {
    name: "Skiing",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80",
    description: "Milan-Cortina 2026 Winter Olympics and the world's finest alpine resorts. VIP access to elite winter sport events.",
  },
];

export default function SportAccordion() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 px-8">
      <h2
        className="text-center text-4xl mb-10"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 400,
          color: "#111",
        }}
      >
        Our <em>Sporting Events</em>
      </h2>

      <div
        className="max-w-7xl mx-auto flex overflow-hidden"
        style={{ borderRadius: "16px", height: "520px" }}
      >
        {SPORTS.map((sport, i) => {
          const isActive = hovered === i;
          return (
            <div
              key={sport.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative overflow-hidden cursor-pointer"
              style={{
                flex: isActive ? "4" : "1",
                transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                minWidth: 0,
              }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${sport.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Dark overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  backgroundColor: isActive
                    ? "rgba(0,0,0,0.45)"
                    : "rgba(0,0,0,0.55)",
                }}
              />

              {/* Collapsed state: vertical text */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                style={{ opacity: isActive ? 0 : 1 }}
              >
                <span
                  className="text-white text-sm tracking-widest whitespace-nowrap"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.1rem",
                    letterSpacing: "0.15em",
                  }}
                >
                  {sport.name}
                </span>
              </div>

              {/* Expanded state: details */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-8 transition-opacity duration-500"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                <h3
                  className="text-white text-3xl mb-3"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  {sport.name}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-md">
                  {sport.description}
                </p>
                <a
                  href="#catalogue"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
                  style={{ color: "#F7BE68" }}
                >
                  View Events
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
