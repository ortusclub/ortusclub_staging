import Link from "next/link";
import EventsSection from "../components/EventsSection";
import EventTypesSection from "../components/EventTypesSection";
import StatsSection from "../components/StatsSection";

export default function Home() {
  const tickerItems = [
    "SUPPLY CHAIN", "IT", "FINANCE", "MARKETING", "CX", "LEGAL", "LEADERSHIP", "HR",
    "SUPPLY CHAIN", "IT", "FINANCE", "MARKETING", "CX", "LEGAL", "LEADERSHIP", "HR",
  ];

  return (
    <>
      {/* HERO — renders behind the fixed SiteHeader (header is position:fixed so it doesn't take flow space) */}
      <section
        className="relative h-[88vh] flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url(https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://www.ortusclub.com/wp-content/uploads/2026/02/Homepage-Video-optimized.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 px-12 max-w-4xl">
          <h1
            className="text-white text-5xl leading-tight mb-10"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            <em>The Ortus Club</em>
            <br />curates networking and knowledge-sharing opportunities for the world&apos;s most
            influential executives.
          </h1>
          <div className="flex gap-4">
            <Link
              href="/event-highlights/"
              className="px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#F7BE68" }}
            >
              Attend an Event
            </Link>
            <Link
              href="/contact-us/"
              className="px-7 py-3 rounded-full text-white text-sm font-medium border border-white hover:bg-white hover:text-black transition-colors"
            >
              Host an Event
            </Link>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-black py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {tickerItems.map((item, i) => (
            <span key={i} className="text-white text-base tracking-widest mx-10 font-light">
              {item}
            </span>
          ))}
        </div>
      </div>

      <EventsSection />
      <StatsSection />
      <EventTypesSection />
    </>
  );
}
