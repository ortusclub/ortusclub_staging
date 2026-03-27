"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Race {
  round: number;
  gp: string;
  date: string;
  location: string;
  abbr: string;
}

const calendar: Race[] = [
  { round: 1, gp: "Australian", date: "Mar 6–8", location: "Melbourne", abbr: "AUS" },
  { round: 2, gp: "Chinese", date: "Mar 13–15", location: "Shanghai", abbr: "CHN" },
  { round: 3, gp: "Japanese", date: "Mar 27–29", location: "Suzuka", abbr: "JPN" },
  { round: 4, gp: "Bahrain", date: "Apr 10–12", location: "Sakhir", abbr: "BHR" },
  { round: 5, gp: "Saudi Arabian", date: "Apr 17–19", location: "Jeddah", abbr: "KSA" },
  { round: 6, gp: "Miami", date: "May 1–3", location: "Miami Gardens", abbr: "MIA" },
  { round: 7, gp: "Canadian", date: "May 22–24", location: "Montreal", abbr: "CAN" },
  { round: 8, gp: "Monaco", date: "Jun 5–7", location: "Monte Carlo", abbr: "MON" },
  { round: 9, gp: "Spanish", date: "Jun 12–14", location: "Barcelona", abbr: "ESP" },
  { round: 10, gp: "Austrian", date: "Jun 26–28", location: "Spielberg", abbr: "AUT" },
  { round: 11, gp: "British", date: "Jul 3–5", location: "Silverstone", abbr: "GBR" },
  { round: 12, gp: "Belgian", date: "Jul 17–19", location: "Spa", abbr: "BEL" },
  { round: 13, gp: "Hungarian", date: "Jul 24–26", location: "Budapest", abbr: "HUN" },
  { round: 14, gp: "Dutch", date: "Aug 21–23", location: "Zandvoort", abbr: "NED" },
  { round: 15, gp: "Italian", date: "Sep 4–6", location: "Monza", abbr: "ITA" },
  { round: 16, gp: "Madrid", date: "Sep 11–13", location: "Madrid", abbr: "MAD" },
  { round: 17, gp: "Azerbaijan", date: "Sep 25–27", location: "Baku", abbr: "AZE" },
  { round: 18, gp: "Singapore", date: "Oct 9–11", location: "Marina Bay", abbr: "SGP" },
  { round: 19, gp: "United States", date: "Oct 23–25", location: "Austin", abbr: "USA" },
  { round: 20, gp: "Mexican", date: "Oct 30–Nov 1", location: "Mexico City", abbr: "MEX" },
  { round: 21, gp: "Brazilian", date: "Nov 6–8", location: "Interlagos", abbr: "BRA" },
  { round: 22, gp: "Las Vegas", date: "Nov 19–21", location: "Las Vegas", abbr: "LVG" },
  { round: 23, gp: "Qatar", date: "Nov 27–29", location: "Lusail", abbr: "QAT" },
  { round: 24, gp: "Abu Dhabi", date: "Dec 4–6", location: "Yas Marina", abbr: "ABU" },
];

const ortusRounds = new Set([6, 8, 11, 22]);

const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function F1CalendarTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredRace, setHoveredRace] = useState<Race | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  /* ── Drag-to-scroll ── */
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    if (scrollRef.current) scrollRef.current.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  /* ── Group by month ── */
  const grouped = months.map((m) => ({
    month: m,
    races: calendar.filter((r) => r.date.startsWith(m)),
  }));

  return (
    <section
      id="calendar"
      style={{
        background: "#080a08",
        padding: "100px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow behind the timeline */}
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

      <div className="max-w-[1400px] mx-auto" style={{ position: "relative", zIndex: 1 }}>
        {/* ── Header ── */}
        <div className="text-center" style={{ marginBottom: "60px" }}>
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

        {/* ── Scroll controls ── */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "24px" }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
            }}
          >
            Scroll or drag to explore
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll(-1)}
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div style={{ position: "relative" }}>
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              display: "flex",
              overflowX: "auto",
              paddingBottom: "16px",
              paddingTop: "16px",
              cursor: "grab",
              scrollbarWidth: "none",
              msOverflowStyle: "none" as React.CSSProperties["msOverflowStyle"],
              scrollSnapType: "x mandatory" as React.CSSProperties["scrollSnapType"],
              userSelect: "none",
            }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {grouped.map((group) => (
              <div
                key={group.month}
                style={{
                  flexShrink: 0,
                  minWidth: group.races.length <= 1 ? "140px" : `${group.races.length * 100 + 40}px`,
                  scrollSnapAlign: "start" as React.CSSProperties["scrollSnapAlign"],
                  paddingRight: "0px",
                  position: "relative",
                }}
              >
                {/* Month label — large & bold */}
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.85)",
                    letterSpacing: "0.02em",
                    marginBottom: "0px",
                    paddingLeft: "8px",
                  }}
                >
                  {group.month}
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.25)",
                      marginLeft: "6px",
                    }}
                  >
                    2026
                  </span>
                </div>

                {/* Timeline container — tall enough for above/below labels */}
                <div style={{ position: "relative", height: "200px" }}>
                  {/* Gold gradient track line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: "3px",
                      transform: "translateY(-50%)",
                      background:
                        "linear-gradient(to right, rgba(247,190,104,0.15), rgba(247,190,104,0.5), rgba(247,190,104,0.15))",
                      borderRadius: "2px",
                    }}
                  />

                  {/* Month separator tick */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: 0,
                      width: "1px",
                      height: "24px",
                      transform: "translateY(-50%)",
                      background: "rgba(247,190,104,0.2)",
                    }}
                  />

                  {/* Race dots + labels */}
                  <div
                    className="flex items-center"
                    style={{
                      height: "100%",
                      gap: "0px",
                      paddingLeft: "20px",
                    }}
                  >
                    {group.races.map((race, idx) => {
                      const isOrtus = ortusRounds.has(race.round);
                      const isAbove = idx % 2 === 0;

                      return (
                        <div
                          key={race.round}
                          style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100px",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            setHoveredRace(race);
                            const rect = e.currentTarget.getBoundingClientRect();
                            const parentRect =
                              scrollRef.current?.getBoundingClientRect();
                            if (parentRect) {
                              setTooltipPos({
                                x:
                                  rect.left -
                                  parentRect.left +
                                  rect.width / 2 +
                                  (scrollRef.current?.scrollLeft ?? 0),
                                y: rect.top - parentRect.top,
                              });
                            }
                          }}
                          onMouseLeave={() => setHoveredRace(null)}
                        >
                          {/* ABOVE label */}
                          {isAbove && (
                            <div
                              style={{
                                position: "absolute",
                                bottom: "calc(50% + 22px)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "2px",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  fontWeight: 700,
                                  letterSpacing: "0.1em",
                                  color: isOrtus ? "#F7BE68" : "rgba(255,255,255,0.7)",
                                  fontFamily: "monospace",
                                }}
                              >
                                {race.abbr}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.55rem",
                                  color: isOrtus
                                    ? "rgba(247,190,104,0.6)"
                                    : "rgba(255,255,255,0.25)",
                                  fontFamily: "monospace",
                                  letterSpacing: "0.05em",
                                }}
                              >
                                R{race.round.toString().padStart(2, "0")}
                              </span>
                              {/* Connector line */}
                              <div
                                style={{
                                  width: "1px",
                                  height: "10px",
                                  background: isOrtus
                                    ? "rgba(247,190,104,0.4)"
                                    : "rgba(255,255,255,0.1)",
                                }}
                              />
                            </div>
                          )}

                          {/* Dot — centered on the track */}
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              zIndex: 3,
                            }}
                          >
                            {/* Outer halo for Ortus */}
                            {isOrtus && (
                              <motion.div
                                animate={{
                                  opacity: [0.3, 0.6, 0.3],
                                  scale: [1, 1.3, 1],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "50%",
                                  background:
                                    "radial-gradient(circle, rgba(247,190,104,0.25) 0%, transparent 70%)",
                                  pointerEvents: "none",
                                }}
                              />
                            )}
                            <motion.div
                              whileHover={{ scale: 1.5 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 20,
                              }}
                              style={{
                                width: isOrtus ? "16px" : "12px",
                                height: isOrtus ? "16px" : "12px",
                                borderRadius: "50%",
                                background: isOrtus
                                  ? "radial-gradient(circle, #F7BE68 0%, #D4A54A 100%)"
                                  : "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%)",
                                border: isOrtus
                                  ? "2px solid rgba(247,190,104,0.6)"
                                  : "1.5px solid rgba(255,255,255,0.2)",
                                boxShadow: isOrtus
                                  ? "0 0 20px rgba(247,190,104,0.5), 0 0 40px rgba(247,190,104,0.15)"
                                  : "0 0 8px rgba(255,255,255,0.1)",
                                position: "relative",
                                zIndex: 2,
                              }}
                            />
                          </div>

                          {/* BELOW label */}
                          {!isAbove && (
                            <div
                              style={{
                                position: "absolute",
                                top: "calc(50% + 22px)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "2px",
                              }}
                            >
                              {/* Connector line */}
                              <div
                                style={{
                                  width: "1px",
                                  height: "10px",
                                  background: isOrtus
                                    ? "rgba(247,190,104,0.4)"
                                    : "rgba(255,255,255,0.1)",
                                }}
                              />
                              <span
                                style={{
                                  fontSize: "0.7rem",
                                  fontWeight: 700,
                                  letterSpacing: "0.1em",
                                  color: isOrtus ? "#F7BE68" : "rgba(255,255,255,0.7)",
                                  fontFamily: "monospace",
                                }}
                              >
                                {race.abbr}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.55rem",
                                  color: isOrtus
                                    ? "rgba(247,190,104,0.6)"
                                    : "rgba(255,255,255,0.25)",
                                  fontFamily: "monospace",
                                  letterSpacing: "0.05em",
                                }}
                              >
                                R{race.round.toString().padStart(2, "0")}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* End spacer */}
            <div style={{ flexShrink: 0, width: "60px" }} />
          </div>

          {/* ── Floating hover tooltip ── */}
          <AnimatePresence>
            {hoveredRace && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="pointer-events-none"
                style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: `${tooltipPos.x}px`,
                  transform: "translateX(-50%)",
                  background:
                    "linear-gradient(135deg, #1a1c1a 0%, #111311 100%)",
                  border: ortusRounds.has(hoveredRace.round)
                    ? "1px solid rgba(247,190,104,0.4)"
                    : "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "16px",
                  padding: "20px 28px",
                  boxShadow: ortusRounds.has(hoveredRace.round)
                    ? "0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(247,190,104,0.1)"
                    : "0 20px 60px rgba(0,0,0,0.7)",
                  zIndex: 30,
                  minWidth: "240px",
                  whiteSpace: "nowrap" as React.CSSProperties["whiteSpace"],
                }}
              >
                {/* Round badge */}
                <div
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: ortusRounds.has(hoveredRace.round)
                      ? "#F7BE68"
                      : "rgba(255,255,255,0.35)",
                    textTransform: "uppercase" as React.CSSProperties["textTransform"],
                    marginBottom: "8px",
                    fontFamily: "monospace",
                  }}
                >
                  Round {hoveredRace.round} of 24
                </div>

                {/* GP Name */}
                <div
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "6px",
                    lineHeight: 1.2,
                  }}
                >
                  {hoveredRace.gp} Grand Prix
                </div>

                {/* Details row */}
                <div
                  className="flex items-center"
                  style={{ gap: "16px", marginBottom: "4px" }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "monospace",
                    }}
                  >
                    {hoveredRace.date}
                  </span>
                  <span
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.45)",
                      fontFamily: "monospace",
                    }}
                  >
                    {hoveredRace.location}
                  </span>
                </div>

                {/* Ortus badge */}
                {ortusRounds.has(hoveredRace.round) && (
                  <div style={{ marginTop: "14px" }}>
                    <span
                      style={{
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        padding: "5px 14px",
                        borderRadius: "999px",
                        background:
                          "linear-gradient(135deg, rgba(247,190,104,0.2) 0%, rgba(247,190,104,0.08) 100%)",
                        color: "#F7BE68",
                        border: "1px solid rgba(247,190,104,0.3)",
                        fontWeight: 600,
                        textTransform: "uppercase" as React.CSSProperties["textTransform"],
                      }}
                    >
                      Ortus Experience Available
                    </span>
                  </div>
                )}

                {/* Arrow */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: "12px",
                    height: "12px",
                    background: "#111311",
                    borderRight: ortusRounds.has(hoveredRace.round)
                      ? "1px solid rgba(247,190,104,0.4)"
                      : "1px solid rgba(255,255,255,0.12)",
                    borderBottom: ortusRounds.has(hoveredRace.round)
                      ? "1px solid rgba(247,190,104,0.4)"
                      : "1px solid rgba(255,255,255,0.12)",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Legend ── */}
        <div
          className="flex items-center justify-center gap-10"
          style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.6), rgba(255,255,255,0.2))",
                border: "1.5px solid rgba(255,255,255,0.2)",
                boxShadow: "0 0 8px rgba(255,255,255,0.1)",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as React.CSSProperties["textTransform"],
              }}
            >
              Grand Prix
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #F7BE68, #D4A54A)",
                border: "2px solid rgba(247,190,104,0.6)",
                boxShadow:
                  "0 0 20px rgba(247,190,104,0.5), 0 0 40px rgba(247,190,104,0.15)",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                color: "#F7BE68",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textTransform: "uppercase" as React.CSSProperties["textTransform"],
              }}
            >
              Ortus Hospitality
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
