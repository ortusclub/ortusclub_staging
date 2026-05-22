import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Masterclasses & Panels — The Ortus Club",
  description:
    "Intensive, high-level masterclasses and expert-led panels that turn complex industry knowledge into practical, actionable insight.",
};

const stats = [
  { value: "72%", label: "OF GUESTS RATE OUR MASTERCLASSES AS EXCELLENT" },
  { value: "300+", label: "MASTERCLASSES & PANELS HOSTED" },
  { value: "30", label: "GUESTS PER SESSION (AVG)" },
];

const uniqueness = [
  "Larger but still selective audiences — typically up to 30 executives.",
  "Expert speakers and panellists curated for credibility and depth, not celebrity.",
  "Interactive format: Q&A, working sessions, and structured peer discussion built in.",
  "Concrete takeaways, not abstract theory — designed to be applied next quarter.",
];

const expectations = [
  { title: "Practical content", description: "Sessions are designed around real challenges your peers are facing, with frameworks you can take back to your team." },
  { title: "Expert speakers", description: "We bring in operators and specialists who have lived the problem — not professional keynote speakers." },
  { title: "Active participation", description: "Built-in Q&A, breakout discussions, and working-session formats keep every guest engaged." },
  { title: "High-quality networking", description: "Structured introductions and curated table mixes mean you leave with relationships, not just notes." },
];

export default function MasterclassesPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Masterclasses & Panels"
        description="Intensive, high-level learning for selective executive audiences — turning complex industry knowledge into practical, actionable insight."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            About Our <em>Masterclasses & Panels</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed mb-4">
            Our masterclasses offer intensive, high-level learning designed for larger yet still selective
            audiences. The focus is on turning complex industry knowledge into practical, actionable insights.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every masterclass is expertly curated. The Ortus Club goes beyond passive learning through
            interactive elements and well-prepared speakers — fostering peer learning and high-impact
            connections.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            What Makes Our <em>Masterclasses Unique?</em>
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

      <section className="bg-[#F4F4F4] py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Ready to host or attend a masterclass?
          </h2>
          <p className="text-gray-600 mb-8">
            Let&apos;s shape a session your audience will remember.
          </p>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Book a Meeting
          </Link>
        </div>
      </section>
    </>
  );
}
