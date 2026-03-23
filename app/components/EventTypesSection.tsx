"use client";

const PLACEHOLDER = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80";

const topRow = [
  {
    title: "Roundtables",
    description: "Hosted for senior executives and decision-makers (8-15 people), who come together to network and share insights on specific business topics.",
    bg: PLACEHOLDER,
    href: "/roundtables/",
  },
  {
    title: "Masterclasses",
    description: "Select panels of experts and leaders share their insights on relevant topics, offering up to 30 guests the chance to seek solutions to their challenges and receive support.",
    bg: PLACEHOLDER,
    href: "/masterclasses-and-panels/",
  },
];

const bottomRow = [
  {
    title: "Virtual",
    description: "Expert-led discussions on relevant topics allow attendees to engage, ask questions, and seek solutions, all from the comfort of their own space.",
    bg: PLACEHOLDER,
    href: "/virtual-events/",
  },
  {
    title: "Summits & Large Scale",
    description: "Curated experiences bring together larger audiences for expert-led discussions, networking opportunities, and tailored insights designed to address industry challenges on a broader scale.",
    bg: PLACEHOLDER,
    href: "/summits-and-large-scale/",
  },
  {
    title: "Partner Events",
    description: "We identify and recommend standout industry events worldwide, connecting our network to exceptional opportunities for unmissable experiences organised by our hosts.",
    bg: PLACEHOLDER,
    href: "/partner-events/",
  },
  {
    title: "Sport",
    description: "We bring executives together through world-class sporting experiences, combining elite competition with meaningful networking in unforgettable settings.",
    bg: PLACEHOLDER,
    href: "/sport/",
  },
];

export default function EventTypesSection() {
  return (
    <section className="bg-white py-16 px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        {/* Top row — 2 cards */}
        <div className="grid grid-cols-2 gap-4">
          {topRow.map((event) => (
            <EventCard key={event.title} event={event} tall />
          ))}
        </div>
        {/* Bottom row — 3 cards */}
        <div className="grid grid-cols-4 gap-4">
          {bottomRow.map((event) => (
            <EventCard key={event.title} event={event} tall={false} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, tall }: { event: { title: string; description: string; bg: string; href: string }; tall: boolean }) {
  return (
    <a
      href={event.href}
      className="relative flex flex-col items-center justify-center text-center p-10 group overflow-hidden"
      style={{
        minHeight: tall ? "340px" : "320px",
        borderRadius: "32px",
        backgroundImage: event.bg ? `url(${event.bg})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#ffffff",
        textDecoration: "none",
      }}
    >
      {/* Dark overlay — lightens on hover */}
      <div
        className="absolute inset-0 transition-all duration-300 group-hover:opacity-50"
        style={{ backgroundColor: "rgba(0,0,0,0.70)", borderRadius: "32px" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h3
          className="text-white mb-3"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, fontSize: "2.2rem", lineHeight: 1 }}
        >
          {event.title}
        </h3>
        <div className="w-10 h-px mb-5" style={{ backgroundColor: "rgba(255,255,255,0.6)" }} />
        <p className="text-white/80 text-sm leading-relaxed mb-7 max-w-sm">
          {event.description}
        </p>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
          style={{ backgroundColor: "#F7BE68" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}
