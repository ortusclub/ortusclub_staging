import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "The 2026 Event Marketer's Playbook — The Ortus Club",
  description:
    "Insights from 198 marketing roundtables and 1,895 senior participants — the data-informed playbook for event marketing that actually builds trust and pipeline.",
};

const stats = [
  { value: "198", label: "MARKETING ROUNDTABLES HOSTED" },
  { value: "1,895", label: "SENIOR PARTICIPANTS" },
  { value: "29", label: "SUMMIT-LEVEL EVENTS IN 2025" },
];

const themes = [
  {
    title: "Executives are tired of noise",
    body: "From London to Manila, one truth surfaces: senior leaders want clarity, not clutter. The playbook documents what they actually engage with — and what they tune out.",
  },
  {
    title: "Trust is the new pitch",
    body: "Modern event marketing isn&apos;t about presenting. It&apos;s about facilitating &lsquo;communities of like-minded leaders&rsquo; — and giving them reasons to stay.",
  },
  {
    title: "Hyper-curated wins",
    body: "Our hyper-curated, data-informed events have been rated the most effective format by visiting executives. The playbook shows you how to build that bar into your own programme.",
  },
];

export default function PlaybookPage() {
  return (
    <>
      <PageHero
        eyebrow="Marketing Hub"
        title="The 2026 Event Marketer's Playbook"
        description="Insights from 198 marketing roundtables and 1,895 senior participants — the data-informed playbook for event marketing that builds trust, not noise."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

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
            What&apos;s <em>inside</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="space-y-10">
            {themes.map((t) => (
              <div key={t.title} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                <h3
                  className="text-2xl md:col-span-1"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}
                >
                  {t.title}
                </h3>
                <p
                  className="md:col-span-3 text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t.body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Access the playbook
          </h2>
          <p className="text-gray-600 mb-8">
            Tell us where to send it. We&apos;ll email the full PDF.
          </p>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Request the Playbook
          </Link>
        </div>
      </section>
    </>
  );
}
