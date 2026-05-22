import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Event Highlights — The Ortus Club",
  description:
    "Dive into our invite-only executive events and the insights, conversations, and experiences that helped top executives grow their network.",
};

const highlights = [
  {
    title: "Building Cyber Resilience Across APAC",
    partner: "Recorded Future",
    blurb: "Regional risk leaders explored how to harden enterprise defences against state-level and supply-chain threats.",
  },
  {
    title: "Marketing That Matters: Designing Events That Drive Trust, Authority and Revenue",
    partner: "Sydney CMO roundtable",
    blurb: "Sydney's marketing leaders dissected event programmes that move pipeline — not just MQLs.",
  },
  {
    title: "From Support Function to Strategic Engine: Rethinking ITSM",
    partner: "Enterprise IT roundtable",
    blurb: "IT leaders reframed service management as a competitive lever, not a cost centre.",
  },
  {
    title: "The Next Era of Digital Experience: Human-Led AI",
    partner: "Sitecore",
    blurb: "Marketing and product leaders explored what changes when AI is shaped by, not for, the customer.",
  },
  {
    title: "Low-code + AI: The Business Leader's Advantage",
    partner: "Zoho",
    blurb: "How non-technical teams are using low-code and AI to ship faster than their engineering peers can.",
  },
  {
    title: "Transforming Contact Centres into Growth Engines",
    partner: "Zendesk",
    blurb: "CX leaders unpacked the playbook for turning support into a revenue and retention machine.",
  },
  {
    title: "Achieving Efficient Growth",
    partner: "Amplitude",
    blurb: "Product and growth leaders compared notes on doing more with less — without sacrificing experimentation.",
  },
];

export default function EventHighlightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Event Highlights"
        title="Where the conversations happen."
        description="Dive into our invite-only executive events and discover the insights, the dialogue, and the experiences that helped top executives grow their network."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <article
                key={h.title}
                className="rounded-2xl p-8 bg-[#F4F4F4] flex flex-col"
              >
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-2">
                  {h.partner}
                </div>
                <h3
                  className="text-2xl mb-3 flex-1"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}
                >
                  {h.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-6">{h.blurb}</p>
                <Link
                  href="/contact-us/"
                  className="text-sm font-medium inline-flex items-center gap-2 hover:opacity-70"
                >
                  Request invite →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Want to be in the room next time?
          </h2>
          <p className="text-gray-600 mb-8">
            Tell us about your role and the topics you care about. We&apos;ll match you to the right events.
          </p>
          <Link
            href="/contact-us/"
            className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#F7BE68" }}
          >
            Request an Invitation
          </Link>
        </div>
      </section>
    </>
  );
}
