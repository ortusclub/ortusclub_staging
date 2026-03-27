"use client";

import { useRef, useState } from "react";
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

const months = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function F1CalendarTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredRace, setHoveredRace] = useState<Race | null>(null);
  const [tooltipX, setTooltipX] = useState(0);

  const grouped = months.map((m) => ({
    month: m,
    races: calendar.filter((r) => r.date.startsWith(m)),
  }));

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section id="calendar" style={{ background: "#0a0c0a", padding: "80px 24px" }}>
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "#F7BE68", marginBottom: "12px", textTransform: "uppercase" }}>
            All 24 Rounds
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3rem", fontWeight: 400, color: "#fff" }}>
            2026 Season <em>Calendar</em>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
            <span className="block w-1.5 h-1.5 rounded-full" style={{ background: "#F7BE68" }} />
            <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
          </div>
        </div>

        {/* Scroll controls */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <button
            onClick={() => scroll(-1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {grouped.map((group) => (
              <div
                key={group.month}
                className="flex-shrink-0"
                style={{ minWidth: "200px", scrollSnapAlign: "start", paddingRight: "12px" }}
              >
                {/* Month label */}
                <div style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.2)",
                  fontStyle: "italic",
                  marginBottom: "24px",
                  paddingLeft: "4px",
                }}>
                  {group.month} 2026
                </div>

                {/* Timeline line + dots */}
                <div className="relative" style={{ height: "120px" }}>
                  {/* Horizontal line */}
                  <div
                    className="absolute top-1/2 left-0 right-0"
                    style={{ height: "1px", background: "rgba(247,190,104,0.12)", transform: "translateY(-50%)" }}
                  />

                  {/* Race dots */}
                  <div className="flex items-center h-full" style={{ gap: `${Math.max(20, (180 - group.races.length * 40) / Math.max(group.races.length - 1, 1))}px`, paddingLeft: "12px" }}>
                    {group.races.map((race) => {
                      const isOrtus = ortusRounds.has(race.round);
                      return (
                        <div
                          key={race.round}
                          className="relative flex flex-col items-center"
                          onMouseEnter={(e) => {
                            setHoveredRace(race);
                            const rect = e.currentTarget.getBoundingClientRect();
                            const parent = scrollRef.current?.getBoundingClientRect();
                            if (parent) setTooltipX(rect.left - parent.left + rect.width / 2);
                          }}
                          onMouseLeave={() => setHoveredRace(null)}
                          style={{ cursor: "pointer" }}
                        >
                          {/* Dot */}
                          <motion.div
                            whileHover={{ scale: 1.6 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            style={{
                              width: isOrtus ? "14px" : "10px",
                              height: isOrtus ? "14px" : "10px",
                              borderRadius: "50%",
                              background: isOrtus
                                ? "radial-gradient(circle, #F7BE68 0%, #C5A255 100%)"
                                : "rgba(255,255,255,0.15)",
                              border: isOrtus ? "2px solid rgba(247,190,104,0.4)" : "1px solid rgba(255,255,255,0.08)",
                              boxShadow: isOrtus ? "0 0 16px rgba(247,190,104,0.3)" : "none",
                              position: "relative",
                              zIndex: 2,
                            }}
                          />

                          {/* Round number below */}
                          <span style={{
                            fontSize: "0.5rem",
                            color: isOrtus ? "#F7BE68" : "rgba(255,255,255,0.15)",
                            marginTop: "10px",
                            fontFamily: "monospace",
                            letterSpacing: "0.05em",
                          }}>
                            R{race.round.toString().padStart(2, "0")}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating tooltip */}
          <AnimatePresence>
            {hoveredRace && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="absolute pointer-events-none"
                style={{
                  bottom: "calc(100% - 20px)",
                  left: `${tooltipX}px`,
                  transform: "translateX(-50%)",
                  background: "#242724",
                  border: "1px solid rgba(247,190,104,0.15)",
                  borderRadius: "12px",
                  padding: "14px 20px",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                  zIndex: 20,
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem", color: "#fff", marginBottom: "4px" }}>
                  {hoveredRace.gp} Grand Prix
                </div>
                <div className="flex items-center gap-4">
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>{hoveredRace.date}</span>
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{hoveredRace.location}</span>
                </div>
                {ortusRounds.has(hoveredRace.round) && (
                  <div style={{ marginTop: "8px" }}>
                    <span style={{ fontSize: "0.45rem", letterSpacing: "0.12em", padding: "3px 10px", borderRadius: "999px", background: "rgba(247,190,104,0.12)", color: "#F7BE68", border: "1px solid rgba(247,190,104,0.15)" }}>
                      ORTUS EXPERIENCE AVAILABLE
                    </span>
                  </div>
                )}
                {/* Arrow */}
                <div style={{
                  position: "absolute", bottom: "-5px", left: "50%", transform: "translateX(-50%) rotate(45deg)",
                  width: "10px", height: "10px", background: "#242724", borderRight: "1px solid rgba(247,190,104,0.15)", borderBottom: "1px solid rgba(247,190,104,0.15)",
                }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-6" style={{ paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <div className="flex items-center gap-2">
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>Grand Prix</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "radial-gradient(circle, #F7BE68, #C5A255)", border: "2px solid rgba(247,190,104,0.4)", boxShadow: "0 0 8px rgba(247,190,104,0.2)" }} />
            <span style={{ fontSize: "0.6rem", color: "#F7BE68", letterSpacing: "0.08em" }}>Ortus Hospitality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
