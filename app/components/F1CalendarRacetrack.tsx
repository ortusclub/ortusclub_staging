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

/*
 * SVG racetrack path shaped like the Ortus "O" monogram —
 * a rounded rectangle / stadium shape that the 24 races trace around.
 * We place checkpoints at evenly-spaced intervals along this path.
 */

export default function F1CalendarRacetrack() {
  const [activeRace, setActiveRace] = useState<Race | null>(null);

  /* The track is a rounded-rect "O" shape. We define it as a viewBox path
     and compute 24 evenly-spaced points along it. */
  const W = 1000;
  const H = 600;
  const pad = 80;
  const r = 140; // corner radius

  // Build the rounded rectangle path points
  const trackPoints = computeTrackPoints(W, H, pad, r, 24);

  // The SVG path for the track shape
  const trackPath = `
    M ${pad + r} ${pad}
    L ${W - pad - r} ${pad}
    A ${r} ${r} 0 0 1 ${W - pad} ${pad + r}
    L ${W - pad} ${H - pad - r}
    A ${r} ${r} 0 0 1 ${W - pad - r} ${H - pad}
    L ${pad + r} ${H - pad}
    A ${r} ${r} 0 0 1 ${pad} ${H - pad - r}
    L ${pad} ${pad + r}
    A ${r} ${r} 0 0 1 ${pad + r} ${pad}
    Z
  `;

  return (
    <section id="calendar" style={{ background: "#0a0c0a", padding: "80px 24px" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "#F7BE68", marginBottom: "12px", textTransform: "uppercase" }}>
            All 24 Rounds
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3rem", fontWeight: 400, color: "#fff" }}>
            The 2026 <em>Circuit</em>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
            <span className="block w-1.5 h-1.5 rounded-full" style={{ background: "#F7BE68" }} />
            <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
          </div>
        </div>

        {/* Track SVG */}
        <div className="relative" style={{ aspectRatio: `${W}/${H}`, maxWidth: "1000px", margin: "0 auto" }}>
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            {/* Track surface (outer glow) */}
            <defs>
              <filter id="trackGlow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="trackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(247,190,104,0.08)" />
                <stop offset="50%" stopColor="rgba(247,190,104,0.03)" />
                <stop offset="100%" stopColor="rgba(247,190,104,0.08)" />
              </linearGradient>
            </defs>

            {/* Track outline */}
            <path
              d={trackPath}
              fill="none"
              stroke="url(#trackGrad)"
              strokeWidth="40"
              strokeLinecap="round"
            />
            <path
              d={trackPath}
              fill="none"
              stroke="rgba(247,190,104,0.12)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />

            {/* Inner track line */}
            <path
              d={buildInnerPath(W, H, pad + 18, r - 18)}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />

            {/* Start/finish line */}
            <line
              x1={pad + r + 20}
              y1={pad - 18}
              x2={pad + r + 20}
              y2={pad + 18}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="3"
              strokeDasharray="3 3"
            />

            {/* Race checkpoints */}
            {trackPoints.map((pt, i) => {
              const race = calendar[i];
              const isOrtus = ortusRounds.has(race.round);
              const isActive = activeRace?.round === race.round;
              const dotR = isOrtus ? 8 : 5;

              return (
                <g
                  key={race.round}
                  onMouseEnter={() => setActiveRace(race)}
                  onMouseLeave={() => setActiveRace(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Glow for Ortus races */}
                  {isOrtus && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="16"
                      fill="none"
                      stroke="rgba(247,190,104,0.15)"
                      strokeWidth="1"
                    />
                  )}

                  {/* Checkpoint dot */}
                  <motion.circle
                    cx={pt.x}
                    cy={pt.y}
                    r={dotR}
                    fill={isOrtus ? "#F7BE68" : "rgba(255,255,255,0.2)"}
                    stroke={isOrtus ? "rgba(247,190,104,0.4)" : "rgba(255,255,255,0.08)"}
                    strokeWidth={isOrtus ? 2 : 1}
                    animate={{ r: isActive ? dotR + 4 : dotR }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  />

                  {/* Round label (always visible) */}
                  <text
                    x={pt.x}
                    y={pt.y + (pt.labelBelow ? 22 : -14)}
                    textAnchor="middle"
                    style={{
                      fontSize: "8px",
                      fontFamily: "monospace",
                      fill: isOrtus ? "rgba(247,190,104,0.5)" : "rgba(255,255,255,0.12)",
                    }}
                  >
                    R{race.round.toString().padStart(2, "0")}
                  </text>
                </g>
              );
            })}

            {/* Center content — "ORTUS" wordmark */}
            <text
              x={W / 2}
              y={H / 2 - 20}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "60px",
                fontWeight: 300,
                fill: "rgba(247,190,104,0.06)",
                letterSpacing: "0.15em",
              }}
            >
              ORTUS
            </text>
            <text
              x={W / 2}
              y={H / 2 + 20}
              textAnchor="middle"
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                fill: "rgba(255,255,255,0.08)",
                letterSpacing: "0.3em",
              }}
            >
              FORMULA 1 — 2026
            </text>
          </svg>

          {/* Floating tooltip */}
          <AnimatePresence>
            {activeRace && (() => {
              const pt = trackPoints[activeRace.round - 1];
              const isOrtus = ortusRounds.has(activeRace.round);
              return (
                <motion.div
                  key={activeRace.round}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${(pt.x / W) * 100}%`,
                    top: `${(pt.y / H) * 100}%`,
                    transform: `translate(-50%, ${pt.labelBelow ? "16px" : "calc(-100% - 16px)"})`,
                    background: "#1a1d1a",
                    border: `1px solid ${isOrtus ? "rgba(247,190,104,0.2)" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: "12px",
                    padding: "14px 20px",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
                    zIndex: 30,
                    whiteSpace: "nowrap",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem", color: "#fff", marginBottom: "4px" }}>
                    {activeRace.gp} Grand Prix
                  </div>
                  <div className="flex items-center gap-4">
                    <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>{activeRace.date}</span>
                    <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{activeRace.location}</span>
                  </div>
                  {isOrtus && (
                    <div style={{ marginTop: "8px" }}>
                      <span style={{ fontSize: "0.45rem", letterSpacing: "0.12em", padding: "3px 10px", borderRadius: "999px", background: "rgba(247,190,104,0.12)", color: "#F7BE68", border: "1px solid rgba(247,190,104,0.15)" }}>
                        ORTUS EXPERIENCE
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-8 mt-10" style={{ paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <div className="flex items-center gap-2">
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>Grand Prix</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#F7BE68", border: "2px solid rgba(247,190,104,0.4)", boxShadow: "0 0 8px rgba(247,190,104,0.2)" }} />
            <span style={{ fontSize: "0.6rem", color: "#F7BE68", letterSpacing: "0.08em" }}>Ortus Hospitality</span>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ width: "12px", height: "3px", background: "rgba(255,255,255,0.2)", borderRadius: "2px" }} />
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em" }}>Start / Finish</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Compute evenly-spaced points around the rounded rectangle ── */
function computeTrackPoints(
  W: number, H: number, pad: number, r: number, count: number
): { x: number; y: number; labelBelow: boolean }[] {
  // Build segments of the rounded rect perimeter
  const segments: { type: "line" | "arc"; length: number }[] = [];
  const topLen = (W - 2 * pad - 2 * r);
  const rightLen = (H - 2 * pad - 2 * r);
  const bottomLen = topLen;
  const leftLen = rightLen;
  const arcLen = (Math.PI * r) / 2;

  // Total perimeter segments (clockwise from top-left corner after arc)
  const segs = [
    { type: "line" as const, length: topLen },        // top
    { type: "arc" as const, length: arcLen },          // top-right corner
    { type: "line" as const, length: rightLen },       // right
    { type: "arc" as const, length: arcLen },          // bottom-right corner
    { type: "line" as const, length: bottomLen },      // bottom
    { type: "arc" as const, length: arcLen },          // bottom-left corner
    { type: "line" as const, length: leftLen },        // left
    { type: "arc" as const, length: arcLen },          // top-left corner
  ];

  const totalPerimeter = segs.reduce((s, seg) => s + seg.length, 0);
  const spacing = totalPerimeter / count;

  const points: { x: number; y: number; labelBelow: boolean }[] = [];

  for (let i = 0; i < count; i++) {
    const dist = i * spacing;
    const pt = getPointAtDistance(dist, segs, W, H, pad, r);
    points.push(pt);
  }

  return points;
}

function getPointAtDistance(
  dist: number,
  segs: { type: "line" | "arc"; length: number }[],
  W: number, H: number, pad: number, r: number
): { x: number; y: number; labelBelow: boolean } {
  let remaining = dist;

  for (let i = 0; i < segs.length; i++) {
    if (remaining <= segs[i].length) {
      const t = remaining / segs[i].length;

      switch (i) {
        case 0: // top line (left to right)
          return { x: pad + r + t * (W - 2 * pad - 2 * r), y: pad, labelBelow: false };
        case 1: { // top-right arc
          const angle = -Math.PI / 2 + t * (Math.PI / 2);
          return { x: W - pad - r + Math.cos(angle) * r, y: pad + r + Math.sin(angle) * r, labelBelow: angle > -Math.PI / 4 };
        }
        case 2: // right line (top to bottom)
          return { x: W - pad, y: pad + r + t * (H - 2 * pad - 2 * r), labelBelow: true };
        case 3: { // bottom-right arc
          const angle = 0 + t * (Math.PI / 2);
          return { x: W - pad - r + Math.cos(angle) * r, y: H - pad - r + Math.sin(angle) * r, labelBelow: true };
        }
        case 4: // bottom line (right to left)
          return { x: W - pad - r - t * (W - 2 * pad - 2 * r), y: H - pad, labelBelow: true };
        case 5: { // bottom-left arc
          const angle = Math.PI / 2 + t * (Math.PI / 2);
          return { x: pad + r + Math.cos(angle) * r, y: H - pad - r + Math.sin(angle) * r, labelBelow: angle < (3 * Math.PI) / 4 };
        }
        case 6: // left line (bottom to top)
          return { x: pad, y: H - pad - r - t * (H - 2 * pad - 2 * r), labelBelow: false };
        case 7: { // top-left arc
          const angle = Math.PI + t * (Math.PI / 2);
          return { x: pad + r + Math.cos(angle) * r, y: pad + r + Math.sin(angle) * r, labelBelow: false };
        }
      }
    }
    remaining -= segs[i].length;
  }

  return { x: pad + r, y: pad, labelBelow: false };
}

function buildInnerPath(W: number, H: number, pad: number, r: number): string {
  return `
    M ${pad + r} ${pad}
    L ${W - pad - r} ${pad}
    A ${r} ${r} 0 0 1 ${W - pad} ${pad + r}
    L ${W - pad} ${H - pad - r}
    A ${r} ${r} 0 0 1 ${W - pad - r} ${H - pad}
    L ${pad + r} ${H - pad}
    A ${r} ${r} 0 0 1 ${pad} ${H - pad - r}
    L ${pad} ${pad + r}
    A ${r} ${r} 0 0 1 ${pad + r} ${pad}
    Z
  `;
}
