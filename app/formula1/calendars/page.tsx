"use client";

import { useState } from "react";
import F1CalendarTimeline from "../../components/F1CalendarTimeline";
import F1CalendarGrid from "../../components/F1CalendarGrid";
import F1CalendarRacetrack from "../../components/F1CalendarRacetrack";

const variants = [
  { id: "timeline", label: "Horizontal Timeline", component: F1CalendarTimeline },
  { id: "grid", label: "Starting Grid", component: F1CalendarGrid },
  { id: "racetrack", label: "Racetrack Circuit", component: F1CalendarRacetrack },
] as const;

export default function CalendarPreviewPage() {
  const [active, setActive] = useState<string>("timeline");
  const ActiveComponent = variants.find((v) => v.id === active)!.component;

  return (
    <main style={{ background: "#0a0c0a", minHeight: "100vh" }}>
      {/* Variant selector */}
      <div className="sticky top-0 z-50" style={{ background: "rgba(10,12,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-[1300px] mx-auto flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-3">
            <a href="/formula1" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1rem", color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>
              &larr; F1 Page
            </a>
            <span style={{ color: "rgba(255,255,255,0.1)" }}>|</span>
            <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.1rem", color: "#F7BE68", fontStyle: "italic" }}>
              Calendar Variants
            </span>
          </div>
          <div className="flex gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setActive(v.id)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "999px",
                  border: active === v.id ? "1px solid rgba(247,190,104,0.3)" : "1px solid rgba(255,255,255,0.08)",
                  background: active === v.id ? "rgba(247,190,104,0.08)" : "transparent",
                  color: active === v.id ? "#F7BE68" : "rgba(255,255,255,0.4)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  fontFamily: "var(--font-cormorant), serif",
                  transition: "all 0.3s",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active variant */}
      <ActiveComponent />

      <p style={{ textAlign: "center", color: "#484f58", padding: "24px 0", fontSize: "0.8rem" }}>
        Ortus Club &copy; 2026
      </p>
    </main>
  );
}
