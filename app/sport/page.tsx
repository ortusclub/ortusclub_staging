import Image from "next/image";
import SportCatalogue from "./SportCatalogue";

export const metadata = {
  title: "Sport — The Ortus Club",
  description:
    "World-class sporting hospitality experiences for executives. Browse our 2026 calendar of events across Formula 1, Tennis, Golf, Football, and more.",
};

export default function SportPage() {
  return (
    <main>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <Image
            src="https://www.ortusclub.com/wp-content/uploads/2021/04/image-1.png"
            alt="The Ortus Club"
            width={100}
            height={32}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex items-center gap-8">
          <a href="/" className="text-white text-sm tracking-wider hover:opacity-70">
            HOME
          </a>
          <a
            href="#catalogue"
            className="text-white text-sm tracking-wider hover:opacity-70"
          >
            EVENTS
          </a>
          <a
            href="#"
            className="text-white text-sm tracking-wider border border-white rounded-full px-5 py-2 hover:bg-white hover:text-black transition-colors"
          >
            ENQUIRE NOW
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{ height: "60vh" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1504016798967-59a258e9386d?w=1800&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-3xl px-8">
          <h1
            className="text-white text-5xl mb-6"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
              lineHeight: 1.15,
            }}
          >
            <em>Sporting Hospitality</em>
            <br />
            Experiences 2026
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            We bring executives together through world-class sporting
            experiences, combining elite competition with meaningful networking
            in unforgettable settings.
          </p>
          <a
            href="#catalogue"
            className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#F7BE68" }}
          >
            Browse Events
          </a>
        </div>
      </section>

      {/* CATALOGUE */}
      <div id="catalogue">
        <SportCatalogue />
      </div>

      {/* CTA FOOTER */}
      <section className="bg-black py-20 px-8 text-center">
        <h2
          className="text-white text-3xl mb-4"
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontWeight: 400,
          }}
        >
          Interested in an event?
        </h2>
        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
          All experiences are tailored to your group. Reach out and we&apos;ll
          put together a bespoke proposal.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#F7BE68" }}
        >
          Get in Touch
        </a>
      </section>
    </main>
  );
}
