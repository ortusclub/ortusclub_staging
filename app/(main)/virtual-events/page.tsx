import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Virtual Events — The Ortus Club",
  description:
    "Curated virtual roundtables and webinars that bring senior executives together across regions — focused, high-quality, and globally efficient.",
};

const stats = [
  { value: "76%", label: "OF GUESTS RATE OUR VIRTUAL EVENTS AS EXCELLENT" },
  { value: "3,600+", label: "VIRTUAL EVENTS HOSTED" },
  { value: "50+", label: "COUNTRIES REPRESENTED" },
];

const uniqueness = [
  "Expert facilitation that turns a webinar into a real conversation, not a broadcast.",
  "Smart interactive tools — polls, breakouts, and structured Q&A — that keep guests engaged.",
  "Cross-region reach without the carbon, cost, or calendar logistics of travel.",
  "Premium production — sound, lighting, branded backdrops — that respects guests' time.",
];

const expectations = [
  { title: "Boundary-less reach", description: "Connect with key decision-makers worldwide, efficiently and sustainably." },
  { title: "Expert hosts", description: "Our hosts guide the conversation by sharing insights, asking the right questions, and encouraging open discussion." },
  { title: "Interactive by design", description: "Polls, breakouts, and Q&A turn passive viewers into active participants." },
  { title: "Smooth experience", description: "Tested platforms, dial-in support, and a producer on every event keep the experience close to being in the room together." },
];

const addOns = [
  { title: "Virtual Tastings & Catering", description: "Wine, whisky, coffee or chocolate sent to every guest in advance — a shared sensory anchor that lifts a virtual room." },
  { title: "Live Sketchnoting", description: "A professional illustrator turns the conversation into a visual artefact your guests want to share." },
];

export default function VirtualEventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Virtual Events"
        description="Scalable conversations without boundaries through curated virtual events."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            About Our <em>Virtual Events</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed mb-4">
            Our virtual events and webinars bring executives together across regions for focused, high-quality
            discussions — designed for maximum reach, efficiency, and impact.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Using premium virtual engagement platforms, we deliver a smooth, engaging experience that feels
            close to being in the room together. Whether guests dial in from a curated venue or from their
            office, the value of the experience stays the same.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            What Makes Our <em>Virtual Events Unique?</em>
          </h2>
          <div className="w-16 h-px bg-black mb-8" />
          <ul className="space-y-4">
            {uniqueness.map((u, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-black text-sm font-medium shrink-0 mt-0.5" style={{ backgroundColor: "#F7BE68" }}>
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#1a1a1a] py-20 px-6 lg:px-12 text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg py-10 px-6 text-center" style={{ backgroundColor: "#484D49" }}>
              <div className="text-5xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}>
                {s.value}
              </div>
              <div className="text-white/80 text-xs tracking-widest italic">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            What to <em>Expect</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {expectations.map((e) => (
              <div key={e.title}>
                <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                  {e.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Signature <em>add-ons</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {addOns.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                  {a.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Ready to take your virtual events to the next level?
          </h2>
          <Link href="/contact-us/" className="mt-4 inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Book a Meeting
          </Link>
        </div>
      </section>
    </>
  );
}
