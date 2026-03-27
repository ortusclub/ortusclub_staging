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

const ortusRounds = new Set([6, 8, 11, 22]);

export default function F1CalendarGrid() {
  const [expandedRound, setExpandedRound] = useState<number | null>(null);
  const [lightsPhase, setLightsPhase] = useState(0); // 0=off, 1-5=red lights, 6=green

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
        background: "#0a0a0a",
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
              color: "#F7BE68",
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
              color: "#fff",
              margin: 0,
            }}
          >
            2026 Starting <em>Grid</em>
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
            <span style={{ display: "block", height: "1px", width: "48px", background: "rgba(247,190,104,0.3)" }} />
            <span style={{ display: "block", width: "6px", height: "6px", borderRadius: "50%", background: "#F7BE68" }} />
            <span style={{ display: "block", height: "1px", width: "48px", background: "rgba(247,190,104,0.3)" }} />
          </div>
        </div>

        {/* Start Lights Gantry */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              padding: "16px 32px",
              background: "#1a1a1a",
              borderRadius: "8px",
              border: "2px solid #333",
              boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
            }}
          >
            {[1, 2, 3, 4, 5].map((n) => {
              const isLit = lightsPhase >= n && lightsPhase < 6;
              const isGreen = lightsPhase === 6;
              return (
                <motion.div
                  key={n}
                  animate={{
                    opacity: isLit || isGreen ? 1 : 0.15,
                    scale: isLit || isGreen ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.15 }}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: isGreen ? "#00e600" : isLit ? "#e60000" : "#2a2a2a",
                    boxShadow: isGreen
                      ? "0 0 20px #00e600, 0 0 40px rgba(0,230,0,0.4)"
                      : isLit
                      ? "0 0 20px #e60000, 0 0 40px rgba(230,0,0,0.4)"
                      : "inset 0 2px 4px rgba(0,0,0,0.5)",
                    border: "2px solid #444",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* === THE TRACK === */}
        <div
          style={{
            position: "relative",
            /* Asphalt texture using layered gradients */
            background: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 2px,
                rgba(255,255,255,0.008) 2px,
                rgba(255,255,255,0.008) 4px
              ),
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 3px,
                rgba(255,255,255,0.005) 3px,
                rgba(255,255,255,0.005) 6px
              ),
              radial-gradient(ellipse at 30% 20%, rgba(40,40,40,1) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 60%, rgba(35,35,35,1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 90%, rgba(38,38,38,1) 0%, transparent 40%),
              linear-gradient(180deg, #1e1e1e 0%, #1a1a1a 50%, #1c1c1c 100%)
            `,
            borderRadius: "12px",
            padding: "48px 0",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Left kerb (red/white stripes) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "12px",
              borderRadius: "12px 0 0 12px",
              background: `repeating-linear-gradient(
                180deg,
                #cc0000 0px,
                #cc0000 20px,
                #ffffff 20px,
                #ffffff 40px
              )`,
              opacity: 0.7,
            }}
          />
          {/* Right kerb (red/white stripes) */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "12px",
              borderRadius: "0 12px 12px 0",
              background: `repeating-linear-gradient(
                180deg,
                #ffffff 0px,
                #ffffff 20px,
                #cc0000 20px,
                #cc0000 40px
              )`,
              opacity: 0.7,
            }}
          />

          {/* White dashed center line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "48px",
              bottom: "48px",
              width: "3px",
              transform: "translateX(-50%)",
              background: `repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.35) 0px,
                rgba(255,255,255,0.35) 24px,
                transparent 24px,
                transparent 48px
              )`,
            }}
          />

          {/* Outer lane lines */}
          <div
            style={{
              position: "absolute",
              left: "20px",
              top: "48px",
              bottom: "48px",
              width: "2px",
              background: `repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.12) 0px,
                rgba(255,255,255,0.12) 16px,
                transparent 16px,
                transparent 32px
              )`,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "20px",
              top: "48px",
              bottom: "48px",
              width: "2px",
              background: `repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,0.12) 0px,
                rgba(255,255,255,0.12) 16px,
                transparent 16px,
                transparent 32px
              )`,
            }}
          />

          {/* START text painted on track */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
              fontFamily: "monospace",
              fontSize: "2.5rem",
              fontWeight: 900,
              letterSpacing: "0.5em",
              color: "rgba(255,255,255,0.06)",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            START
          </div>

          {/* Grid slots */}
          <div style={{ position: "relative", padding: "0 32px" }}>
            {calendar.map((race, i) => {
              const isLeft = i % 2 === 0;
              const isOrtus = ortusRounds.has(race.round);
              const isExpanded = expandedRound === race.round;

              return (
                <div
                  key={race.round}
                  style={{
                    position: "relative",
                    marginBottom: "6px",
                  }}
                >
                  {/* Grid slot line (white horizontal line across track) */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: isLeft ? "4%" : "50%",
                      right: isLeft ? "50%" : "4%",
                      height: "1px",
                      background: "rgba(255,255,255,0.08)",
                      transform: "translateY(-50%)",
                    }}
                  />

                  {/* Large grid position number painted on asphalt */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      ...(isLeft
                        ? { left: "6%", textAlign: "left" }
                        : { right: "6%", textAlign: "right" }),
                      fontFamily: "monospace",
                      fontSize: "3.5rem",
                      fontWeight: 900,
                      color: "rgba(255,255,255,0.04)",
                      lineHeight: 1,
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    P{race.round}
                  </div>

                  {/* Race card — staggered left/right */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: isLeft ? "flex-start" : "flex-end",
                      paddingLeft: isLeft ? "12%" : "0",
                      paddingRight: isLeft ? "0" : "12%",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.04,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      onClick={() =>
                        setExpandedRound(isExpanded ? null : race.round)
                      }
                      style={{
                        maxWidth: "340px",
                        width: "100%",
                        cursor: "pointer",
                        position: "relative",
                        zIndex: 2,
                        background: isOrtus
                          ? "rgba(247,190,104,0.08)"
                          : "rgba(0,0,0,0.6)",
                        border: isOrtus
                          ? "2px solid rgba(247,190,104,0.5)"
                          : "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        padding: "14px 18px",
                        backdropFilter: "blur(8px)",
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        boxShadow: isOrtus
                          ? "0 0 20px rgba(247,190,104,0.15), inset 0 1px 0 rgba(247,190,104,0.1)"
                          : "0 2px 12px rgba(0,0,0,0.4)",
                      }}
                      whileHover={{
                        borderColor: isOrtus
                          ? "rgba(247,190,104,0.8)"
                          : "rgba(255,255,255,0.25)",
                        boxShadow: isOrtus
                          ? "0 0 30px rgba(247,190,104,0.25)"
                          : "0 4px 20px rgba(0,0,0,0.6)",
                      }}
                    >
                      {/* Ortus hospitality badge */}
                      {isOrtus && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-10px",
                            right: "16px",
                            background: "linear-gradient(135deg, #F7BE68, #d4973a)",
                            color: "#000",
                            fontSize: "0.5rem",
                            fontWeight: 800,
                            letterSpacing: "0.12em",
                            padding: "3px 10px",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            boxShadow: "0 2px 8px rgba(247,190,104,0.4)",
                          }}
                        >
                          ORTUS HOSPITALITY
                        </div>
                      )}

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
                            minWidth: "40px",
                            height: "40px",
                            borderRadius: "8px",
                            background: isOrtus
                              ? "linear-gradient(135deg, rgba(247,190,104,0.25), rgba(247,190,104,0.1))"
                              : "rgba(255,255,255,0.05)",
                            border: isOrtus
                              ? "1px solid rgba(247,190,104,0.3)"
                              : "1px solid rgba(255,255,255,0.08)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              color: isOrtus ? "#F7BE68" : "rgba(255,255,255,0.4)",
                              letterSpacing: "-0.02em",
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
                              fontSize: "1.1rem",
                              fontWeight: 600,
                              color: isOrtus ? "#fff" : "rgba(255,255,255,0.85)",
                              lineHeight: 1.2,
                            }}
                          >
                            {race.gp} GP
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
                                fontFamily: "monospace",
                                fontSize: "0.65rem",
                                color: isOrtus
                                  ? "rgba(247,190,104,0.7)"
                                  : "rgba(255,255,255,0.35)",
                                fontWeight: 500,
                              }}
                            >
                              {race.date}
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
                                fontFamily: "monospace",
                                fontSize: "0.6rem",
                                color: "rgba(255,255,255,0.25)",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {race.location}
                            </span>
                          </div>
                        </div>
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
                                borderTop: isOrtus
                                  ? "1px solid rgba(247,190,104,0.15)"
                                  : "1px solid rgba(255,255,255,0.06)",
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
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  style={{
                                    opacity: 0.4,
                                    color: isOrtus ? "#F7BE68" : "#fff",
                                  }}
                                >
                                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                                  <circle cx="12" cy="9" r="2.5" />
                                </svg>
                                <span
                                  style={{
                                    fontSize: "0.75rem",
                                    color: "rgba(255,255,255,0.45)",
                                  }}
                                >
                                  {race.location}
                                </span>
                              </div>
                              {isOrtus && (
                                <a
                                  href="#"
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    display: "inline-block",
                                    marginTop: "10px",
                                    padding: "8px 20px",
                                    borderRadius: "6px",
                                    background:
                                      "linear-gradient(135deg, rgba(247,190,104,0.2), rgba(247,190,104,0.08))",
                                    border: "1px solid rgba(247,190,104,0.3)",
                                    color: "#F7BE68",
                                    fontSize: "0.65rem",
                                    fontWeight: 600,
                                    letterSpacing: "0.1em",
                                    textDecoration: "none",
                                    textTransform: "uppercase",
                                    transition: "all 0.2s",
                                  }}
                                >
                                  Enquire Now
                                </a>
                              )}
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

          {/* FINISH text painted on track */}
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontFamily: "monospace",
              fontSize: "2.5rem",
              fontWeight: 900,
              letterSpacing: "0.5em",
              color: "rgba(255,255,255,0.06)",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            FINISH
          </div>

          {/* Chequered flag strip at bottom */}
          <div
            style={{
              marginTop: "24px",
              height: "24px",
              marginLeft: "12px",
              marginRight: "12px",
              borderRadius: "0 0 8px 8px",
              overflow: "hidden",
              background: `
                repeating-conic-gradient(
                  #fff 0% 25%,
                  #111 0% 50%
                ) 0 0 / 24px 24px
              `,
              opacity: 0.5,
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
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {/* Tiny chequered flag icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="1" y="1" width="5.5" height="5.5" fill="rgba(255,255,255,0.4)" />
              <rect x="6.5" y="6.5" width="5.5" height="5.5" fill="rgba(255,255,255,0.4)" />
              <rect x="12" y="1" width="5.5" height="5.5" fill="rgba(255,255,255,0.4)" />
              <rect x="17.5" y="6.5" width="5.5" height="5.5" fill="rgba(255,255,255,0.4)" />
              <rect x="1" y="12" width="5.5" height="5.5" fill="rgba(255,255,255,0.4)" />
              <rect x="12" y="12" width="5.5" height="5.5" fill="rgba(255,255,255,0.4)" />
              <rect x="6.5" y="17.5" width="5.5" height="5.5" fill="rgba(255,255,255,0.4)" />
              <rect x="17.5" y="17.5" width="5.5" height="5.5" fill="rgba(255,255,255,0.4)" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "0.95rem",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.35)",
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
