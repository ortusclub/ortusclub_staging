"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Race {
  round: number;
  gp: string;
  date: string;
  location: string;
  price: string;
  abbr: string;
}

const calendar: Race[] = [
  { round: 1, gp: "Australian", date: "Mar 6–8", location: "Melbourne", price: "$2,000", abbr: "AUS" },
  { round: 2, gp: "Chinese", date: "Mar 13–15", location: "Shanghai", price: "$1,800", abbr: "CHN" },
  { round: 3, gp: "Japanese", date: "Mar 27–29", location: "Suzuka", price: "$2,200", abbr: "JPN" },
  { round: 4, gp: "Bahrain", date: "Apr 10–12", location: "Sakhir", price: "$2,000", abbr: "BHR" },
  { round: 5, gp: "Saudi Arabian", date: "Apr 17–19", location: "Jeddah", price: "$2,500", abbr: "KSA" },
  { round: 6, gp: "Miami", date: "May 1–3", location: "Miami Gardens", price: "$3,000", abbr: "MIA" },
  { round: 7, gp: "Canadian", date: "May 22–24", location: "Montreal", price: "$2,000", abbr: "CAN" },
  { round: 8, gp: "Monaco", date: "Jun 5–7", location: "Monte Carlo", price: "$5,000", abbr: "MON" },
  { round: 9, gp: "Spanish", date: "Jun 12–14", location: "Barcelona", price: "$1,800", abbr: "ESP" },
  { round: 10, gp: "Austrian", date: "Jun 26–28", location: "Spielberg", price: "$2,000", abbr: "AUT" },
  { round: 11, gp: "British", date: "Jul 3–5", location: "Silverstone", price: "$2,500", abbr: "GBR" },
  { round: 12, gp: "Belgian", date: "Jul 17–19", location: "Spa", price: "$2,200", abbr: "BEL" },
  { round: 13, gp: "Hungarian", date: "Jul 24–26", location: "Budapest", price: "$1,800", abbr: "HUN" },
  { round: 14, gp: "Dutch", date: "Aug 21–23", location: "Zandvoort", price: "$2,500", abbr: "NED" },
  { round: 15, gp: "Italian", date: "Sep 4–6", location: "Monza", price: "$2,200", abbr: "ITA" },
  { round: 16, gp: "Madrid", date: "Sep 11–13", location: "Madrid", price: "$2,000", abbr: "MAD" },
  { round: 17, gp: "Azerbaijan", date: "Sep 25–27", location: "Baku", price: "$2,200", abbr: "AZE" },
  { round: 18, gp: "Singapore", date: "Oct 9–11", location: "Marina Bay", price: "$3,000", abbr: "SGP" },
  { round: 19, gp: "United States", date: "Oct 23–25", location: "Austin", price: "$2,500", abbr: "USA" },
  { round: 20, gp: "Mexican", date: "Oct 30–Nov 1", location: "Mexico City", price: "$2,000", abbr: "MEX" },
  { round: 21, gp: "Brazilian", date: "Nov 6–8", location: "Interlagos", price: "$2,200", abbr: "BRA" },
  { round: 22, gp: "Las Vegas", date: "Nov 19–21", location: "Las Vegas", price: "$4,000", abbr: "LVG" },
  { round: 23, gp: "Qatar", date: "Nov 27–29", location: "Lusail", price: "$2,500", abbr: "QAT" },
  { round: 24, gp: "Abu Dhabi", date: "Dec 4–6", location: "Yas Marina", price: "$3,000", abbr: "ABU" },
];

const CARD_WIDTH = 180;
const CARD_GAP = 16;
const TOTAL_WIDTH = calendar.length * (CARD_WIDTH + CARD_GAP);
const ANIMATION_DURATION = 40;

export default function F1CalendarTimeline() {
  const [pinnedRound, setPinnedRound] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);
  const pauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCardClick = useCallback((round: number) => {
    setPinnedRound((prev) => (prev === round ? null : round));
  }, []);

  const handleArrow = useCallback((direction: number) => {
    if (!tickerRef.current) return;
    setIsPaused(true);
    // Shift the animation by adjusting margin
    const inner = tickerRef.current.querySelector(".ticker-track") as HTMLElement | null;
    if (inner) {
      const current = parseFloat(inner.style.marginLeft || "0");
      inner.style.marginLeft = `${current + direction * -300}px`;
    }
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
      setIsPaused(false);
      // Reset manual offset when resuming
      const inner2 = tickerRef.current?.querySelector(".ticker-track") as HTMLElement | null;
      if (inner2) inner2.style.marginLeft = "0px";
    }, 2000);
  }, []);

  const pinnedRace = pinnedRound ? calendar.find((r) => r.round === pinnedRound) : null;

  const renderCard = (race: Race, index: number, keyPrefix: string) => {
    const isPinned = pinnedRound === race.round;

    return (
      <motion.div
        key={`${keyPrefix}-${race.round}`}
        onClick={() => handleCardClick(race.round)}
        whileTap={{ scale: 0.96 }}
        style={{
          width: `${CARD_WIDTH}px`,
          minWidth: `${CARD_WIDTH}px`,
          marginRight: `${CARD_GAP}px`,
          padding: "20px 16px",
          borderRadius: "14px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          background: isPinned
            ? "linear-gradient(135deg, rgba(247,190,104,0.12) 0%, rgba(20,18,14,0.95) 100%)"
            : "linear-gradient(135deg, #141210 0%, #0e0d0b 100%)",
          border: isPinned
            ? "2px solid #F7BE68"
            : "1px solid rgba(247,190,104,0.25)",
          boxShadow: isPinned
            ? "0 0 30px rgba(247,190,104,0.35), 0 0 60px rgba(247,190,104,0.1), inset 0 1px 0 rgba(247,190,104,0.15)"
            : "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(247,190,104,0.06)",
          transition: "border 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: "8px",
          userSelect: "none" as const,
        }}
      >
        {/* Round number */}
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "rgba(247,190,104,0.5)",
            textTransform: "uppercase" as const,
            fontFamily: "monospace",
          }}
        >
          R{race.round.toString().padStart(2, "0")}
        </span>

        {/* Abbreviation */}
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "2rem",
            fontWeight: 700,
            color: "#F7BE68",
            lineHeight: 1,
            letterSpacing: "0.05em",
            textShadow: isPinned ? "0 0 20px rgba(247,190,104,0.5)" : "none",
          }}
        >
          {race.abbr}
        </span>

        {/* GP Name */}
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
            textAlign: "center" as const,
            lineHeight: 1.2,
            minHeight: "2em",
            display: "flex",
            alignItems: "center",
          }}
        >
          {race.gp} GP
        </span>

        {/* Ortus Hospitality badge */}
        <span
          style={{
            fontSize: "0.45rem",
            letterSpacing: "0.15em",
            padding: "4px 10px",
            borderRadius: "999px",
            background: "linear-gradient(135deg, rgba(247,190,104,0.2) 0%, rgba(247,190,104,0.08) 100%)",
            color: "#F7BE68",
            border: "1px solid rgba(247,190,104,0.3)",
            fontWeight: 700,
            textTransform: "uppercase" as const,
            whiteSpace: "nowrap" as const,
          }}
        >
          Ortus Hospitality
        </span>

        {/* Expanded details when pinned */}
        <AnimatePresence>
          {isPinned && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                overflow: "hidden",
                width: "100%",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                gap: "4px",
                marginTop: "4px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "1px",
                  background: "linear-gradient(to right, transparent, rgba(247,190,104,0.4), transparent)",
                  marginBottom: "4px",
                }}
              />
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "monospace",
                }}
              >
                {race.date}
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "monospace",
                }}
              >
                {race.location}
              </span>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#F7BE68",
                  marginTop: "4px",
                  fontFamily: "var(--font-cormorant), serif",
                }}
              >
                From {race.price}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section
      id="calendar"
      style={{
        background: "#080a08",
        padding: "100px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* CSS keyframes for infinite ticker */}
      <style>{`
        @keyframes ticker-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${TOTAL_WIDTH}px);
          }
        }
        .ticker-track {
          display: flex;
          animation: ticker-scroll ${ANIMATION_DURATION}s linear infinite;
          will-change: transform;
          transition: margin-left 0.5s ease;
        }
        .ticker-track.paused {
          animation-play-state: paused;
        }
        .ticker-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(247,190,104,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: "60px", padding: "0 24px" }}>
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.4em",
              color: "#F7BE68",
              marginBottom: "16px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            All 24 Rounds
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "3.4rem",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            2026 Season{" "}
            <em style={{ fontStyle: "italic", color: "#F7BE68" }}>Calendar</em>
          </h2>
          <div
            className="flex items-center justify-center gap-3"
            style={{ marginTop: "20px" }}
          >
            <span
              className="block"
              style={{
                height: "1px",
                width: "60px",
                background: "linear-gradient(to right, transparent, #F7BE68)",
              }}
            />
            <span
              className="block"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#F7BE68",
                boxShadow: "0 0 10px rgba(247,190,104,0.6)",
              }}
            />
            <span
              className="block"
              style={{
                height: "1px",
                width: "60px",
                background: "linear-gradient(to left, transparent, #F7BE68)",
              }}
            />
          </div>
        </div>

        {/* Navigation arrows + hint */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "24px", padding: "0 24px", maxWidth: "1400px", margin: "0 auto 24px" }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            Click any race for details
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleArrow(-1)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(247,190,104,0.3)",
                background: "transparent",
                color: "#F7BE68",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(247,190,104,0.1)";
                e.currentTarget.style.borderColor = "#F7BE68";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(247,190,104,0.3)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => handleArrow(1)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(247,190,104,0.3)",
                background: "transparent",
                color: "#F7BE68",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(247,190,104,0.1)";
                e.currentTarget.style.borderColor = "#F7BE68";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(247,190,104,0.3)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Ticker container */}
        <div
          ref={tickerRef}
          className="ticker-container"
          style={{
            overflow: "hidden",
            width: "100%",
            padding: "16px 0",
            maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          }}
        >
          <div className={`ticker-track${isPaused ? " paused" : ""}`}>
            {/* First set of cards */}
            {calendar.map((race, i) => renderCard(race, i, "a"))}
            {/* Duplicate for seamless loop */}
            {calendar.map((race, i) => renderCard(race, i, "b"))}
          </div>
        </div>

        {/* Pinned race detail panel */}
        <AnimatePresence>
          {pinnedRace && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                maxWidth: "600px",
                margin: "32px auto 0",
                padding: "28px 36px",
                borderRadius: "18px",
                background: "linear-gradient(135deg, rgba(247,190,104,0.08) 0%, rgba(14,13,11,0.95) 100%)",
                border: "1px solid rgba(247,190,104,0.35)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(247,190,104,0.08)",
                textAlign: "center" as const,
              }}
            >
              <div
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  color: "#F7BE68",
                  textTransform: "uppercase" as const,
                  marginBottom: "10px",
                  fontFamily: "monospace",
                }}
              >
                Round {pinnedRace.round} of 24
              </div>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: "8px",
                }}
              >
                {pinnedRace.gp} Grand Prix
              </div>
              <div
                className="flex items-center justify-center"
                style={{ gap: "16px", marginBottom: "12px" }}
              >
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", fontFamily: "monospace" }}>
                  {pinnedRace.date}
                </span>
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", fontFamily: "monospace" }}>
                  {pinnedRace.location}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  color: "#F7BE68",
                  marginBottom: "14px",
                }}
              >
                From {pinnedRace.price}
              </div>
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  padding: "6px 18px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, rgba(247,190,104,0.2) 0%, rgba(247,190,104,0.08) 100%)",
                  color: "#F7BE68",
                  border: "1px solid rgba(247,190,104,0.3)",
                  fontWeight: 700,
                  textTransform: "uppercase" as const,
                }}
              >
                Ortus Hospitality Available
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div
          className="flex items-center justify-center gap-10"
          style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "24px 24px 0",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #F7BE68, #D4A54A)",
                border: "2px solid rgba(247,190,104,0.6)",
                boxShadow: "0 0 20px rgba(247,190,104,0.5), 0 0 40px rgba(247,190,104,0.15)",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                color: "#F7BE68",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textTransform: "uppercase" as const,
              }}
            >
              Ortus Hospitality
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
              }}
            >
              Click to pin &middot; Click again to dismiss
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
