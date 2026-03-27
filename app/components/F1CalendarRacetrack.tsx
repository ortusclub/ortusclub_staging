"use client";

import { useState } from "react";
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

/* ──────────────────────────────────────────────────────
 * Crown / Ortus logo track shape
 * viewBox: 0 0 1000 500
 * ────────────────────────────────────────────────────── */

const W = 1000;
const H = 500;

// The 9 crown vertices (clockwise from bottom-left)
const crownVertices: { x: number; y: number }[] = [
  { x: 60, y: 400 },   // bottom-left start
  { x: 200, y: 140 },  // left peak top
  { x: 320, y: 280 },  // left valley
  { x: 430, y: 180 },  // center-left shoulder
  { x: 500, y: 60 },   // center peak (tallest)
  { x: 570, y: 180 },  // center-right shoulder
  { x: 680, y: 280 },  // right valley
  { x: 800, y: 140 },  // right peak top
  { x: 940, y: 400 },  // bottom-right
];

// Bezier control points for the base return curve
const baseBezier = {
  p0: { x: 940, y: 400 },
  p1: { x: 860, y: 430 },
  p2: { x: 140, y: 430 },
  p3: { x: 60, y: 400 },
};

// Build the SVG path string
function buildTrackPath(): string {
  let d = `M ${crownVertices[0].x} ${crownVertices[0].y}`;
  for (let i = 1; i < crownVertices.length; i++) {
    d += ` L ${crownVertices[i].x} ${crownVertices[i].y}`;
  }
  d += ` C ${baseBezier.p1.x} ${baseBezier.p1.y}, ${baseBezier.p2.x} ${baseBezier.p2.y}, ${baseBezier.p3.x} ${baseBezier.p3.y}`;
  d += " Z";
  return d;
}

// Build inner offset dashed path
function buildInnerPath(): string {
  const offset = 10;
  const cx = crownVertices.reduce((s, p) => s + p.x, 0) / crownVertices.length;
  const cy = crownVertices.reduce((s, p) => s + p.y, 0) / crownVertices.length;

  const inner = crownVertices.map((p) => {
    const dx = cx - p.x;
    const dy = cy - p.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    return { x: p.x + (dx / len) * offset, y: p.y + (dy / len) * offset };
  });

  let d = `M ${inner[0].x} ${inner[0].y}`;
  for (let i = 1; i < inner.length; i++) {
    d += ` L ${inner[i].x} ${inner[i].y}`;
  }
  // Offset the base curve control points inward slightly
  const bcp1 = { x: baseBezier.p1.x - 5, y: baseBezier.p1.y - 8 };
  const bcp2 = { x: baseBezier.p2.x + 5, y: baseBezier.p2.y - 8 };
  d += ` C ${bcp1.x} ${bcp1.y}, ${bcp2.x} ${bcp2.y}, ${inner[0].x} ${inner[0].y}`;
  d += " Z";
  return d;
}

const trackPathD = buildTrackPath();
const innerPathD = buildInnerPath();

/* ──────────────────────────────────────────────────────
 * Linearize the path into segments and compute 24
 * evenly-spaced checkpoint positions
 * ────────────────────────────────────────────────────── */

function cubicBezierPoint(
  t: number,
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
): { x: number; y: number } {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
  };
}

function linearizePath(): { x: number; y: number }[] {
  // Crown vertices as-is (9 points)
  const pts: { x: number; y: number }[] = [...crownVertices];

  // Sample the base bezier curve into ~12 segments
  const baseSteps = 12;
  for (let i = 1; i <= baseSteps; i++) {
    const t = i / baseSteps;
    const pt = cubicBezierPoint(t, baseBezier.p0, baseBezier.p1, baseBezier.p2, baseBezier.p3);
    pts.push(pt);
  }

  return pts;
}

function computeCheckpoints(count: number): { x: number; y: number; labelAbove: boolean }[] {
  const pts = linearizePath();

  // Compute segment lengths
  const segments: { x1: number; y1: number; x2: number; y2: number; len: number }[] = [];
  let totalLength = 0;

  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1].x - pts[i].x;
    const dy = pts[i + 1].y - pts[i].y;
    const len = Math.sqrt(dx * dx + dy * dy);
    segments.push({ x1: pts[i].x, y1: pts[i].y, x2: pts[i + 1].x, y2: pts[i + 1].y, len });
    totalLength += len;
  }

  const spacing = totalLength / count;
  const result: { x: number; y: number; labelAbove: boolean }[] = [];

  for (let i = 0; i < count; i++) {
    const targetDist = i * spacing;
    let accumulated = 0;
    let placed = false;

    for (let s = 0; s < segments.length; s++) {
      if (accumulated + segments[s].len >= targetDist) {
        const rem = targetDist - accumulated;
        const t = segments[s].len > 0 ? rem / segments[s].len : 0;
        const x = segments[s].x1 + t * (segments[s].x2 - segments[s].x1);
        const y = segments[s].y1 + t * (segments[s].y2 - segments[s].y1);
        // Label above if point is in the lower half (y > 250)
        const labelAbove = y > 250;
        result.push({ x, y, labelAbove });
        placed = true;
        break;
      }
      accumulated += segments[s].len;
    }

    if (!placed) {
      result.push({ x: pts[0].x, y: pts[0].y, labelAbove: false });
    }
  }

  return result;
}

const checkpoints = computeCheckpoints(24);

/* ──────────────────────────────────────────────────────
 * Component
 * ────────────────────────────────────────────────────── */

export default function F1CalendarRacetrack() {
  const [activeRace, setActiveRace] = useState<Race | null>(null);

  return (
    <section
      id="calendar"
      style={{
        background: "#080a08",
        padding: "80px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Keyframe animations */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.35em",
              color: "#F7BE68",
              marginBottom: "12px",
              textTransform: "uppercase",
            }}
          >
            All 24 Rounds
          </p>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "3rem",
              fontWeight: 400,
              color: "#fff",
              margin: 0,
            }}
          >
            The 2026 <em>Circuit</em>
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

        {/* Track SVG */}
        <div
          style={{
            position: "relative",
            aspectRatio: `${W} / ${H}`,
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            style={{ width: "100%", height: "100%", overflow: "visible", display: "block" }}
          >
            <defs>
              {/* Gold gradient for main track stroke */}
              <linearGradient id="crownTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F7BE68" stopOpacity={0.9} />
                <stop offset="30%" stopColor="#e8a84a" stopOpacity={1} />
                <stop offset="50%" stopColor="#F7BE68" stopOpacity={0.7} />
                <stop offset="70%" stopColor="#e8a84a" stopOpacity={1} />
                <stop offset="100%" stopColor="#F7BE68" stopOpacity={0.9} />
              </linearGradient>

              {/* Outer glow filter */}
              <filter id="trackOuterGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.97  0 0 0 0 0.75  0 0 0 0 0.41  0 0 0 0.4 0"
                  result="colorBlur"
                />
                <feMerge>
                  <feMergeNode in="colorBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Checkpoint glow filter */}
              <filter id="checkpointGlow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.97  0 0 0 0 0.75  0 0 0 0 0.41  0 0 0 0.7 0"
                />
              </filter>

              {/* Car glow filter */}
              <filter id="carGlow" x="-300%" y="-300%" width="700%" height="700%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.97  0 0 0 0 0.75  0 0 0 0 0.41  0 0 0 0.8 0"
                  result="colorBlur"
                />
                <feMerge>
                  <feMergeNode in="colorBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Subtle radial fill */}
              <radialGradient id="trackSurface" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(247,190,104,0.04)" />
                <stop offset="100%" stopColor="rgba(247,190,104,0)" />
              </radialGradient>
            </defs>

            {/* Subtle interior fill */}
            <path d={trackPathD} fill="url(#trackSurface)" />

            {/* Track outer glow layer */}
            <path
              d={trackPathD}
              fill="none"
              stroke="rgba(247,190,104,0.12)"
              strokeWidth={16}
              strokeLinejoin="round"
              filter="url(#trackOuterGlow)"
            />

            {/* Main track stroke — 5px gold gradient */}
            <path
              d={trackPathD}
              fill="none"
              stroke="url(#crownTrackGrad)"
              strokeWidth={5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Inner dashed offset path */}
            <path
              d={innerPathD}
              fill="none"
              stroke="rgba(247,190,104,0.12)"
              strokeWidth={1}
              strokeDasharray="8 6"
              strokeLinejoin="round"
            />

            {/* ORTUS watermark text centered inside the crown */}
            <text
              x={W / 2}
              y={320}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "90px",
                fontWeight: 300,
                fill: "rgba(247,190,104,0.05)",
                letterSpacing: "0.25em",
                userSelect: "none",
              }}
            >
              ORTUS
            </text>

            {/* FORMULA 1 subtitle */}
            <text
              x={W / 2}
              y={355}
              textAnchor="middle"
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                fill: "rgba(255,255,255,0.06)",
                letterSpacing: "0.35em",
                userSelect: "none",
              }}
            >
              FORMULA 1 — 2026 SEASON
            </text>

            {/* Race checkpoints */}
            {checkpoints.map((pt, i) => {
              const race = calendar[i];
              const isOrtus = ortusRounds.has(race.round);
              const isActive = activeRace?.round === race.round;
              const r = 12;

              const labelY = pt.labelAbove ? pt.y - 22 : pt.y + 28;
              const abbrY = pt.labelAbove ? pt.y - 36 : pt.y + 42;

              return (
                <g
                  key={race.round}
                  onMouseEnter={() => setActiveRace(race)}
                  onMouseLeave={() => setActiveRace(null)}
                  onClick={() => setActiveRace(activeRace?.round === race.round ? null : race)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Gold glow halo for all checkpoints */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={20}
                    fill="none"
                    stroke="rgba(247,190,104,0.08)"
                    strokeWidth={1}
                    filter="url(#checkpointGlow)"
                  />

                  {/* Ortus-specific pulsing ring */}
                  {isOrtus && (
                    <>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={22}
                        fill="none"
                        stroke="rgba(247,190,104,0.2)"
                        strokeWidth={1.5}
                        filter="url(#checkpointGlow)"
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={17}
                        fill="none"
                        stroke="rgba(247,190,104,0.3)"
                        strokeWidth={1}
                        style={{ animation: "pulseGlow 2s ease-in-out infinite" }}
                      />
                    </>
                  )}

                  {/* Checkpoint marker — 12px radius */}
                  <motion.circle
                    cx={pt.x}
                    cy={pt.y}
                    r={r}
                    fill={isOrtus ? "#F7BE68" : "rgba(247,190,104,0.5)"}
                    stroke={isOrtus ? "rgba(247,190,104,0.7)" : "rgba(247,190,104,0.2)"}
                    strokeWidth={isOrtus ? 2.5 : 1.5}
                    whileHover={{ scale: 1.4 }}
                    animate={{
                      r: isActive ? r + 4 : r,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    filter={isOrtus ? "url(#checkpointGlow)" : undefined}
                  />

                  {/* Round number label — always visible */}
                  <text
                    x={pt.x}
                    y={labelY}
                    textAnchor="middle"
                    style={{
                      fontSize: "9.5px",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      fill: isOrtus ? "#F7BE68" : "rgba(255,255,255,0.6)",
                    }}
                  >
                    R{race.round.toString().padStart(2, "0")}
                  </text>

                  {/* GP abbreviation — always visible */}
                  <text
                    x={pt.x}
                    y={abbrY}
                    textAnchor="middle"
                    style={{
                      fontSize: "8px",
                      fontWeight: 600,
                      fontFamily: "monospace",
                      letterSpacing: "0.06em",
                      fill: isOrtus ? "rgba(247,190,104,0.8)" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {race.abbr}
                  </text>
                </g>
              );
            })}

            {/* Animated car dot — SVG animateMotion, ~20s loop */}
            <circle r="6" fill="#F7BE68" opacity={0.95} filter="url(#carGlow)">
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path={trackPathD}
                rotate="auto"
              />
            </circle>
            {/* Car outer glow ring */}
            <circle r="14" fill="none" stroke="rgba(247,190,104,0.25)" strokeWidth={2}>
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path={trackPathD}
                rotate="auto"
              />
            </circle>
            <circle r="24" fill="none" stroke="rgba(247,190,104,0.06)" strokeWidth={1}>
              <animateMotion
                dur="20s"
                repeatCount="indefinite"
                path={trackPathD}
                rotate="auto"
              />
            </circle>
          </svg>

          {/* Floating premium hover card */}
          <AnimatePresence>
            {activeRace &&
              (() => {
                const pt = checkpoints[activeRace.round - 1];
                const isOrtus = ortusRounds.has(activeRace.round);
                const tooltipAbove = !pt.labelAbove;
                return (
                  <motion.div
                    key={activeRace.round}
                    initial={{ opacity: 0, y: tooltipAbove ? 8 : -8, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: tooltipAbove ? 8 : -8, scale: 0.92 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      left: `${(pt.x / W) * 100}%`,
                      top: `${(pt.y / H) * 100}%`,
                      transform: `translate(-50%, ${tooltipAbove ? "calc(-100% - 32px)" : "32px"})`,
                      background: "linear-gradient(135deg, #141714 0%, #1a1d1a 100%)",
                      border: `1px solid ${isOrtus ? "rgba(247,190,104,0.35)" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: "14px",
                      padding: "18px 24px",
                      boxShadow: isOrtus
                        ? "0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(247,190,104,0.12)"
                        : "0 20px 60px rgba(0,0,0,0.7)",
                      zIndex: 30,
                      whiteSpace: "nowrap" as const,
                      backdropFilter: "blur(16px)",
                      pointerEvents: "none" as const,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.55rem",
                        fontFamily: "monospace",
                        color: isOrtus ? "#F7BE68" : "rgba(255,255,255,0.3)",
                        letterSpacing: "0.14em",
                        marginBottom: "6px",
                      }}
                    >
                      ROUND {activeRace.round.toString().padStart(2, "0")}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "1.3rem",
                        fontWeight: 500,
                        color: "#fff",
                        marginBottom: "8px",
                      }}
                    >
                      {activeRace.gp} Grand Prix
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: "rgba(255,255,255,0.45)",
                          fontFamily: "monospace",
                        }}
                      >
                        {activeRace.date}
                      </span>
                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: "rgba(255,255,255,0.25)",
                          fontFamily: "monospace",
                        }}
                      >
                        {activeRace.location}
                      </span>
                    </div>
                    {isOrtus && (
                      <div style={{ marginTop: "12px" }}>
                        <span
                          style={{
                            fontSize: "0.45rem",
                            letterSpacing: "0.14em",
                            padding: "4px 14px",
                            borderRadius: "999px",
                            background: "rgba(247,190,104,0.12)",
                            color: "#F7BE68",
                            border: "1px solid rgba(247,190,104,0.2)",
                            fontWeight: 600,
                          }}
                        >
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "rgba(247,190,104,0.5)",
                border: "1.5px solid rgba(247,190,104,0.2)",
              }}
            />
            <span
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.08em",
                fontFamily: "monospace",
              }}
            >
              Grand Prix
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#F7BE68",
                border: "2.5px solid rgba(247,190,104,0.5)",
                boxShadow: "0 0 12px rgba(247,190,104,0.4), 0 0 24px rgba(247,190,104,0.15)",
              }}
            />
            <span
              style={{
                fontSize: "0.65rem",
                color: "#F7BE68",
                letterSpacing: "0.08em",
                fontFamily: "monospace",
              }}
            >
              Ortus Hospitality
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "20px",
                height: "0",
                borderTop: "2px dashed rgba(247,190,104,0.25)",
              }}
            />
            <span
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.08em",
                fontFamily: "monospace",
              }}
            >
              Track Edge
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#F7BE68",
                boxShadow: "0 0 10px rgba(247,190,104,0.6)",
              }}
            />
            <span
              style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.08em",
                fontFamily: "monospace",
              }}
            >
              Racing Car
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
