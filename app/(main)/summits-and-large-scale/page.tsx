import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Large-Scale Events & Summits — The Ortus Club",
  description:
    "High-impact, half-day to full-day flagship summits for 100+ senior leaders — keynotes, panels, and facilitated discussions, all with the personal touch of an Ortus event.",
};

const uniqueness = [
  "Same intimacy and executive focus as our smaller gatherings — just at scale.",
  "Keynote sessions, fireside chats, panels, and small breakout groups in one agenda.",
  "Smooth logistics and thoughtful branding so guests feel taken care of, not processed.",
  "Curated audience and pre-event briefings that keep the room genuinely senior.",
];

const formats = [
  { title: "Live Experiential", description: "Immersive on-site experiences that anchor the event in something memorable beyond the agenda." },
  { title: "Captivating Conferences", description: "Multi-track, multi-speaker programmes — produced end to end, from stage to AV." },
  { title: "Corporate Themed Events & Parties", description: "Brand-led celebrations and themed evenings that turn networking into a story." },
  { title: "Inspiring Masterclasses", description: "Larger-format learning sessions for selective audiences, built on the same principles as our intimate masterclasses." },
];

export default function SummitsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Large-Scale Events & Summits"
        description="High-impact flagship experiences that place our hosts at the centre of their industries — for 100+ senior leaders."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            About Our <em>Large-Scale Events & Summits</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Summits are high-impact, half-day or full-day flagship experiences that place our hosts at the
            centre of their industries. We bring together 100+ senior leaders for a powerful agenda of
            keynotes, panels, and facilitated discussions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The Ortus Club&apos;s large-scale events bring the same sense of intimacy and executive focus
            found in our smaller gatherings, simply with a wider audience — keeping discussions clear,
            relevant, and engaging.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            What Makes Our <em>Summits Unique?</em>
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

      {/* Formats we run */}
      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Here&apos;s what <em>we can do</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {formats.map((f) => (
              <div key={f.title}>
                <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                  {f.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Planning a flagship event?
          </h2>
          <p className="text-gray-600 mb-8">
            We&apos;ll help you scope, stage, and run it end to end.
          </p>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Book a Meeting
          </Link>
        </div>
      </section>
    </>
  );
}
