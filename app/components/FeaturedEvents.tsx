"use client";

const FEATURED = [
  {
    sport: "Formula 1",
    name: "Monaco Grand Prix",
    date: "5–7 Jun 2026",
    location: "Monte Carlo, Monaco",
    tier: "Ultra-Premium",
    price: "From $5,000",
    image: "https://images.unsplash.com/photo-1580651214613-f4692d6d138f?w=600&q=80",
  },
  {
    sport: "Tennis",
    name: "Wimbledon Championships",
    date: "29 Jun–12 Jul 2026",
    location: "London, UK",
    tier: "Ultra-Premium",
    price: "From $2,000",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80",
  },
  {
    sport: "Golf",
    name: "The Masters",
    date: "6–12 Apr 2026",
    location: "Augusta, USA",
    tier: "Ultra-Premium",
    price: "From $5,000",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&q=80",
  },
  {
    sport: "Horse Racing",
    name: "Royal Ascot",
    date: "Jun 2026",
    location: "Ascot, UK",
    tier: "Premium",
    price: "From $1,500",
    image: "https://images.unsplash.com/photo-1631448829489-6228f21df74c?w=600&q=80",
  },
];

export default function FeaturedEvents() {
  return (
    <section
      className="py-20 px-8"
      style={{ backgroundColor: "#1a1d1a" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#F7BE68" }}
          >
            Coming Soon
          </p>
          <h2
            className="text-white text-4xl mb-4"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
            }}
          >
            Featured <em>Events</em>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <span
              className="block h-px w-12"
              style={{ background: "rgba(247,190,104,0.4)" }}
            />
            <span
              className="block w-1.5 h-1.5 rounded-full"
              style={{ background: "#F7BE68" }}
            />
            <span
              className="block h-px w-12"
              style={{ background: "rgba(247,190,104,0.4)" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED.map((event) => (
            <a
              key={event.name}
              href="#"
              className="group relative block overflow-hidden rounded-xl"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
                }}
              />

              {/* Tier badge */}
              <div className="absolute top-4 left-4">
                <span
                  className="text-[0.65rem] font-medium tracking-wider uppercase px-3 py-1 rounded-full"
                  style={{
                    backgroundColor:
                      event.tier === "Ultra-Premium"
                        ? "#F7BE68"
                        : "rgba(255,255,255,0.15)",
                    color:
                      event.tier === "Ultra-Premium" ? "#000" : "#fff",
                  }}
                >
                  {event.tier}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p
                  className="text-[0.7rem] tracking-[0.2em] uppercase mb-2"
                  style={{ color: "#F7BE68" }}
                >
                  {event.sport}
                </p>
                <h3
                  className="text-white text-xl mb-2"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  {event.name}
                </h3>
                <div className="flex items-center gap-2 mb-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <span className="text-white/50 text-xs">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-white/50 text-xs">
                    {event.location}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#F7BE68" }}
                  >
                    {event.price}
                  </span>
                  <span className="text-white/40 text-xs group-hover:text-white/70 transition-colors duration-300">
                    Enquire →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
