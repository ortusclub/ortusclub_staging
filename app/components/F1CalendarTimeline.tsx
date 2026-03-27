"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Race {
  round: number;
  gp: string;
  date: string;
  location: string;
  price: string;
  abbr: string;
  month: string;
}

const calendar: Race[] = [
  { round: 1, gp: "Australian", date: "Mar 6–8", location: "Melbourne", price: "$2,000", abbr: "AUS", month: "Mar" },
  { round: 2, gp: "Chinese", date: "Mar 13–15", location: "Shanghai", price: "$1,800", abbr: "CHN", month: "Mar" },
  { round: 3, gp: "Japanese", date: "Mar 27–29", location: "Suzuka", price: "$2,200", abbr: "JPN", month: "Mar" },
  { round: 4, gp: "Bahrain", date: "Apr 10–12", location: "Sakhir", price: "$2,000", abbr: "BHR", month: "Apr" },
  { round: 5, gp: "Saudi Arabian", date: "Apr 17–19", location: "Jeddah", price: "$2,500", abbr: "KSA", month: "Apr" },
  { round: 6, gp: "Miami", date: "May 1–3", location: "Miami Gardens", price: "$3,000", abbr: "MIA", month: "May" },
  { round: 7, gp: "Canadian", date: "May 22–24", location: "Montreal", price: "$2,000", abbr: "CAN", month: "May" },
  { round: 8, gp: "Monaco", date: "Jun 5–7", location: "Monte Carlo", price: "$5,000", abbr: "MON", month: "Jun" },
  { round: 9, gp: "Spanish", date: "Jun 12–14", location: "Barcelona", price: "$1,800", abbr: "ESP", month: "Jun" },
  { round: 10, gp: "Austrian", date: "Jun 26–28", location: "Spielberg", price: "$2,000", abbr: "AUT", month: "Jun" },
  { round: 11, gp: "British", date: "Jul 3–5", location: "Silverstone", price: "$2,500", abbr: "GBR", month: "Jul" },
  { round: 12, gp: "Belgian", date: "Jul 17–19", location: "Spa", price: "$2,200", abbr: "BEL", month: "Jul" },
  { round: 13, gp: "Hungarian", date: "Jul 24–26", location: "Budapest", price: "$1,800", abbr: "HUN", month: "Jul" },
  { round: 14, gp: "Dutch", date: "Aug 21–23", location: "Zandvoort", price: "$2,500", abbr: "NED", month: "Aug" },
  { round: 15, gp: "Italian", date: "Sep 4–6", location: "Monza", price: "$2,200", abbr: "ITA", month: "Sep" },
  { round: 16, gp: "Madrid", date: "Sep 11–13", location: "Madrid", price: "$2,000", abbr: "MAD", month: "Sep" },
  { round: 17, gp: "Azerbaijan", date: "Sep 25–27", location: "Baku", price: "$2,200", abbr: "AZE", month: "Sep" },
  { round: 18, gp: "Singapore", date: "Oct 9–11", location: "Marina Bay", price: "$3,000", abbr: "SGP", month: "Oct" },
  { round: 19, gp: "United States", date: "Oct 23–25", location: "Austin", price: "$2,500", abbr: "USA", month: "Oct" },
  { round: 20, gp: "Mexican", date: "Oct 30–Nov 1", location: "Mexico City", price: "$2,000", abbr: "MEX", month: "Oct" },
  { round: 21, gp: "Brazilian", date: "Nov 6–8", location: "Interlagos", price: "$2,200", abbr: "BRA", month: "Nov" },
  { round: 22, gp: "Las Vegas", date: "Nov 19–21", location: "Las Vegas", price: "$4,000", abbr: "LVG", month: "Nov" },
  { round: 23, gp: "Qatar", date: "Nov 27–29", location: "Lusail", price: "$2,500", abbr: "QAT", month: "Nov" },
  { round: 24, gp: "Abu Dhabi", date: "Dec 4–6", location: "Yas Marina", price: "$3,000", abbr: "ABU", month: "Dec" },
];

const MONTHS_ORDER = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MONTH_FULL: Record<string, string> = {
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

const MONTH_WIDTH = 300;

export default function F1CalendarTimeline() {
  const [expandedRound, setExpandedRound] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  const racesByMonth: Record<string, Race[]> = {};
  for (const m of MONTHS_ORDER) {
    racesByMonth[m] = calendar.filter((r) => r.month === m);
  }

  const handleScroll = useCallback(() => {
    if (!stripRef.current) return;
    const el = stripRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    setScrollProgress(el.scrollLeft / maxScroll);
  }, []);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollBy = useCallback((direction: number) => {
    if (!stripRef.current) return;
    stripRef.current.scrollBy({
      left: direction * MONTH_WIDTH,
      behavior: "smooth",
    });
  }, []);

  const handleRaceClick = useCallback((round: number) => {
    setExpandedRound((prev) => (prev === round ? null : round));
  }, []);

  return (
    <section
      id="calendar"
      style={{
        background: "#080a08",
        padding: "100px 0 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(247,190,104,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px", padding: "0 24px" }}>
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
              margin: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "4.5rem",
                fontWeight: 200,
                color: "rgba(247,190,104,0.15)",
                letterSpacing: "0.08em",
                display: "block",
                marginBottom: "4px",
              }}
            >
              2026
            </span>
            Season{" "}
            <em style={{ fontStyle: "italic", color: "#F7BE68" }}>Calendar</em>
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <span
              style={{
                height: "1px",
                width: "60px",
                background: "linear-gradient(to right, transparent, #F7BE68)",
                display: "block",
              }}
            />
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#F7BE68",
                boxShadow: "0 0 10px rgba(247,190,104,0.6)",
                display: "block",
              }}
            />
            <span
              style={{
                height: "1px",
                width: "60px",
                background: "linear-gradient(to left, transparent, #F7BE68)",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Navigation arrows */}
        <div
          style={{
            position: "relative",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Left arrow */}
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(247,190,104,0.3)",
              background: "rgba(8,10,8,0.9)",
              color: "#F7BE68",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(247,190,104,0.15)";
              e.currentTarget.style.borderColor = "#F7BE68";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(8,10,8,0.9)";
              e.currentTarget.style.borderColor = "rgba(247,190,104,0.3)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(247,190,104,0.3)",
              background: "rgba(8,10,8,0.9)",
              color: "#F7BE68",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(247,190,104,0.15)";
              e.currentTarget.style.borderColor = "#F7BE68";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(8,10,8,0.9)";
              e.currentTarget.style.borderColor = "rgba(247,190,104,0.3)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Calendar strip */}
          <div
            ref={stripRef}
            style={{
              overflowX: "auto",
              overflowY: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              padding: "0 52px",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <style>{`
              .calendar-strip::-webkit-scrollbar { display: none; }
            `}</style>
            <div
              className="calendar-strip"
              style={{
                display: "flex",
                width: `${MONTHS_ORDER.length * MONTH_WIDTH}px`,
              }}
            >
              {MONTHS_ORDER.map((month, mi) => {
                const races = racesByMonth[month];
                return (
                  <div
                    key={month}
                    style={{
                      width: `${MONTH_WIDTH}px`,
                      minWidth: `${MONTH_WIDTH}px`,
                      borderLeft: "1px solid rgba(247,190,104,0.15)",
                      background:
                        mi % 2 === 0
                          ? "rgba(255,255,255,0.02)"
                          : "rgba(255,255,255,0.035)",
                      padding: "28px 20px 32px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0",
                      position: "relative",
                    }}
                  >
                    {/* Month label */}
                    <div style={{ marginBottom: "24px" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: "2rem",
                          fontWeight: 600,
                          color: "#F7BE68",
                          margin: 0,
                          lineHeight: 1,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {MONTH_FULL[month]}
                      </h3>
                      <div
                        style={{
                          width: "40px",
                          height: "1px",
                          background:
                            "linear-gradient(to right, #F7BE68, transparent)",
                          marginTop: "8px",
                        }}
                      />
                    </div>

                    {/* Race entries */}
                    {races.length === 0 ? (
                      <p
                        style={{
                          fontFamily: "var(--font-cormorant), serif",
                          fontSize: "0.9rem",
                          fontStyle: "italic",
                          color: "rgba(255,255,255,0.2)",
                          margin: 0,
                        }}
                      >
                        No races
                      </p>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {races.map((race) => {
                          const isExpanded = expandedRound === race.round;
                          return (
                            <div key={race.round}>
                              <div
                                onClick={() => handleRaceClick(race.round)}
                                style={{
                                  borderLeft: "3px solid rgba(247,190,104,0.4)",
                                  paddingLeft: "14px",
                                  cursor: "pointer",
                                  transition: "border-color 0.2s ease",
                                  borderColor: isExpanded
                                    ? "#F7BE68"
                                    : "rgba(247,190,104,0.4)",
                                }}
                                onMouseEnter={(e) => {
                                  (e.currentTarget as HTMLDivElement).style.borderColor = "#F7BE68";
                                }}
                                onMouseLeave={(e) => {
                                  if (!isExpanded) {
                                    (e.currentTarget as HTMLDivElement).style.borderColor =
                                      "rgba(247,190,104,0.4)";
                                  }
                                }}
                              >
                                {/* Date */}
                                <p
                                  style={{
                                    fontFamily: "'SF Mono', 'Fira Code', 'Courier New', monospace",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    color: "rgba(255,255,255,0.85)",
                                    margin: "0 0 3px 0",
                                    letterSpacing: "0.03em",
                                  }}
                                >
                                  {race.date}
                                </p>

                                {/* GP Name */}
                                <p
                                  style={{
                                    fontFamily: "var(--font-cormorant), serif",
                                    fontSize: "1.05rem",
                                    fontWeight: 600,
                                    color: "#fff",
                                    margin: "0 0 3px 0",
                                    lineHeight: 1.2,
                                  }}
                                >
                                  {race.gp} GP
                                </p>

                                {/* Location */}
                                <p
                                  style={{
                                    fontSize: "0.65rem",
                                    color: "rgba(255,255,255,0.4)",
                                    margin: "0 0 6px 0",
                                    letterSpacing: "0.05em",
                                  }}
                                >
                                  {race.location}
                                </p>

                                {/* ORTUS badge */}
                                <span
                                  style={{
                                    display: "inline-block",
                                    fontSize: "0.45rem",
                                    letterSpacing: "0.18em",
                                    padding: "3px 8px",
                                    borderRadius: "2px",
                                    background:
                                      "linear-gradient(135deg, rgba(247,190,104,0.18) 0%, rgba(247,190,104,0.06) 100%)",
                                    color: "#F7BE68",
                                    border: "1px solid rgba(247,190,104,0.25)",
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                  }}
                                >
                                  ORTUS
                                </span>
                              </div>

                              {/* Expanded details */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    style={{ overflow: "hidden" }}
                                  >
                                    <div
                                      style={{
                                        marginTop: "10px",
                                        marginLeft: "17px",
                                        padding: "14px 16px",
                                        borderRadius: "6px",
                                        background:
                                          "linear-gradient(135deg, rgba(247,190,104,0.06) 0%, rgba(14,13,11,0.8) 100%)",
                                        border: "1px solid rgba(247,190,104,0.2)",
                                      }}
                                    >
                                      <p
                                        style={{
                                          fontSize: "0.6rem",
                                          letterSpacing: "0.2em",
                                          color: "rgba(255,255,255,0.4)",
                                          textTransform: "uppercase",
                                          margin: "0 0 6px 0",
                                          fontFamily: "monospace",
                                        }}
                                      >
                                        Round {race.round} of 24
                                      </p>
                                      <p
                                        style={{
                                          fontFamily: "var(--font-cormorant), serif",
                                          fontSize: "1.3rem",
                                          fontWeight: 600,
                                          color: "#fff",
                                          margin: "0 0 4px 0",
                                        }}
                                      >
                                        {race.gp} Grand Prix
                                      </p>
                                      <p
                                        style={{
                                          fontFamily: "monospace",
                                          fontSize: "0.7rem",
                                          color: "rgba(255,255,255,0.5)",
                                          margin: "0 0 2px 0",
                                        }}
                                      >
                                        {race.date} &middot; {race.location}
                                      </p>
                                      <p
                                        style={{
                                          fontFamily: "var(--font-cormorant), serif",
                                          fontSize: "1.15rem",
                                          fontWeight: 700,
                                          color: "#F7BE68",
                                          margin: "10px 0 12px 0",
                                        }}
                                      >
                                        From {race.price}
                                      </p>
                                      <span
                                        style={{
                                          display: "inline-block",
                                          fontSize: "0.55rem",
                                          letterSpacing: "0.15em",
                                          padding: "6px 16px",
                                          borderRadius: "2px",
                                          background:
                                            "linear-gradient(135deg, rgba(247,190,104,0.2) 0%, rgba(247,190,104,0.08) 100%)",
                                          color: "#F7BE68",
                                          border: "1px solid rgba(247,190,104,0.35)",
                                          fontWeight: 700,
                                          textTransform: "uppercase",
                                          cursor: "pointer",
                                          transition: "all 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                          e.currentTarget.style.background =
                                            "rgba(247,190,104,0.25)";
                                        }}
                                        onMouseLeave={(e) => {
                                          e.currentTarget.style.background =
                                            "linear-gradient(135deg, rgba(247,190,104,0.2) 0%, rgba(247,190,104,0.08) 100%)";
                                        }}
                                      >
                                        Enquire Now
                                      </span>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gold progress bar */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "24px auto 0",
            padding: "0 52px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "2px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "1px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "20%",
                background:
                  "linear-gradient(to right, transparent, #F7BE68, transparent)",
                borderRadius: "1px",
              }}
              animate={{
                left: `${scrollProgress * 80}%`,
              }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
          {/* Month markers beneath progress bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
              padding: "0 4px",
            }}
          >
            {MONTHS_ORDER.map((m) => (
              <span
                key={m}
                style={{
                  fontSize: "0.5rem",
                  letterSpacing: "0.1em",
                  color: "rgba(247,190,104,0.3)",
                  textTransform: "uppercase",
                  fontFamily: "monospace",
                }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Footer hint */}
        <div
          style={{
            textAlign: "center",
            marginTop: "28px",
          }}
        >
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
            }}
          >
            Click any race to view details &middot; Scroll to explore months
          </p>
        </div>
      </div>
    </section>
  );
}
