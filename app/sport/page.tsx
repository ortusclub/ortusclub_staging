import Image from "next/image";
import SportsBookshelf from "../components/SportsBookshelf";
import SportHero from "../components/SportHero";
import CatalogueBook from "../components/CatalogueBook";

export default function SportPage() {
  const tickerItems = [
    "BASKETBALL", "FOOTBALL", "FORMULA 1", "GOLF", "TENNIS", "RUGBY", "CRICKET", "SAILING",
    "BASKETBALL", "FOOTBALL", "FORMULA 1", "GOLF", "TENNIS", "RUGBY", "CRICKET", "SAILING",
  ];

  return (
    <main>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black flex items-center justify-between px-8 py-4">
        <div className="flex items-center">
          <a href="/">
            <Image
              src="https://www.ortusclub.com/wp-content/uploads/2021/04/image-1.png"
              alt="The Ortus Club"
              width={100}
              height={32}
              style={{ objectFit: "contain" }}
            />
          </a>
        </div>
        <div className="flex items-center gap-8">
          <a href="/#events" className="text-white text-sm tracking-wider hover:opacity-70 flex items-center gap-1">
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

      {/* HERO SLIDESHOW */}
      <SportHero />

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

      {/* HOW IT WORKS */}
      <section className="bg-[#F4F4F4] py-20 px-8">
        <h2
          className="text-5xl text-center mb-16"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
        >
          <em>How It Works</em>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              step: 1,
              title: "Share Your Targets",
              description:
                "Provide a list of target accounts, your ideal customer profile, or the specific titles and industries you want to engage with.",
            },
            {
              step: 2,
              title: "Choose Your Event",
              description:
                "Select a sporting event from our calendar \u2014 or let us recommend the perfect occasion to match your audience and objectives.",
            },
            {
              step: 3,
              title: "We Curate & Invite",
              description:
                "Ortus will curate and invite your target audience to the sporting event, where you\u2019ll be positioned as host with the perfect platform to build lasting relationships.",
            },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-medium mb-5"
                style={{ backgroundColor: "#F7BE68" }}
              >
                {item.step}
              </div>
              <h3
                className="text-xl mb-3"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, fontStyle: "italic" }}
              >
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="bg-[#F4F4F4] py-20 px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-5xl mb-6"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            Executive <em>Experiences</em>
          </h2>
          <div className="w-16 h-px bg-black mx-auto mb-8" />
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            The Ortus Club brings C-suite leaders and senior decision-makers together through
            world-class sporting events. From executive suites at Formula 1 Grand Prix to
            hospitality boxes at premier football matches, from exclusive golf days to
            courtside at championship basketball — we create unforgettable settings for
            meaningful connections.
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            Every experience is designed to foster genuine relationships built on shared passions,
            combining elite competition with high-level networking in an environment where
            business meets sport.
          </p>
        </div>
      </section>

      {/* SPORTS BOOKSHELF */}
      <SportsBookshelf />

      {/* CATALOGUE SECTION */}
      <section className="bg-[#F4F4F4] py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-4xl mb-4 text-center"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            See Our <em>Catalogue</em>
          </h2>
          <p className="text-gray-500 text-center text-sm mb-10">
            Browse our full sporting events calendar for the year ahead.
          </p>
          <CatalogueBook />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#484D49] py-20 px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-white text-5xl mb-6"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            Ready to <em>Experience</em> it?
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10">
            Whether you want to attend as a guest or host an exclusive sporting event for
            your prospects and clients, we&apos;ll create a bespoke experience tailored to your goals.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="px-8 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#F7BE68" }}
            >
              Request to Join
            </a>
            <a
              href="#"
              className="px-8 py-3 rounded-full text-white text-sm font-medium border border-white hover:bg-white hover:text-black transition-colors"
            >
              Become a Host
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
