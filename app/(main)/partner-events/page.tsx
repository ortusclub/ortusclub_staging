import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Partner Events — The Ortus Club",
  description:
    "Standout industry events worldwide, identified and recommended by The Ortus Club — connecting our network to exceptional opportunities organised by our hosts.",
};

const reasons = [
  "Hand-picked events from a network of trusted partners worldwide.",
  "Same quality bar as our own gatherings — curated audiences, expert speakers, premium venues.",
  "Coverage across roundtables, masterclasses, summits, and large-scale conferences.",
  "Direct introductions and concierge support to make sure you get the most out of every invitation.",
];

export default function PartnerEventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Partner Events"
        description="Standout industry events worldwide, identified and recommended by The Ortus Club."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            About <em>Partner Events</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed mb-4">
            We identify and recommend standout industry events worldwide — connecting our network to
            exceptional opportunities and unmissable experiences organised by our trusted hosts.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you&apos;re looking to attend, speak, or sponsor, our partner programme gives you a
            curated front-row seat to the conversations that matter in your industry.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Why <em>our partner events?</em>
          </h2>
          <div className="w-16 h-px bg-black mb-8" />
          <ul className="space-y-4">
            {reasons.map((r, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-black text-sm font-medium shrink-0 mt-0.5" style={{ backgroundColor: "#F7BE68" }}>
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Looking for the right event?
          </h2>
          <p className="text-gray-600 mb-8">
            Tell us what you&apos;re looking to achieve and we&apos;ll point you at the events worth your
            time.
          </p>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Book a Meeting
          </Link>
        </div>
      </section>
    </>
  );
}
