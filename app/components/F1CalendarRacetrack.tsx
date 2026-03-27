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

/* ──────────────────────────────────────────────────────────
 * ORTUS PAPER BOAT LOGO — carbon copy from the logo image
 *
 * The logo is a geometric origami paper boat made of
 * uniform-weight lines. ALL lines are the same thickness.
 *
 *                    A
 *                   /|\
 *                  / | \
 *             H --/--+--\-- I     ← sail horizontal fold
 *               /   |   \
 *              /    |    \
 *         B ──/─────+─────\── F   ← deck (sail base)
 *          \ /      |      \ /
 *       C ──x───────|───────x── E  ← hull tips (widest)
 *            \      |      /
 *             \     |     /
 *          D1 ──────+────── D2    ← flat bottom
 *
 * Outer path: A → B → C → D1 → D2 → E → F → A
 * Inner lines: A↕D, H↔I, B↔F (deck), B↘D, F↙D
 * ────────────────────────────────────────────────────── */

const W = 1000;
const VH = 580;

// ── EXACT LOGO VERTICES ──
// Sail: roughly equilateral triangle, centered
const A  = { x: 500, y: 30 };    // apex
const B  = { x: 355, y: 278 };   // deck-left
const F  = { x: 645, y: 278 };   // deck-right

// Hull: wide, shorter than sail, flat bottom
const C  = { x: 90,  y: 375 };   // hull tip-left (widest)
const E  = { x: 910, y: 375 };   // hull tip-right (widest)
const D1 = { x: 280, y: 490 };   // bottom-left corner
const D2 = { x: 720, y: 490 };   // bottom-right corner

// Virtual center points for fold convergence
const DM = { x: 500, y: 490 };   // center of flat base
const BF_center = { x: 500, y: 278 }; // center of deck

// Sail horizontal fold line at mid-height
const sailMidY = (A.y + B.y) / 2; // ≈ 154
const t = (sailMidY - A.y) / (B.y - A.y);
const H = { x: A.x + (B.x - A.x) * t, y: sailMidY };
const I = { x: A.x + (F.x - A.x) * t, y: sailMidY };

// ── PATHS ──
const outerPath = `M ${A.x} ${A.y} L ${B.x} ${B.y} L ${C.x} ${C.y} L ${D1.x} ${D1.y} L ${D2.x} ${D2.y} L ${E.x} ${E.y} L ${F.x} ${F.y} Z`;

// Line style — ALL lines same weight, matching the logo
const LINE_COLOR = "#F7BE68";
const LINE_WIDTH = 3;
const LINE_OPACITY = 0.85;
const lineStyle = { stroke: LINE_COLOR, strokeWidth: LINE_WIDTH, strokeOpacity: LINE_OPACITY, strokeLinejoin: "round" as const };

// ── CHECKPOINT COMPUTATION ──
function lerpPt(p1: { x: number; y: number }, p2: { x: number; y: number }, t: number) {
  return { x: p1.x + (p2.x - p1.x) * t, y: p1.y + (p2.y - p1.y) * t };
}
function dist(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

const outerVerts = [A, B, C, D1, D2, E, F];
const edges = outerVerts.map((v, i) => {
  const next = outerVerts[(i + 1) % outerVerts.length];
  return { from: v, to: next, len: dist(v, next) };
});
const totalLen = edges.reduce((s, e) => s + e.len, 0);

function getCheckpoints(count: number) {
  const spacing = totalLen / count;
  const pts: { x: number; y: number; above: boolean }[] = [];
  for (let i = 0; i < count; i++) {
    let target = i * spacing;
    let eIdx = 0;
    while (target > edges[eIdx].len && eIdx < edges.length - 1) {
      target -= edges[eIdx].len;
      eIdx++;
    }
    const pt = lerpPt(edges[eIdx].from, edges[eIdx].to, target / edges[eIdx].len);
    pts.push({ ...pt, above: pt.y < 300 });
  }
  return pts;
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
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3.2rem", fontWeight: 300, color: "#fff" }}>
            The 2026 <em style={{ color: "#F7BE68" }}>Circuit</em>
          </h2>
          <div className="flex items-center justify-center gap-3" style={{ marginTop: "18px" }}>
            <span className="block" style={{ height: "1px", width: "50px", background: "linear-gradient(to right, transparent, #F7BE68)" }} />
            <span className="block" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F7BE68", boxShadow: "0 0 8px rgba(247,190,104,0.5)" }} />
            <span className="block" style={{ height: "1px", width: "50px", background: "linear-gradient(to left, transparent, #F7BE68)" }} />
          </div>
        </div>

        {/* ═══ SVG — THE LOGO AS A RACETRACK ═══ */}
        <div className="relative" style={{ maxWidth: "1000px", margin: "0 auto", aspectRatio: `${W}/${VH}` }}>
          <svg viewBox={`0 0 ${W} ${VH}`} className="w-full h-full" style={{ overflow: "visible" }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="dotGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="carGlow">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* ── Subtle outer glow of the whole shape ── */}
            <path d={outerPath} fill="none" stroke="rgba(247,190,104,0.08)" strokeWidth="20" filter="url(#glow)" />

            {/* ═══════════════════════════════════════════
                 THE LOGO — all lines same weight/color
                 ═══════════════════════════════════════════ */}

            {/* OUTER CONTOUR: A → B → C → D1 → D2 → E → F → A */}
            <path d={outerPath} fill="none" {...lineStyle} />

            {/* SAIL VERTICAL: apex A → deck center */}
            <line x1={A.x} y1={A.y} x2={BF_center.x} y2={BF_center.y} {...lineStyle} />

            {/* SAIL HORIZONTAL FOLD: H → I */}
            <line x1={H.x} y1={H.y} x2={I.x} y2={I.y} {...lineStyle} />

            {/* DECK LINE: B → F (shared edge of sail and hull) */}
            <line x1={B.x} y1={B.y} x2={F.x} y2={F.y} {...lineStyle} />

            {/* HULL VERTICAL: deck center → base center DM */}
            <line x1={BF_center.x} y1={BF_center.y} x2={DM.x} y2={DM.y} {...lineStyle} />

            {/* HULL LEFT FOLD: B → DM */}
            <line x1={B.x} y1={B.y} x2={DM.x} y2={DM.y} {...lineStyle} />

            {/* HULL RIGHT FOLD: F → DM */}
            <line x1={F.x} y1={F.y} x2={DM.x} y2={DM.y} {...lineStyle} />

            {/* ── Watermark (very faint, inside hull) ── */}
            <text x={500} y={420} textAnchor="middle" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "52px", fontWeight: 300, fill: "rgba(247,190,104,0.04)", letterSpacing: "0.25em" }}>
              ORTUS
            </text>
            <text x={500} y={448} textAnchor="middle" style={{ fontFamily: "monospace", fontSize: "8px", fill: "rgba(255,255,255,0.04)", letterSpacing: "0.35em" }}>
              FORMULA 1 — 2026 SEASON
            </text>

            {/* ── Race checkpoints along outer perimeter ── */}
            {checkpoints.map((pt, i) => {
              const race = calendar[i];
              const isActive = activeRace?.round === race.round;
              return (
                <g key={race.round} onMouseEnter={() => setActiveRace(race)} onMouseLeave={() => setActiveRace(null)} style={{ cursor: "pointer" }}>
                  <circle cx={pt.x} cy={pt.y} r="17" fill="none" stroke="rgba(247,190,104,0.08)" strokeWidth="1" />
                  <motion.circle
                    cx={pt.x} cy={pt.y} r={11} fill="#F7BE68" stroke="rgba(247,190,104,0.5)" strokeWidth="2"
                    filter="url(#dotGlow)"
                    animate={{ r: isActive ? 15 : 11 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  />
                  <text x={pt.x} y={pt.y + 1} textAnchor="middle" dominantBaseline="central"
                    style={{ fontSize: "7px", fontFamily: "monospace", fill: "#080a08", fontWeight: 700, pointerEvents: "none" }}>
                    {race.round}
                  </text>
                  <text x={pt.x} y={pt.above ? pt.y - 24 : pt.y + 26} textAnchor="middle"
                    style={{ fontSize: "9px", fontFamily: "monospace", fill: "rgba(247,190,104,0.65)", fontWeight: 600, letterSpacing: "0.05em", pointerEvents: "none" }}>
                    {race.abbr}
                  </text>
                </g>
              );
            })}

            {/* ── Animated car tracing outer perimeter ── */}
            <circle r="20" fill="rgba(247,190,104,0.1)" filter="url(#carGlow)">
              <animateMotion dur="20s" repeatCount="indefinite" path={outerPath} rotate="auto" />
            </circle>
            <circle r="9" fill="none" stroke="rgba(247,190,104,0.25)" strokeWidth="1.5">
              <animateMotion dur="20s" repeatCount="indefinite" path={outerPath} rotate="auto" />
            </circle>
            <circle r="4.5" fill="#F7BE68">
              <animateMotion dur="20s" repeatCount="indefinite" path={outerPath} rotate="auto" />
            </circle>
            <circle r="2" fill="#fff">
              <animateMotion dur="20s" repeatCount="indefinite" path={outerPath} rotate="auto" />
            </circle>
          </svg>

          {/* ── Tooltip ── */}
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
                    transform: `translate(-50%, ${pt.above ? "calc(-100% - 36px)" : "36px"})`,
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
            <div style={{ width: "24px", height: "3px", background: "#F7BE68", borderRadius: "2px", opacity: 0.85 }} />
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>Ortus Logo Track</span>
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
