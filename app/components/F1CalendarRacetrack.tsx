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

/* ──────────────────────────────────────────────────────────────
 * ORTUS PAPER BOAT LOGO — exact geometry from the logo image
 * viewBox: 0 0 1000 600
 *
 *              A (500,55)          ← sail apex
 *             / | \
 *            /  |  \
 *      ----H---+----I----         ← sail horizontal fold
 *          /    |    \
 *         /     |     \
 *        B──────+──────F          ← deck line (y≈290)
 *       / \     |     / \
 *      /   \    |    /   \
 *     C     \   |   /     E       ← hull widest (y≈400)
 *      \     \  |  /     /
 *       \     \ | /     /
 *        ──────D──────            ← hull bottom (500,510)
 *
 * Outer contour: A → B → C → D → E → F → A
 * Internal folds: A↔D vertical, H↔I sail horizontal,
 *                 B↔D hull left fold, F↔D hull right fold, B↔F deck
 * ────────────────────────────────────────────────────────────── */

const W = 1000;
const VH = 620;

// 6 outer vertices — exact paper boat proportions:
// Narrow steep sail on top, wide flat hull on bottom
const A = { x: 500, y: 40 };   // sail apex
const B = { x: 380, y: 300 };  // sail base-left / deck-left
const C = { x: 60,  y: 430 };  // hull far-left (wide!)
const D = { x: 500, y: 560 };  // hull bottom-center
const E = { x: 940, y: 430 };  // hull far-right (wide!)
const F = { x: 620, y: 300 };  // sail base-right / deck-right

// Sail horizontal fold — at mid-height of sail
const sailMidY = (A.y + B.y) / 2;
const tL = (sailMidY - A.y) / (B.y - A.y);
const H_pt = { x: A.x + (B.x - A.x) * tL, y: sailMidY };
const I_pt = { x: A.x + (F.x - A.x) * tL, y: sailMidY };

// Outer perimeter path
const outerPathD = `M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D.x} ${D.y} L ${E.x} ${E.y} L ${F.x} ${F.y} Z`;

// Compute checkpoint positions along outer perimeter
function lerp(p1: { x: number; y: number }, p2: { x: number; y: number }, t: number) {
  return { x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t };
}
function segDist(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

const outerVerts = [A, B, C, D, E, F];
const edges: { from: typeof A; to: typeof A; len: number }[] = [];
let totalLen = 0;
for (let i = 0; i < outerVerts.length; i++) {
  const from = outerVerts[i];
  const to = outerVerts[(i + 1) % outerVerts.length];
  const len = segDist(from, to);
  edges.push({ from, to, len });
  totalLen += len;
}

function getCheckpoints(count: number) {
  const spacing = totalLen / count;
  const points: { x: number; y: number; above: boolean }[] = [];
  for (let i = 0; i < count; i++) {
    let target = i * spacing;
    let eIdx = 0;
    while (target > edges[eIdx].len && eIdx < edges.length - 1) {
      target -= edges[eIdx].len;
      eIdx++;
    }
    const t = target / edges[eIdx].len;
    const pt = lerp(edges[eIdx].from, edges[eIdx].to, t);
    points.push({ ...pt, above: pt.y < 320 || (pt.y < 430 && (pt.x < 200 || pt.x > 800)) });
  }
  return points;
}

const checkpoints = getCheckpoints(24);

export default function F1CalendarRacetrack() {
  const [activeRace, setActiveRace] = useState<Race | null>(null);

  return (
    <section id="calendar" style={{ background: "#080a08", padding: "80px 24px 60px" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.4em", color: "#F7BE68", marginBottom: "14px", textTransform: "uppercase", fontWeight: 600 }}>
            All 24 Rounds
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3.2rem", fontWeight: 300, color: "#fff", lineHeight: 1.1 }}>
            The 2026 <em style={{ color: "#F7BE68" }}>Circuit</em>
          </h2>
          <div className="flex items-center justify-center gap-3" style={{ marginTop: "18px" }}>
            <span className="block" style={{ height: "1px", width: "50px", background: "linear-gradient(to right, transparent, #F7BE68)" }} />
            <span className="block" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F7BE68", boxShadow: "0 0 8px rgba(247,190,104,0.5)" }} />
            <span className="block" style={{ height: "1px", width: "50px", background: "linear-gradient(to left, transparent, #F7BE68)" }} />
          </div>
        </div>

        {/* SVG Track */}
        <div className="relative" style={{ maxWidth: "1000px", margin: "0 auto", aspectRatio: `${W}/${VH}` }}>
          <svg viewBox={`0 0 ${W} ${VH}`} className="w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="trackGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F7BE68" />
                <stop offset="50%" stopColor="#C5A255" />
                <stop offset="100%" stopColor="#F7BE68" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="carGlow">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="dotGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* ── Origami facets (visible 3D shading) ── */}
            {/* Sail top-left quadrant */}
            <polygon points={`${A.x},${A.y} ${H_pt.x},${H_pt.y} ${500},${sailMidY}`} fill="rgba(247,190,104,0.04)" />
            {/* Sail top-right quadrant */}
            <polygon points={`${A.x},${A.y} ${500},${sailMidY} ${I_pt.x},${I_pt.y}`} fill="rgba(247,190,104,0.06)" />
            {/* Sail bottom-left quadrant */}
            <polygon points={`${H_pt.x},${H_pt.y} ${B.x},${B.y} ${500},${B.y} ${500},${sailMidY}`} fill="rgba(247,190,104,0.07)" />
            {/* Sail bottom-right quadrant */}
            <polygon points={`${500},${sailMidY} ${500},${B.y} ${F.x},${F.y} ${I_pt.x},${I_pt.y}`} fill="rgba(247,190,104,0.05)" />
            {/* Hull outer-left: B → C → D */}
            <polygon points={`${B.x},${B.y} ${C.x},${C.y} ${D.x},${D.y}`} fill="rgba(247,190,104,0.03)" />
            {/* Hull inner-left: B → D → center */}
            <polygon points={`${B.x},${B.y} ${D.x},${D.y} ${500},${B.y}`} fill="rgba(247,190,104,0.06)" />
            {/* Hull inner-right: center → D → F */}
            <polygon points={`${500},${B.y} ${D.x},${D.y} ${F.x},${F.y}`} fill="rgba(247,190,104,0.05)" />
            {/* Hull outer-right: F → E → D */}
            <polygon points={`${F.x},${F.y} ${E.x},${E.y} ${D.x},${D.y}`} fill="rgba(247,190,104,0.025)" />

            {/* ── Outer contour (gold track) ── */}
            <path d={outerPathD} fill="none" stroke="rgba(247,190,104,0.12)" strokeWidth="16" filter="url(#glow)" />
            <path d={outerPathD} fill="none" stroke="url(#trackGold)" strokeWidth="4.5" strokeLinejoin="round" />

            {/* ── Internal fold lines (clearly visible, part of the logo) ── */}
            {/* Vertical: A → D (full center line) */}
            <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} stroke="rgba(247,190,104,0.45)" strokeWidth="2.5" />
            {/* Sail horizontal fold: H → I */}
            <line x1={H_pt.x} y1={H_pt.y} x2={I_pt.x} y2={I_pt.y} stroke="rgba(247,190,104,0.45)" strokeWidth="2.5" />
            {/* Deck line: B → F */}
            <line x1={B.x} y1={B.y} x2={F.x} y2={F.y} stroke="rgba(247,190,104,0.45)" strokeWidth="2.5" />
            {/* Hull left fold: B → D */}
            <line x1={B.x} y1={B.y} x2={D.x} y2={D.y} stroke="rgba(247,190,104,0.45)" strokeWidth="2.5" />
            {/* Hull right fold: F → D */}
            <line x1={F.x} y1={F.y} x2={D.x} y2={D.y} stroke="rgba(247,190,104,0.45)" strokeWidth="2.5" />

            {/* ── Watermark ── */}
            <text x={500} y={375} textAnchor="middle" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "72px", fontWeight: 300, fill: "rgba(247,190,104,0.05)", letterSpacing: "0.2em" }}>
              ORTUS
            </text>
            <text x={500} y={405} textAnchor="middle" style={{ fontFamily: "monospace", fontSize: "9px", fill: "rgba(255,255,255,0.05)", letterSpacing: "0.4em" }}>
              FORMULA 1 — 2026 SEASON
            </text>

            {/* ── Checkpoints ── */}
            {checkpoints.map((pt, i) => {
              const race = calendar[i];
              const isActive = activeRace?.round === race.round;
              return (
                <g key={race.round} onMouseEnter={() => setActiveRace(race)} onMouseLeave={() => setActiveRace(null)} style={{ cursor: "pointer" }}>
                  <circle cx={pt.x} cy={pt.y} r="18" fill="none" stroke="rgba(247,190,104,0.1)" strokeWidth="1" />
                  <motion.circle
                    cx={pt.x} cy={pt.y} r={12} fill="#F7BE68" stroke="rgba(247,190,104,0.5)" strokeWidth="2"
                    filter="url(#dotGlow)"
                    animate={{ r: isActive ? 16 : 12 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  />
                  <text x={pt.x} y={pt.y + 1} textAnchor="middle" dominantBaseline="central"
                    style={{ fontSize: "7px", fontFamily: "monospace", fill: "#080a08", fontWeight: 700, pointerEvents: "none" }}>
                    {race.round}
                  </text>
                  <text x={pt.x} y={pt.above ? pt.y - 26 : pt.y + 28} textAnchor="middle"
                    style={{ fontSize: "9px", fontFamily: "monospace", fill: "rgba(247,190,104,0.7)", fontWeight: 600, letterSpacing: "0.05em", pointerEvents: "none" }}>
                    {race.abbr}
                  </text>
                </g>
              );
            })}

            {/* ── Animated car tracing the outer perimeter ── */}
            <circle r="22" fill="rgba(247,190,104,0.1)" filter="url(#carGlow)">
              <animateMotion dur="18s" repeatCount="indefinite" path={outerPathD} rotate="auto" />
            </circle>
            <circle r="10" fill="none" stroke="rgba(247,190,104,0.25)" strokeWidth="1.5">
              <animateMotion dur="18s" repeatCount="indefinite" path={outerPathD} rotate="auto" />
            </circle>
            <circle r="5" fill="#F7BE68">
              <animateMotion dur="18s" repeatCount="indefinite" path={outerPathD} rotate="auto" />
            </circle>
            <circle r="2" fill="#fff">
              <animateMotion dur="18s" repeatCount="indefinite" path={outerPathD} rotate="auto" />
            </circle>
          </svg>

          {/* Floating tooltip */}
          <AnimatePresence>
            {activeRace && (() => {
              const pt = checkpoints[activeRace.round - 1];
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
                    top: `${(pt.y / VH) * 100}%`,
                    transform: `translate(-50%, ${pt.above ? "calc(-100% - 40px)" : "40px"})`,
                    background: "rgba(20,22,20,0.95)",
                    border: "1px solid rgba(247,190,104,0.25)",
                    borderRadius: "14px",
                    padding: "16px 22px",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
                    zIndex: 30,
                    whiteSpace: "nowrap",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div style={{ fontSize: "0.5rem", color: "rgba(247,190,104,0.5)", fontFamily: "monospace", letterSpacing: "0.15em", marginBottom: "6px" }}>
                    ROUND {activeRace.round.toString().padStart(2, "0")}
                  </div>
                  <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.3rem", color: "#fff", marginBottom: "8px", fontWeight: 500 }}>
                    {activeRace.gp} Grand Prix
                  </div>
                  <div className="flex items-center gap-4" style={{ marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{activeRace.date}</span>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>{activeRace.location}</span>
                  </div>
                  <span style={{ fontSize: "0.5rem", letterSpacing: "0.12em", padding: "4px 12px", borderRadius: "999px", background: "rgba(247,190,104,0.12)", color: "#F7BE68", border: "1px solid rgba(247,190,104,0.2)" }}>
                    ORTUS HOSPITALITY
                  </span>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-8 flex-wrap" style={{ marginTop: "36px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-2.5">
            <div style={{ width: "24px", height: "3px", background: "linear-gradient(90deg, #F7BE68, #C5A255)", borderRadius: "2px" }} />
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>Track Outline</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div style={{ width: "24px", height: "0", borderTop: "1.5px dashed rgba(247,190,104,0.3)" }} />
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>Origami Fold</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#F7BE68", boxShadow: "0 0 6px rgba(247,190,104,0.4)" }} />
            <span style={{ fontSize: "0.65rem", color: "#F7BE68", letterSpacing: "0.06em" }}>Grand Prix</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px rgba(247,190,104,0.5)" }} />
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>Racing Car</span>
          </div>
        </div>
      </div>
    </section>
  );
}
