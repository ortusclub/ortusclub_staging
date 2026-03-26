"use client";

import { useState } from "react";

const sports = [
  {
    title: "Formula 1",
    description:
      "Exclusive hospitality suites at Grand Prix events worldwide, combining the thrill of racing with executive networking. From Monaco to Silverstone, experience the pinnacle of motorsport from the best seats in the house.",
    bg: "/f1.png",
  },
  {
    title: "Football",
    description:
      "Premium matchday experiences at top-tier fixtures across the Premier League, Champions League, and World Cup. Executive boxes, pitch-side hospitality, and behind-the-scenes access.",
    bg: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80",
  },
  {
    title: "Golf",
    description:
      "Curated golf days at prestigious courses and major tournament hospitality at The Masters, The Open, and Ryder Cup. The perfect setting for building lasting business relationships.",
    bg: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80",
  },
  {
    title: "Basketball",
    description:
      "Courtside and suite experiences at elite NBA and international basketball games. Bring leaders together in an electric atmosphere where every play drives conversation.",
    bg: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  },
  {
    title: "Tennis",
    description:
      "Grand Slam hospitality at Wimbledon, Roland Garros, and the US Open. Exclusive debenture seats, private suites, and curated networking where competition meets conversation.",
    bg: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
  },
  {
    title: "Sailing",
    description:
      "From America's Cup regattas to luxury yacht experiences, executive gatherings on the water offer a truly unique setting for forging meaningful connections.",
    bg: "https://images.unsplash.com/photo-1759809278965-cce79bb60611?w=800&q=80",
  },
  {
    title: "Rugby",
    description:
      "Six Nations, World Cup, and Premiership hospitality. Executive suites and pitch-side experiences at the most intense fixtures in world rugby.",
    bg: "https://images.unsplash.com/photo-1725531140748-41a15c7d9340?w=800&q=80",
  },
  {
    title: "Cricket",
    description:
      "Hospitality boxes at Lord's, The Ashes, and IPL. Long-form networking over a day of world-class cricket in iconic grounds worldwide.",
    bg: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80",
  },
  {
    title: "Horse Racing",
    description:
      "Royal Ascot, the Derby, and the Melbourne Cup. Premium enclosures, private boxes, and champagne hospitality at the world's most prestigious racecourses.",
    bg: "https://images.unsplash.com/photo-1631448829489-6228f21df74c?w=800&q=80",
  },
  {
    title: "Polo",
    description:
      "VIP hospitality at Guards Polo Club, the Cartier Queen's Cup, and international tournaments. An exclusive setting where sport meets sophistication.",
    bg: "https://images.unsplash.com/photo-1742672631961-b0413e12113d?w=800&q=80",
  },
  {
    title: "Motorsport",
    description:
      "Le Mans 24hr, MotoGP, and rally championships. Garage access, pit lane tours, and hospitality suites at the most thrilling circuits on the calendar.",
    bg: "https://images.unsplash.com/photo-1761092993834-967c046f0fa4?w=800&q=80",
  },
  {
    title: "Skiing",
    description:
      "Alpine hospitality at World Cup downhill events and curated executive ski retreats in Verbier, St. Moritz, and Courchevel. Business meets the slopes.",
    bg: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800&q=80",
  },
];

export default function SportsBookshelf() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl mb-12 text-center"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
        >
          Our <em>Sporting Events</em>
        </h2>

        <div className="flex h-[500px] gap-0 overflow-hidden rounded-2xl">
          {sports.map((sport, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={sport.title}
                className="relative h-full cursor-pointer overflow-hidden"
                style={{
                  flex: isActive ? "6" : "1",
                  transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Background image — always visible */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${sport.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Dark overlay — heavier when collapsed, lighter when expanded */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%)"
                      : "rgba(0,0,0,0.75)",
                  }}
                />

                {/* Spine title (vertical, shown when collapsed) */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  <span
                    className="text-white whitespace-nowrap"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1rem",
                      letterSpacing: "0.25em",
                      fontWeight: 300,
                    }}
                  >
                    {sport.title}
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-8 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  <h3
                    className="text-white mb-3"
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontWeight: 400,
                      fontSize: "2.5rem",
                      lineHeight: 1.1,
                    }}
                  >
                    {sport.title}
                  </h3>
                  <div
                    className="w-12 h-px mb-4"
                    style={{ backgroundColor: "#F7BE68" }}
                  />
                  <p className="text-white/85 text-sm leading-relaxed max-w-md">
                    {sport.description}
                  </p>
                  <a
                    href="#"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full self-start transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "#F7BE68", color: "#000" }}
                  >
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
