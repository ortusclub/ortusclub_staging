"use client";

import { useState, useRef, useEffect } from "react";
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

/*
 * Crown / origami boat track path — three triangular peaks resembling the Ortus Club logo.
 * The path traces: base-left -> left peak up -> left peak down -> center junction ->
 * center peak up -> center junction right -> right peak up -> right peak down -> base-right,
 * then back along the base to close the loop.
 *
 * We use a single continuous closed path so the animated car can loop seamlessly.
 */

const W = 1000;
const H = 420;

// Crown vertices (the three-peaked origami/crown shape)
const crownPath = [
  // Start at bottom-left
  { x: 80, y: 340 },
  // Up to left peak
  { x: 200, y: 130 },
  // Down to left-center valley
  { x: 320, y: 240 },
  // Up to center-left shoulder
  { x: 420, y: 160 },
  // Up to center peak (tallest)
  { x: 500, y: 50 },
  // Down to center-right shoulder
  { x: 580, y: 160 },
  // Down to right-center valley
  { x: 680, y: 240 },
  // Up to right peak
  { x: 800, y: 130 },
  // Down to bottom-right
  { x: 920, y: 340 },
];

// Build the full closed track path: crown outline + base return
function buildTrackPathD(): string {
  const pts = crownPath;
  // Forward path along the crown peaks
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x} ${pts[i].y}`;
  }
  // Base line return (slightly curved for visual interest)
  d += ` C ${pts[pts.length - 1].x - 40} ${pts[pts.length - 1].y + 30}, ${pts[0].x + 40} ${pts[0].y + 30}, ${pts[0].x} ${pts[0].y}`;
  d += " Z";
  return d;
}

// Build a dashed inner offset path (slightly inward)
function buildInnerPathD(): string {
  const offset = 8;
  const pts = crownPath;
  // Approximate inward offset by moving each point slightly toward center
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;

  const inner = pts.map((p) => {
    const dx = cx - p.x;
    const dy = cy - p.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    return {
      x: p.x + (dx / len) * offset,
      y: p.y + (dy / len) * offset,
    };
  });

  let d = `M ${inner[0].x} ${inner[0].y}`;
  for (let i = 1; i < inner.length; i++) {
    d += ` L ${inner[i].x} ${inner[i].y}`;
  }
  d += ` C ${inner[inner.length - 1].x - 35} ${inner[inner.length - 1].y + 25}, ${inner[0].x + 35} ${inner[0].y + 25}, ${inner[0].x} ${inner[0].y}`;
  d += " Z";
  return d;
}

const trackPathD = buildTrackPathD();
const innerPathD = buildInnerPathD();

// Compute total path length and 24 evenly-spaced points along it
function getSegmentLengths(): { lengths: number[]; totalLength: number; segments: { x1: number; y1: number; x2: number; y2: number }[] } {
  // We'll linearize the path: crown segments + base return approximated as segments
  const pts = [...crownPath];

  // For the base return curve, approximate with several linear segments
  const lastPt = crownPath[crownPath.length - 1];
  const firstPt = crownPath[0];
  const basePts: { x: number; y: number }[] = [];
  const baseSteps = 12;
  for (let i = 1; i <= baseSteps; i++) {
    const t = i / baseSteps;
    // Cubic bezier: P0=lastPt, P1=(lastPt.x-40, lastPt.y+30), P2=(firstPt.x+40, firstPt.y+30), P3=firstPt
    const p0 = lastPt;
    const p1 = { x: lastPt.x - 40, y: lastPt.y + 30 };
    const p2 = { x: firstPt.x + 40, y: firstPt.y + 30 };
    const p3 = firstPt;
    const mt = 1 - t;
    const bx = mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x;
    const by = mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y;
    basePts.push({ x: bx, y: by });
  }

  const allPts = [...pts, ...basePts];
  const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const lengths: number[] = [];
  let totalLength = 0;

  for (let i = 0; i < allPts.length; i++) {
    const next = allPts[(i + 1) % allPts.length];
    const cur = allPts[i];
    // Skip the closing segment if basePts already returns to firstPt
    if (i === allPts.length - 1) break;
    const dx = next.x - cur.x;
    const dy = next.y - cur.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    segments.push({ x1: cur.x, y1: cur.y, x2: next.x, y2: next.y });
    lengths.push(len);
    totalLength += len;
  }

  return { lengths, totalLength, segments };
}

function computeCheckpoints(count: number): { x: number; y: number; labelAbove: boolean }[] {
  const { lengths, totalLength, segments } = getSegmentLengths();
  const spacing = totalLength / count;
  const points: { x: number; y: number; labelAbove: boolean }[] = [];

  for (let i = 0; i < count; i++) {
    const targetDist = i * spacing;
    let accumulated = 0;
    let found = false;

    for (let s = 0; s < segments.length; s++) {
      if (accumulated + lengths[s] >= targetDist) {
        const rem = targetDist - accumulated;
        const t = rem / lengths[s];
        const x = segments[s].x1 + t * (segments[s].x2 - segments[s].x1);
        const y = segments[s].y1 + t * (segments[s].y2 - segments[s].y1);
        // Label above if y is in lower half of the shape
        const labelAbove = y > 220;
        points.push({ x, y, labelAbove });
        found = true;
        break;
      }
      accumulated += lengths[s];
    }

    if (!found) {
      points.push({ x: crownPath[0].x, y: crownPath[0].y, labelAbove: false });
    }
  }

  return points;
}

const checkpoints = computeCheckpoints(24);

export default function F1CalendarRacetrack() {
  const [activeRace, setActiveRace] = useState<Race | null>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const [trackLength, setTrackLength] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setTrackLength(trackRef.current.getTotalLength());
    }
  }, []);

  return (
    <section
      id="calendar"
      style={{ background: "#080a08", padding: "80px 24px", position: "relative", overflow: "hidden" }}
    >
      {/* CSS for car animation along path */}
      <style>{`
        @keyframes driveAlongTrack {
          0% { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
        .racing-car {
          offset-path: path('${trackPathD}');
          offset-rotate: auto;
          animation: driveAlongTrack 20s linear infinite;
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #F7BE68;
          box-shadow: 0 0 14px 4px rgba(247, 190, 104, 0.6), 0 0 30px 8px rgba(247, 190, 104, 0.2);
          pointer-events: none;
          z-index: 10;
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>

      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
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
            }}
          >
            The 2026 <em>Circuit</em>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
            <span className="block w-1.5 h-1.5 rounded-full" style={{ background: "#F7BE68" }} />
            <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
          </div>
        </div>

        {/* Track SVG */}
        <div
          className="relative"
          style={{ aspectRatio: `${W}/${H}`, maxWidth: "1100px", margin: "0 auto" }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-full"
            style={{ overflow: "visible" }}
          >
            <defs>
              {/* Gold gradient for the track stroke */}
              <linearGradient id="crownTrackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F7BE68" stopOpacity="0.9" />
                <stop offset="30%" stopColor="#e8a84a" stopOpacity="1" />
                <stop offset="50%" stopColor="#F7BE68" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#e8a84a" stopOpacity="1" />
                <stop offset="100%" stopColor="#F7BE68" stopOpacity="0.9" />
              </linearGradient>

              {/* Outer glow filter */}
              <filter id="trackOuterGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.97  0 0 0 0 0.75  0 0 0 0 0.41  0 0 0 0.35 0"
                  result="colorBlur"
                />
                <feMerge>
                  <feMergeNode in="colorBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Gold glow for Ortus markers */}
              <filter id="ortusGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="0 0 0 0 0.97  0 0 0 0 0.75  0 0 0 0 0.41  0 0 0 0.6 0"
                />
              </filter>

              {/* Radial gradient fill for subtle track surface */}
              <radialGradient id="trackSurface" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(247,190,104,0.03)" />
                <stop offset="100%" stopColor="rgba(247,190,104,0)" />
              </radialGradient>
            </defs>

            {/* Subtle fill of the crown shape */}
            <path d={trackPathD} fill="url(#trackSurface)" />

            {/* Track outer glow layer */}
            <path
              d={trackPathD}
              fill="none"
              stroke="rgba(247,190,104,0.12)"
              strokeWidth="14"
              strokeLinejoin="round"
              filter="url(#trackOuterGlow)"
            />

            {/* Main track stroke — 4px gold gradient */}
            <path
              ref={trackRef}
              d={trackPathD}
              fill="none"
              stroke="url(#crownTrackGrad)"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Inner dashed line for track edge */}
            <path
              d={innerPathD}
              fill="none"
              stroke="rgba(247,190,104,0.12)"
              strokeWidth="1"
              strokeDasharray="8 6"
              strokeLinejoin="round"
            />

            {/* ORTUS watermark in the center */}
            <text
              x={W / 2}
              y={285}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "72px",
                fontWeight: 300,
                fill: "rgba(247,190,104,0.05)",
                letterSpacing: "0.2em",
              }}
            >
              ORTUS
            </text>
            <text
              x={W / 2}
              y={315}
              textAnchor="middle"
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                fill: "rgba(255,255,255,0.06)",
                letterSpacing: "0.3em",
              }}
            >
              FORMULA 1 — 2026
            </text>

            {/* Race checkpoints */}
            {checkpoints.map((pt, i) => {
              const race = calendar[i];
              const isOrtus = ortusRounds.has(race.round);
              const isActive = activeRace?.round === race.round;
              const markerR = isOrtus ? 9 : 6;

              // Determine label position: alternate above/below for density management
              const labelY = pt.labelAbove ? pt.y - 20 : pt.y + 26;
              const abbrY = pt.labelAbove ? pt.y - 32 : pt.y + 38;

              return (
                <g
                  key={race.round}
                  onMouseEnter={() => setActiveRace(race)}
                  onMouseLeave={() => setActiveRace(null)}
                  onClick={() => setActiveRace(activeRace?.round === race.round ? null : race)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Ortus outer glow ring */}
                  {isOrtus && (
                    <>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="18"
                        fill="none"
                        stroke="rgba(247,190,104,0.15)"
                        strokeWidth="1"
                        filter="url(#ortusGlow)"
                      />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="14"
                        fill="none"
                        stroke="rgba(247,190,104,0.25)"
                        strokeWidth="1"
                        style={{ animation: "pulseGlow 2s ease-in-out infinite" }}
                      />
                    </>
                  )}

                  {/* Checkpoint marker */}
                  <motion.circle
                    cx={pt.x}
                    cy={pt.y}
                    r={markerR}
                    fill={isOrtus ? "#F7BE68" : "rgba(255,255,255,0.35)"}
                    stroke={isOrtus ? "rgba(247,190,104,0.6)" : "rgba(255,255,255,0.15)"}
                    strokeWidth={isOrtus ? 2.5 : 1.5}
                    whileHover={{ scale: 1.5 }}
                    animate={{
                      r: isActive ? markerR + 4 : markerR,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  />

                  {/* Round number — always visible */}
                  <text
                    x={pt.x}
                    y={labelY}
                    textAnchor="middle"
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      fill: isOrtus ? "#F7BE68" : "rgba(255,255,255,0.55)",
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
                      fontSize: "7.5px",
                      fontWeight: 600,
                      fontFamily: "monospace",
                      letterSpacing: "0.05em",
                      fill: isOrtus ? "rgba(247,190,104,0.7)" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {race.abbr}
                  </text>
                </g>
              );
            })}

            {/* Animated car dot — uses SVG animateMotion for reliable path tracing */}
            <circle r="5" fill="#F7BE68" opacity="0.9">
              <animateMotion
                dur="18s"
                repeatCount="indefinite"
                path={trackPathD}
                rotate="auto"
              />
            </circle>
            {/* Car glow trail */}
            <circle r="10" fill="none" stroke="rgba(247,190,104,0.3)" strokeWidth="2">
              <animateMotion
                dur="18s"
                repeatCount="indefinite"
                path={trackPathD}
                rotate="auto"
              />
            </circle>
            <circle r="18" fill="none" stroke="rgba(247,190,104,0.08)" strokeWidth="1">
              <animateMotion
                dur="18s"
                repeatCount="indefinite"
                path={trackPathD}
                rotate="auto"
              />
            </circle>
          </svg>

          {/* Floating premium tooltip */}
          <AnimatePresence>
            {activeRace &&
              (() => {
                const pt = checkpoints[activeRace.round - 1];
                const isOrtus = ortusRounds.has(activeRace.round);
                const tooltipAbove = !pt.labelAbove;
                return (
                  <motion.div
                    key={activeRace.round}
                    initial={{ opacity: 0, y: tooltipAbove ? 8 : -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: tooltipAbove ? 8 : -8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${(pt.x / W) * 100}%`,
                      top: `${(pt.y / H) * 100}%`,
                      transform: `translate(-50%, ${tooltipAbove ? "calc(-100% - 28px)" : "28px"})`,
                      background: "linear-gradient(135deg, #141714 0%, #1a1d1a 100%)",
                      border: `1px solid ${isOrtus ? "rgba(247,190,104,0.3)" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: "14px",
                      padding: "16px 22px",
                      boxShadow: isOrtus
                        ? "0 16px 48px rgba(0,0,0,0.6), 0 0 24px rgba(247,190,104,0.1)"
                        : "0 16px 48px rgba(0,0,0,0.6)",
                      zIndex: 30,
                      whiteSpace: "nowrap",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.55rem",
                        fontFamily: "monospace",
                        color: isOrtus ? "#F7BE68" : "rgba(255,255,255,0.3)",
                        letterSpacing: "0.12em",
                        marginBottom: "6px",
                      }}
                    >
                      ROUND {activeRace.round.toString().padStart(2, "0")}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-cormorant), serif",
                        fontSize: "1.25rem",
                        fontWeight: 500,
                        color: "#fff",
                        marginBottom: "6px",
                      }}
                    >
                      {activeRace.gp} Grand Prix
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        style={{
                          fontSize: "0.65rem",
                          color: "rgba(255,255,255,0.4)",
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
                      <div style={{ marginTop: "10px" }}>
                        <span
                          style={{
                            fontSize: "0.45rem",
                            letterSpacing: "0.14em",
                            padding: "4px 12px",
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
          className="flex flex-wrap items-center justify-center gap-8 mt-10"
          style={{
            paddingTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.35)",
                border: "1.5px solid rgba(255,255,255,0.15)",
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
          <div className="flex items-center gap-2.5">
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#F7BE68",
                border: "2.5px solid rgba(247,190,104,0.5)",
                boxShadow: "0 0 10px rgba(247,190,104,0.3), 0 0 20px rgba(247,190,104,0.1)",
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
          <div className="flex items-center gap-2.5">
            <div
              style={{
                width: "18px",
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
          <div className="flex items-center gap-2.5">
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#F7BE68",
                boxShadow: "0 0 8px rgba(247,190,104,0.5)",
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
