import Image from "next/image";
import HeroCarousel from "./HeroCarousel";
import SportAccordion from "./SportAccordion";
import SportCalendarSection from "./SportCalendarSection";

export const metadata = {
  title: "Sport — The Ortus Club",
  description:
    "World-class sporting hospitality experiences for executives. Browse our 2026 calendar of events across Formula 1, Tennis, Golf, Football, and more.",
};

const SPORT_TICKER = [
  "BASKETBALL", "FOOTBALL", "FORMULA 1", "GOLF", "TENNIS", "RUGBY",
  "CRICKET", "SAILING", "HORSE RACING", "BOXING", "MOTORSPORT", "ICE HOCKEY",
  "BASKETBALL", "FOOTBALL", "FORMULA 1", "GOLF", "TENNIS", "RUGBY",
  "CRICKET", "SAILING", "HORSE RACING", "BOXING", "MOTORSPORT", "ICE HOCKEY",
];

export default function SportPage() {
  return (
    <main>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5">
        <div className="flex items-center">
          <Image
            src="https://www.ortusclub.com/wp-content/uploads/2021/04/image-1.png"
            alt="The Ortus Club"
            width={110}
            height={60}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-white text-sm tracking-wider hover:opacity-70 flex items-center gap-1">
            EVENTS <span className="text-xs">&#9662;</span>
          </a>
          <a href="#" className="text-white text-sm tracking-wider hover:opacity-70 flex items-center gap-1">
            ABOUT <span className="text-xs">&#9662;</span>
          </a>
          <a href="#" className="text-white text-sm tracking-wider hover:opacity-70 flex items-center gap-1">
            RESOURCES <span className="text-xs">&#9662;</span>
          </a>
          <a href="#" className="text-white text-sm tracking-wider hover:opacity-70">
            CONTACT US
          </a>
          <a
            href="#"
            className="text-white text-sm tracking-wider border border-white rounded-full px-6 py-2.5 hover:bg-white hover:text-black transition-colors"
          >
            BOOK A MEETING
          </a>
        </div>
      </nav>

      {/* HERO CAROUSEL */}
      <HeroCarousel />

      {/* SPORT TICKER */}
      <div className="bg-black py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {SPORT_TICKER.map((item, i) => (
            <span
              key={i}
              className="text-white text-sm tracking-[0.25em] mx-10 font-light uppercase"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-center text-4xl mb-14"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
              color: "#111",
              fontStyle: "italic",
            }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Step 1 */}
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "#F7BE68" }}
              >
                <span
                  className="text-xl font-light"
                  style={{ fontFamily: "var(--font-cormorant), serif", color: "#111" }}
                >
                  1
                </span>
              </div>
              <h3
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#111",
                }}
              >
                Share Your Targets
              </h3>
              <p className="text-neutral-500 text-base leading-relaxed">
                Provide a list of target accounts, your ideal customer profile,
                or the specific titles and industries you want to engage with.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "#F7BE68" }}
              >
                <span
                  className="text-xl font-light"
                  style={{ fontFamily: "var(--font-cormorant), serif", color: "#111" }}
                >
                  2
                </span>
              </div>
              <h3
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#111",
                }}
              >
                Choose Your Event
              </h3>
              <p className="text-neutral-500 text-base leading-relaxed">
                Select a sporting event from our calendar — or let us recommend
                the perfect occasion to match your audience and objectives.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: "#F7BE68" }}
              >
                <span
                  className="text-xl font-light"
                  style={{ fontFamily: "var(--font-cormorant), serif", color: "#111" }}
                >
                  3
                </span>
              </div>
              <h3
                className="text-xl mb-3"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#111",
                }}
              >
                We Curate &amp; Invite
              </h3>
              <p className="text-neutral-500 text-base leading-relaxed">
                Ortus will curate and invite your target audience to the
                sporting event, where you&apos;ll be positioned as host with the
                perfect platform to build lasting relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPORT ACCORDION */}
      <SportAccordion />

      {/* CALENDAR / PDF DOWNLOAD */}
      <SportCalendarSection />

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
