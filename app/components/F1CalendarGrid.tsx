"use client";

import { useState } from "react";
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

/* Pair races into grid rows (2 per row, staggered like F1 starting grid) */
const gridRows: [Race, Race | null][] = [];
for (let i = 0; i < calendar.length; i += 2) {
  gridRows.push([calendar[i], calendar[i + 1] || null]);
}

export default function F1CalendarGrid() {
  const [expandedRound, setExpandedRound] = useState<number | null>(null);

  return (
    <section id="calendar" style={{ background: "#0a0c0a", padding: "80px 24px" }}>
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "#F7BE68", marginBottom: "12px", textTransform: "uppercase" }}>
            All 24 Rounds
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3rem", fontWeight: 400, color: "#fff" }}>
            2026 Starting <em>Grid</em>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
            <span className="block w-1.5 h-1.5 rounded-full" style={{ background: "#F7BE68" }} />
            <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
          </div>
        </div>

        {/* Start lights */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.div
              key={n}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{ delay: n * 0.2, duration: 0.3 }}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "#F7BE68",
                boxShadow: "0 0 12px rgba(247,190,104,0.4)",
              }}
            />
          ))}
        </div>

        {/* Grid formation */}
        <div className="relative">
          {/* Center line (track) */}
          <div
            className="absolute left-1/2 top-0 bottom-0"
            style={{
              width: "2px",
              background: "linear-gradient(to bottom, rgba(247,190,104,0.3) 0%, rgba(247,190,104,0.05) 100%)",
              transform: "translateX(-50%)",
            }}
          />

          {/* Dashed lane markings */}
          <div
            className="absolute top-0 bottom-0"
            style={{ left: "25%", width: "1px", background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 8px, transparent 8px, transparent 20px)" }}
          />
          <div
            className="absolute top-0 bottom-0"
            style={{ right: "25%", width: "1px", background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 8px, transparent 8px, transparent 20px)" }}
          />

          {gridRows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="relative flex items-stretch gap-6 mb-3"
              style={{ minHeight: "72px" }}
            >
              {/* Left car (odd positions: P1, P3, P5...) */}
              <div className="flex-1 flex justify-end pr-8">
                <RaceCard
                  race={row[0]}
                  isOrtus={ortusRounds.has(row[0].round)}
                  isExpanded={expandedRound === row[0].round}
                  onToggle={() => setExpandedRound(expandedRound === row[0].round ? null : row[0].round)}
                  align="right"
                />
              </div>

              {/* Position marker (center) */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#0a0c0a",
                  border: "1px solid rgba(247,190,104,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.5rem",
                  fontFamily: "monospace",
                  color: "rgba(247,190,104,0.4)",
                }}>
                  {rowIdx + 1}
                </div>
              </div>

              {/* Right car (even positions: P2, P4, P6...) */}
              <div className="flex-1 flex justify-start pl-8">
                {row[1] && (
                  <RaceCard
                    race={row[1]}
                    isOrtus={ortusRounds.has(row[1].round)}
                    isExpanded={expandedRound === row[1].round}
                    onToggle={() => setExpandedRound(expandedRound === row[1]!.round ? null : row[1]!.round)}
                    align="left"
                  />
                )}
              </div>
            </div>
          ))}

          {/* Chequered flag at bottom */}
          <div className="flex justify-center pt-6">
            <div className="flex items-center gap-2" style={{ padding: "8px 20px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="5" height="5" fill="rgba(255,255,255,0.3)" />
                <rect x="7" y="7" width="5" height="5" fill="rgba(255,255,255,0.3)" />
                <rect x="12" y="2" width="5" height="5" fill="rgba(255,255,255,0.3)" />
                <rect x="17" y="7" width="5" height="5" fill="rgba(255,255,255,0.3)" />
                <rect x="2" y="12" width="5" height="5" fill="rgba(255,255,255,0.3)" />
                <rect x="12" y="12" width="5" height="5" fill="rgba(255,255,255,0.3)" />
                <rect x="7" y="17" width="5" height="5" fill="rgba(255,255,255,0.3)" />
                <rect x="17" y="17" width="5" height="5" fill="rgba(255,255,255,0.3)" />
              </svg>
              <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.85rem", fontStyle: "italic", color: "rgba(255,255,255,0.25)" }}>
                Season Finale — Abu Dhabi
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Individual Race Card ── */
function RaceCard({
  race,
  isOrtus,
  isExpanded,
  onToggle,
  align,
}: {
  race: Race;
  isOrtus: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  align: "left" | "right";
}) {
  return (
    <motion.div
      layout
      onClick={onToggle}
      className="cursor-pointer"
      style={{
        maxWidth: "320px",
        width: "100%",
        background: isOrtus ? "rgba(247,190,104,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${isOrtus ? "rgba(247,190,104,0.12)" : "rgba(255,255,255,0.04)"}`,
        borderRadius: "12px",
        padding: "14px 18px",
        transition: "border-color 0.3s",
        textAlign: align,
      }}
      whileHover={{
        borderColor: isOrtus ? "rgba(247,190,104,0.3)" : "rgba(255,255,255,0.12)",
      }}
    >
      <div className={`flex items-center gap-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
        {/* Position badge */}
        <div style={{
          minWidth: "32px",
          height: "24px",
          borderRadius: "6px",
          background: isOrtus ? "rgba(247,190,104,0.12)" : "rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.55rem",
          fontFamily: "monospace",
          color: isOrtus ? "#F7BE68" : "rgba(255,255,255,0.2)",
          letterSpacing: "0.05em",
          flexShrink: 0,
        }}>
          P{race.round}
        </div>

        <div className={`flex-1 ${align === "right" ? "text-right" : "text-left"}`}>
          <div style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.92rem",
            color: isOrtus ? "#fff" : "rgba(255,255,255,0.5)",
            fontWeight: isOrtus ? 500 : 400,
          }}>
            {race.gp} GP
            {isOrtus && (
              <span style={{
                fontSize: "0.4rem",
                letterSpacing: "0.1em",
                marginLeft: "6px",
                padding: "2px 6px",
                borderRadius: "999px",
                background: "rgba(247,190,104,0.1)",
                color: "#F7BE68",
                border: "1px solid rgba(247,190,104,0.15)",
                verticalAlign: "middle",
              }}>
                ORTUS
              </span>
            )}
          </div>
          <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.2)", fontFamily: "monospace", marginTop: "2px" }}>
            {race.date}
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
            <div style={{ paddingTop: "12px", marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div className="flex items-center gap-2 mb-2">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3, color: "#fff" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
                </svg>
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>{race.location}</span>
              </div>
              {isOrtus && (
                <a
                  href="#"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: "inline-block",
                    marginTop: "6px",
                    padding: "6px 16px",
                    borderRadius: "999px",
                    border: "1px solid rgba(247,190,104,0.2)",
                    color: "#F7BE68",
                    fontSize: "0.6rem",
                    letterSpacing: "0.06em",
                    textDecoration: "none",
                  }}
                >
                  Enquire
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
