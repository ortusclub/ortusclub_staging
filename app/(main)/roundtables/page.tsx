import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Executive Roundtables — The Ortus Club",
  description:
    "Confidential, pitch-free, peer-advisory roundtables that bring together 8–15 senior executives for trusted, focused discussions.",
};

const stats = [
  { value: "84%", label: "OF GUESTS RATE OUR ROUNDTABLES AS EXCELLENT" },
  { value: "4,000+", label: "ROUNDTABLES HOSTED GLOBALLY" },
  { value: "40+", label: "CITIES WORLDWIDE" },
];

const uniqueness = [
  "Intimate groups of 8–15 senior decision-makers — never overcrowded.",
  "Pitch-free, confidential discussions held under the Chatham House Rule.",
  "Expert hosts who guide the conversation and bring out every voice in the room.",
  "Premium venues curated for atmosphere, privacy, and quality of service.",
];

const expectations = [
  { title: "Curated audience", description: "We hand-pick attendees by role, seniority, and relevance to the topic — not by who paid for a ticket." },
  { title: "Peer-advisory format", description: "Discussions are structured to surface real challenges and tested solutions from people facing the same problems." },
  { title: "Expert moderation", description: "A professional host keeps the conversation honest, balanced, and on-topic." },
  { title: "Long-lasting connections", description: "Most attendees leave with new peers they continue to learn from after the room clears." },
];

export default function RoundtablesPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Executive Roundtables"
        description="A trusted inner circle, brought together through curated, pitch-free executive roundtables."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      {/* About */}
      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            About Our <em>Executive Roundtables</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed mb-4">
            Our in-person executive roundtables follow a peer-advisory approach and are the ultimate shortcut to
            building a trusted inner circle. We bring together intimate, selective groups of executives for
            confidential, neutral, pitch-free discussions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every roundtable is designed to maximise impact and foster professional collaboration — built on
            careful audience curation, premium venues, and expert moderation.
          </p>
        </div>
      </section>

      {/* What makes unique */}
      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            What Makes Our <em>Roundtables Unique?</em>
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

      {/* Stats */}
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

      {/* What to Expect */}
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

      {/* CTA */}
      <section className="bg-[#F4F4F4] py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Ready to host or attend a roundtable?
          </h2>
          <p className="text-gray-600 mb-8">
            Tell us about your audience and we&apos;ll get back to you within one business day.
          </p>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Book a Meeting
          </Link>
        </div>
      </section>
    </>
  );
}
