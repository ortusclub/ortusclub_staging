"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Race {
  round: number;
  gp: string;
  date: string;
  location: string;
}

const calendar: Race[] = [
  { round: 1, gp: "Australian", date: "Mar 6–8", location: "Melbourne" },
  { round: 2, gp: "Chinese", date: "Mar 13–15", location: "Shanghai" },
  { round: 3, gp: "Japanese", date: "Mar 27–29", location: "Suzuka" },
  { round: 4, gp: "Bahrain", date: "Apr 10–12", location: "Sakhir" },
  { round: 5, gp: "Saudi Arabian", date: "Apr 17–19", location: "Jeddah" },
  { round: 6, gp: "Miami", date: "May 1–3", location: "Miami Gardens" },
  { round: 7, gp: "Canadian", date: "May 22–24", location: "Montreal" },
  { round: 8, gp: "Monaco", date: "Jun 5–7", location: "Monte Carlo" },
  { round: 9, gp: "Spanish", date: "Jun 12–14", location: "Barcelona" },
  { round: 10, gp: "Austrian", date: "Jun 26–28", location: "Spielberg" },
  { round: 11, gp: "British", date: "Jul 3–5", location: "Silverstone" },
  { round: 12, gp: "Belgian", date: "Jul 17–19", location: "Spa" },
  { round: 13, gp: "Hungarian", date: "Jul 24–26", location: "Budapest" },
  { round: 14, gp: "Dutch", date: "Aug 21–23", location: "Zandvoort" },
  { round: 15, gp: "Italian", date: "Sep 4–6", location: "Monza" },
  { round: 16, gp: "Madrid", date: "Sep 11–13", location: "Madrid" },
  { round: 17, gp: "Azerbaijan", date: "Sep 25–27", location: "Baku" },
  { round: 18, gp: "Singapore", date: "Oct 9–11", location: "Marina Bay" },
  { round: 19, gp: "United States", date: "Oct 23–25", location: "Austin" },
  { round: 20, gp: "Mexican", date: "Oct 30–Nov 1", location: "Mexico City" },
  { round: 21, gp: "Brazilian", date: "Nov 6–8", location: "Interlagos" },
  { round: 22, gp: "Las Vegas", date: "Nov 19–21", location: "Las Vegas" },
  { round: 23, gp: "Qatar", date: "Nov 27–29", location: "Lusail" },
  { round: 24, gp: "Abu Dhabi", date: "Dec 4–6", location: "Yas Marina" },
];

export default function F1CalendarGrid() {
  const [expandedRound, setExpandedRound] = useState<number | null>(null);
  const [lightsPhase, setLightsPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= 6; i++) {
      timers.push(setTimeout(() => setLightsPhase(i), i * 600));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="calendar"
      style={{
        background: "#f8f7f5",
        padding: "80px 0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              color: "#C5A255",
              marginBottom: "12px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            All 24 Rounds
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "3.2rem",
              fontWeight: 400,
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            2026 Starting <em style={{ fontStyle: "italic", color: "#C5A255" }}>Grid</em>
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            <span
              style={{
                display: "block",
                height: "1px",
                width: "48px",
                background: "linear-gradient(90deg, transparent, #C5A255)",
              }}
            />
            <span
              style={{
                display: "block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#C5A255",
              }}
            />
            <span
              style={{
                display: "block",
                height: "1px",
                width: "48px",
                background: "linear-gradient(90deg, #C5A255, transparent)",
              }}
            />
          </div>
        </div>

        {/* Start Lights — elegant gold dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
              padding: "14px 32px",
              background: "#fff",
              borderRadius: "999px",
              border: "1px solid rgba(197,162,85,0.25)",
              boxShadow: "0 2px 16px rgba(197,162,85,0.08)",
            }}
          >
            {[1, 2, 3, 4, 5].map((n) => {
              const isLit = lightsPhase >= n && lightsPhase < 6;
              const isGreen = lightsPhase === 6;
              return (
                <motion.div
                  key={n}
                  animate={{
                    opacity: isLit || isGreen ? 1 : 0.2,
                    scale: isLit || isGreen ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: isGreen
                      ? "#C5A255"
                      : isLit
                      ? "#F7BE68"
                      : "#e8e4dc",
                    boxShadow: isGreen
                      ? "0 0 12px rgba(197,162,85,0.6), 0 0 24px rgba(197,162,85,0.3)"
                      : isLit
                      ? "0 0 10px rgba(247,190,104,0.5)"
                      : "none",
                    transition: "background 0.15s",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* === THE GRID === */}
        <div
          style={{
            position: "relative",
            background: "#f0ede8",
            borderRadius: "16px",
            padding: "48px 0",
            border: "1px solid rgba(197,162,85,0.15)",
            boxShadow: "0 4px 40px rgba(0,0,0,0.04)",
          }}
        >
          {/* Thin gold center line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "48px",
              bottom: "48px",
              width: "1px",
              transform: "translateX(-50%)",
              background: "linear-gradient(to bottom, transparent, rgba(197,162,85,0.35) 5%, rgba(197,162,85,0.35) 95%, transparent)",
            }}
          />

          {/* POLE POSITION text */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1rem",
              fontWeight: 400,
              letterSpacing: "0.4em",
              color: "rgba(197,162,85,0.35)",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            Pole Position
          </div>

          {/* Grid slots */}
          <div style={{ position: "relative", padding: "0 24px" }}>
            {calendar.map((race, i) => {
              const isLeft = i % 2 === 0;
              const isExpanded = expandedRound === race.round;

              return (
                <div
                  key={race.round}
                  style={{
                    position: "relative",
                    marginBottom: "8px",
                  }}
                >
                  {/* Large gold grid position number */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      ...(isLeft
                        ? { left: "4%", textAlign: "left" }
                        : { right: "4%", textAlign: "right" }),
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "3.2rem",
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "rgba(197,162,85,0.15)",
                      lineHeight: 1,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {race.round}
                  </div>

                  {/* Race card — staggered left/right */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: isLeft ? "flex-start" : "flex-end",
                      paddingLeft: isLeft ? "10%" : "0",
                      paddingRight: isLeft ? "0" : "10%",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.035,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onClick={() =>
                        setExpandedRound(isExpanded ? null : race.round)
                      }
                      style={{
                        maxWidth: "360px",
                        width: "100%",
                        cursor: "pointer",
                        position: "relative",
                        zIndex: 2,
                        background: "#fff",
                        borderRadius: "10px",
                        padding: "16px 20px",
                        borderLeft: "3px solid #C5A255",
                        boxShadow: "0 1px 8px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
                        transition: "box-shadow 0.3s, transform 0.3s",
                      }}
                      whileHover={{
                        y: -2,
                        boxShadow:
                          "0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(197,162,85,0.2)",
                      }}
                    >
                      {/* Ortus hospitality badge — on ALL cards */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-9px",
                          right: "16px",
                          background: "linear-gradient(135deg, #C5A255, #F7BE68)",
                          color: "#fff",
                          fontSize: "0.45rem",
                          fontWeight: 700,
                          letterSpacing: "0.14em",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          textTransform: "uppercase",
                          boxShadow: "0 2px 8px rgba(197,162,85,0.25)",
                        }}
                      >
                        Ortus Hospitality
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                        }}
                      >
                        {/* Round number badge */}
                        <div
                          style={{
                            minWidth: "42px",
                            height: "42px",
                            borderRadius: "10px",
                            background: "linear-gradient(135deg, rgba(197,162,85,0.1), rgba(247,190,104,0.06))",
                            border: "1px solid rgba(197,162,85,0.18)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-cormorant), serif",
                              fontSize: "1.1rem",
                              fontWeight: 600,
                              color: "#C5A255",
                            }}
                          >
                            {String(race.round).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Race info */}
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontFamily: "var(--font-cormorant), serif",
                              fontSize: "1.15rem",
                              fontWeight: 600,
                              color: "#1a1a1a",
                              lineHeight: 1.2,
                            }}
                          >
                            {race.gp} <span style={{ fontWeight: 400, fontStyle: "italic" }}>Grand Prix</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              marginTop: "4px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.7rem",
                                color: "#999",
                                fontWeight: 500,
                                letterSpacing: "0.02em",
                              }}
                            >
                              {race.date}
                            </span>
                            <span
                              style={{
                                width: "3px",
                                height: "3px",
                                borderRadius: "50%",
                                background: "rgba(197,162,85,0.4)",
                                display: "inline-block",
                              }}
                            />
                            <span
                              style={{
                                fontSize: "0.65rem",
                                color: "#999",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}
                            >
                              {race.location}
                            </span>
                          </div>
                        </div>

                        {/* Expand chevron */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          style={{
                            color: "#C5A255",
                            opacity: 0.5,
                            flexShrink: 0,
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div
                              style={{
                                paddingTop: "14px",
                                marginTop: "14px",
                                borderTop: "1px solid rgba(197,162,85,0.15)",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                }}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#C5A255"
                                  strokeWidth="1.5"
                                  style={{ opacity: 0.6 }}
                                >
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                  <circle cx="12" cy="9" r="2.5" />
                                </svg>
                                <span
                                  style={{
                                    fontSize: "0.8rem",
                                    color: "#666",
                                  }}
                                >
                                  {race.location}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "8px",
                                  marginTop: "8px",
                                }}
                              >
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#C5A255"
                                  strokeWidth="1.5"
                                  style={{ opacity: 0.6 }}
                                >
                                  <rect x="3" y="4" width="18" height="18" rx="2" />
                                  <line x1="16" y1="2" x2="16" y2="6" />
                                  <line x1="8" y1="2" x2="8" y2="6" />
                                  <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <span
                                  style={{
                                    fontSize: "0.8rem",
                                    color: "#666",
                                  }}
                                >
                                  {race.date}
                                </span>
                              </div>
                              <a
                                href="#"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  display: "inline-block",
                                  marginTop: "12px",
                                  padding: "9px 24px",
                                  borderRadius: "999px",
                                  background: "linear-gradient(135deg, #C5A255, #F7BE68)",
                                  border: "none",
                                  color: "#fff",
                                  fontSize: "0.65rem",
                                  fontWeight: 600,
                                  letterSpacing: "0.12em",
                                  textDecoration: "none",
                                  textTransform: "uppercase",
                                  boxShadow: "0 2px 12px rgba(197,162,85,0.3)",
                                  transition: "all 0.2s",
                                }}
                              >
                                Enquire Now
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FINISH text */}
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1rem",
              fontWeight: 400,
              letterSpacing: "0.4em",
              color: "rgba(197,162,85,0.3)",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            Chequered Flag
          </div>

          {/* Elegant gold line at bottom */}
          <div
            style={{
              marginTop: "24px",
              height: "1px",
              marginLeft: "48px",
              marginRight: "48px",
              background: "linear-gradient(90deg, transparent, rgba(197,162,85,0.3) 20%, rgba(197,162,85,0.3) 80%, transparent)",
            }}
          />
        </div>

        {/* Season finale label */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 24px",
              borderRadius: "999px",
              border: "1px solid rgba(197,162,85,0.2)",
              background: "#fff",
              boxShadow: "0 1px 8px rgba(0,0,0,0.03)",
            }}
          >
            <span
              style={{
                display: "block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#C5A255",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.95rem",
                fontStyle: "italic",
                color: "#999",
              }}
            >
              Season Finale — Abu Dhabi
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
