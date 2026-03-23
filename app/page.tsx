import Image from "next/image";
import EventsSection from "./components/EventsSection";

export default function Home() {
  const tickerItems = [
    "SUPPLY CHAIN", "IT", "FINANCE", "MARKETING", "CX", "LEGAL", "LEADERSHIP", "HR",
    "SUPPLY CHAIN", "IT", "FINANCE", "MARKETING", "CX", "LEGAL", "LEADERSHIP", "HR",
  ];

  return (
    <main>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="https://www.ortusclub.com/wp-content/uploads/2021/04/image-1.png"
            alt="The Ortus Club"
            width={100}
            height={32}
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-8">
          <a href="#" className="text-white text-sm tracking-wider hover:opacity-70 flex items-center gap-1">
            EVENTS <span className="text-xs">▾</span>
          </a>
          <a href="#" className="text-white text-sm tracking-wider hover:opacity-70 flex items-center gap-1">
            ABOUT <span className="text-xs">▾</span>
          </a>
          <a href="#" className="text-white text-sm tracking-wider hover:opacity-70 flex items-center gap-1">
            RESOURCES <span className="text-xs">▾</span>
          </a>
          <a href="#" className="text-white text-sm tracking-wider hover:opacity-70">
            CONTACT US
          </a>
          <a href="#" className="text-white text-sm tracking-wider border border-white rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors">
            BOOK A MEETING
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[88vh] flex items-center overflow-hidden">
        {/* Video background — replace src with actual video URL */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="https://www.ortusclub.com/wp-content/uploads/2026/02/Homepage-Video-optimized.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 px-12 max-w-4xl">
          <h1
            className="text-white text-5xl leading-tight mb-10"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            <em>The Ortus Club</em><br />curates networking and
            knowledge-sharing opportunities for the
            world&apos;s most influential executives.
          </h1>
          <div className="flex gap-4">
            <a
              href="#"
              className="px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#E8B86D" }}
            >
              Attend an Event
            </a>
            <a
              href="#"
              className="px-7 py-3 rounded-full text-white text-sm font-medium border border-white hover:bg-white hover:text-black transition-colors"
            >
              Host an Event
            </a>
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
    </main>
  );
}
