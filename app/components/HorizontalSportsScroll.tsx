"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const sports = [
  { title: "Formula 1", desc: "From Monaco to Silverstone, the pinnacle of motorsport from Paddock Club suites.", bg: "https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/dc39/live/49b724a0-a274-11ef-8f42-3b1b720c6f90.jpg", bgPos: "center 30%" },
  { title: "Tennis", desc: "Grand Slam hospitality at Wimbledon, Roland Garros, and the US Open.", bg: "https://media.cnn.com/api/v1/images/stellar/prod/220420110759-01-wimbledon-center-court-2021.jpg?c=16x9&q=h_1080,w_1920,c_fill", bgPos: "center" },
  { title: "Football", desc: "Premium matchday experiences across the Premier League and Champions League.", bg: "https://images.unsplash.com/photo-1762013315117-1c8005ad2b41?w=1920&q=90&auto=format&fit=crop", bgPos: "center" },
  { title: "Golf", desc: "The Masters, The Open, and the Ryder Cup.", bg: "https://res.cloudinary.com/rydercup-prod/w_1153,h_648,c_fit,q_auto,g_center,dpr_2.0,f_auto/rydercup/images/teams/united-states/First-Tee-Fans-Web-Hero.jpg", bgPos: "center" },
  { title: "Horse Racing", desc: "Royal Ascot, the Derby, and the Melbourne Cup.", bg: "https://images.unsplash.com/photo-1631746556116-7559088141d6?w=1920&q=90&auto=format&fit=crop", bgPos: "center" },
  { title: "Basketball", desc: "Courtside at the NBA Finals, All-Star Weekend, and March Madness.", bg: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1920&q=90&auto=format&fit=crop", bgPos: "center" },
  { title: "Sailing", desc: "America's Cup regattas and luxury yacht experiences.", bg: "https://cdn.boatinternational.com/convert/bi_prd/bi/library_images/royvXCOoR6DTLUvAAK2Q_Emirates-Team-New-Zealand-racing-in-the-35th-Americas-cup-credit-acea-sander-van-der-borch.jpg/r[width]=1920/royvXCOoR6DTLUvAAK2Q_Emirates-Team-New-Zealand-racing-in-the-35th-Americas-cup-credit-acea-sander-van-der-borch.jpg", bgPos: "center" },
  { title: "Rugby", desc: "Six Nations, World Cup, and Premiership hospitality.", bg: "https://images.unsplash.com/photo-1693073410934-5e45e31a6b5c?w=1920&q=90&auto=format&fit=crop", bgPos: "center" },
  { title: "Cricket", desc: "Lord's, The Ashes, and IPL.", bg: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=90&auto=format&fit=crop", bgPos: "center" },
  { title: "Polo", desc: "Guards Polo Club, Cartier Queen's Cup.", bg: "https://images.unsplash.com/photo-1742672631961-b0413e12113d?w=1920&q=90&auto=format&fit=crop", bgPos: "center" },
  { title: "Motorsport", desc: "Le Mans 24hr, MotoGP, and rally championships.", bg: "https://images.unsplash.com/photo-1761092993834-967c046f0fa4?w=1920&q=90&auto=format&fit=crop", bgPos: "center" },
  { title: "Boxing", desc: "Ringside at world title fights in Las Vegas, London, and beyond.", bg: "https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=1920&q=90&auto=format&fit=crop", bgPos: "center" },
];

/* All cards same size */
const CARD_WIDTH = 420;
const CARD_HEIGHT = 540;

export default function HorizontalSportsScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cards = [...sports, ...sports, ...sports];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const singleSetWidth = el.scrollWidth / 3;
    el.scrollLeft = singleSetWidth;

    let animId: number;
    const speed = 0.5;

    const tick = () => {
      if (!isUserInteracting && el) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        }
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isUserInteracting]);

  const handleInteraction = useCallback(() => {
    setIsUserInteracting(true);
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => setIsUserInteracting(false), 3000);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft <= 0) el.scrollLeft += singleSetWidth;
    else if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
  }, []);

  return (
    <section style={{ background: "#0a0a09", padding: "100px 0 72px" }}>
      {/* Header */}
      <div className="text-center px-6" style={{ marginBottom: "56px" }}>
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase" as const,
            color: "#F7BE68",
            marginBottom: "16px",
          }}
        >
          Explore Our World
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 300,
            fontSize: "3.2rem",
            color: "#fff",
            marginBottom: "18px",
            letterSpacing: "-0.01em",
          }}
        >
          Our <em style={{ fontStyle: "italic" }}>Sporting Events</em>
        </h2>
        <div className="flex items-center justify-center gap-4">
          <span className="block h-px w-16" style={{ background: "rgba(247,190,104,0.3)" }} />
          <span
            className="block w-1.5 h-1.5"
            style={{ background: "#F7BE68", transform: "rotate(45deg)" }}
          />
          <span className="block h-px w-16" style={{ background: "rgba(247,190,104,0.3)" }} />
        </div>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        onMouseDown={handleInteraction}
        onTouchStart={handleInteraction}
        onWheel={handleInteraction}
        onScroll={handleScroll}
        style={{
          display: "flex",
          gap: "20px",
          overflowX: "auto",
          padding: "0 48px 28px",
          scrollbarWidth: "none",
          cursor: "grab",
          msOverflowStyle: "none" as any,
        }}
      >
        {cards.map((sport, i) => {
          const isHovered = hoveredIdx === i;

          return (
            <a
              key={`${sport.title}-${i}`}
              href="#"
              onMouseEnter={() => { setHoveredIdx(i); }}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                flexShrink: 0,
                width: `${CARD_WIDTH}px`,
                height: `${CARD_HEIGHT}px`,
                position: "relative",
                overflow: "hidden",
                borderRadius: "18px",
                display: "block",
                textDecoration: "none",
                boxShadow: isHovered
                  ? "0 28px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(247,190,104,0.1)"
                  : "0 8px 32px rgba(0,0,0,0.35)",
                transform: isHovered ? "translateY(-8px) scale(1.01)" : "none",
                transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1), box-shadow 0.6s",
                zIndex: isHovered ? 10 : 1,
              }}
            >
              {/* Background image */}
              <div
                style={{
                  position: "absolute",
                  inset: "-20px",
                  backgroundImage: `url(${sport.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: sport.bgPos,
                  transform: isHovered ? "scale(1.08)" : "scale(1.02)",
                  transition: "transform 1s cubic-bezier(0.22,1,0.36,1)",
                  filter: isHovered ? "brightness(1.05)" : "brightness(0.95)",
                }}
              />

              {/* Multi-layer gradient for depth */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: isHovered
                    ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.05) 65%, transparent 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.05) 60%, transparent 100%)",
                  transition: "background 0.6s",
                }}
              />

              {/* Subtle vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Gold corner accent — top right */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "24px",
                  height: "24px",
                  borderTop: "1px solid rgba(247,190,104,0.25)",
                  borderRight: "1px solid rgba(247,190,104,0.25)",
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.5s",
                  pointerEvents: "none",
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "32px",
                }}
              >
                {/* Number */}
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "0.65rem",
                    color: "#F7BE68",
                    letterSpacing: "0.25em",
                    marginBottom: "8px",
                    opacity: 0.6,
                  }}
                >
                  {String(sports.indexOf(sport) + 1).padStart(2, "0")}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 400,
                    color: "#fff",
                    fontSize: "2rem",
                    lineHeight: 1.05,
                    marginBottom: "12px",
                    letterSpacing: "-0.01em",
                    textShadow: "0 2px 16px rgba(0,0,0,0.3)",
                  }}
                >
                  {sport.title}
                </h3>

                {/* Gold accent line */}
                <div
                  style={{
                    width: isHovered ? "56px" : "28px",
                    height: "2px",
                    background: "linear-gradient(90deg, #F7BE68, #C5A255)",
                    opacity: isHovered ? 1 : 0.5,
                    transition: "width 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s",
                    borderRadius: "1px",
                  }}
                />

                {/* Description — reveals on hover */}
                <div
                  style={{
                    maxHeight: isHovered ? "100px" : "0px",
                    opacity: isHovered ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.6s cubic-bezier(0.22,1,0.36,1), opacity 0.5s",
                    marginTop: "14px",
                  }}
                >
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "0.85rem",
                      lineHeight: 1.65,
                      maxWidth: "380px",
                      marginBottom: "16px",
                    }}
                  >
                    {sport.desc}
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.68rem",
                      fontWeight: 500,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase" as const,
                      color: "#F7BE68",
                    }}
                  >
                    Explore
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Hint */}
      <p
        className="text-center"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontStyle: "italic",
          fontSize: "0.8rem",
          color: "rgba(240,236,228,0.15)",
          letterSpacing: "0.1em",
          marginTop: "20px",
        }}
      >
        Scroll horizontally to explore &rarr;
      </p>
    </section>
  );
}
