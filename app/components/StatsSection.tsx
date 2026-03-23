export default function StatsSection() {
  const stats = [
    { number: "2,500+", label: "EVENTS" },
    { number: "27,000+", label: "PARTICIPANTS" },
    { number: "40+", label: "COUNTRIES" },
  ];

  return (
    <section className="bg-[#F4F4F4] pb-20 px-12">
      {/* Stat cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6 mb-20">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg py-8 px-8 text-center"
            style={{ backgroundColor: "#484D49", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
          >
            <div
              className="text-white text-5xl mb-3"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}
            >
              {stat.number}
            </div>
            <div className="text-white/80 text-xs tracking-widest italic">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Our Events heading + description */}
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-5xl mb-4"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
        >
          Our <em>Events</em>
        </h2>
        <div className="w-16 h-px bg-black mx-auto mb-8" />
        <p className="text-gray-600 text-sm leading-relaxed">
          Each engagement by The Ortus Club is anchored in a clear event strategy, from concept
          and planning to hosting in world-class venues and delivering memorable guest experiences.
          Whether in person or virtually, every forum is designed to encourage networking, sharing
          of insights, business growth, and the creation of relationships built on trust.
        </p>
      </div>
    </section>
  );
}
