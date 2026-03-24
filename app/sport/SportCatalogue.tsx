"use client";

import { useState } from "react";
import { categories } from "./events-data";
import type { SportEvent } from "./events-data";

const TIER_COLORS: Record<string, { bg: string; text: string }> = {
  "Ultra-Premium": { bg: "#F7BE68", text: "#000" },
  Premium: { bg: "rgba(255,255,255,0.15)", text: "#fff" },
  "Mid-Premium": { bg: "rgba(255,255,255,0.08)", text: "rgba(255,255,255,0.7)" },
  "Mid-Tier": { bg: "rgba(255,255,255,0.05)", text: "rgba(255,255,255,0.5)" },
};

export default function SportCatalogue() {
  const [active, setActive] = useState<string | null>(null);

  const displayed = active
    ? categories.filter((c) => c.name === active)
    : categories;

  return (
    <section className="bg-neutral-950 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <h2
          className="text-white text-3xl mb-2 text-center"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
          }}
        >
          2026 Sporting Events
        </h2>
        <p className="text-white/50 text-sm text-center mb-10">
          {categories.reduce((sum, c) => sum + c.events.length, 0)} events
          across {categories.length} sports &middot; All pricing is indicative
          &amp; per person
        </p>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActive(null)}
            className="px-4 py-2 rounded-full text-xs tracking-wider transition-all cursor-pointer"
            style={{
              backgroundColor: active === null ? "#F7BE68" : "rgba(255,255,255,0.08)",
              color: active === null ? "#000" : "rgba(255,255,255,0.7)",
            }}
          >
            ALL
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActive(active === cat.name ? null : cat.name)}
              className="px-4 py-2 rounded-full text-xs tracking-wider transition-all cursor-pointer"
              style={{
                backgroundColor:
                  active === cat.name ? "#F7BE68" : "rgba(255,255,255,0.08)",
                color: active === cat.name ? "#000" : "rgba(255,255,255,0.7)",
              }}
            >
              {cat.icon} {cat.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Category sections */}
        {displayed.map((cat) => (
          <CategorySection key={cat.name} name={cat.name} icon={cat.icon} events={cat.events} />
        ))}
      </div>
    </section>
  );
}

function CategorySection({
  name,
  icon,
  events,
}: {
  name: string;
  icon: string;
  events: SportEvent[];
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="mb-12">
      {/* Category header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 mb-6 group cursor-pointer"
      >
        <span className="text-2xl">{icon}</span>
        <h3
          className="text-white text-2xl"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
          }}
        >
          {name}
        </h3>
        <span className="text-white/30 text-xs ml-1">
          {events.length} event{events.length !== 1 ? "s" : ""}
        </span>
        <div className="flex-1 h-px bg-white/10 mx-4" />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          className="transition-transform duration-200"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Events grid */}
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event.name + event.date} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

function EventCard({ event }: { event: SportEvent }) {
  const tier = TIER_COLORS[event.tier] ?? TIER_COLORS.Premium;

  return (
    <div
      className="rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:scale-[1.02]"
      style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Top: tier badge + name */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <h4 className="text-white text-sm font-medium leading-snug flex-1">
            {event.name}
          </h4>
          <span
            className="text-[10px] tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap shrink-0"
            style={{ backgroundColor: tier.bg, color: tier.text }}
          >
            {event.tier === "Ultra-Premium" ? "ULTRA" : event.tier.toUpperCase()}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-1 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {event.date}
          </div>
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}, {event.country}
          </div>
          {event.venue && event.venue !== "TBD" && event.venue !== "Various" && (
            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 4v14" />
              </svg>
              <span className="truncate">{event.venue}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: price + note */}
      <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] text-white/30 uppercase tracking-wider">From</span>
            <p className="text-lg font-light" style={{ color: "#F7BE68" }}>
              {event.fromPrice}
              <span className="text-xs text-white/30 ml-1">pp</span>
            </p>
          </div>
          <a
            href="#"
            className="text-[10px] tracking-wider px-3 py-1.5 rounded-full border transition-colors hover:bg-white hover:text-black"
            style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }}
          >
            ENQUIRE
          </a>
        </div>
        {event.notes && (
          <p className="text-[11px] text-white/30 mt-2 leading-relaxed">
            {event.notes}
          </p>
        )}
      </div>
    </div>
  );
}
