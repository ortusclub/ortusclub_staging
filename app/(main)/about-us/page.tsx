import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "About The Ortus Club",
  description:
    "The Ortus Club is the trusted partner for building invaluable executive communities, leveraging the power of networking events.",
};

const stats = [
  { value: "2,500+", label: "EVENTS" },
  { value: "27,000+", label: "PARTICIPANTS" },
  { value: "40+", label: "COUNTRIES" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About The Ortus Club"
        description="The trusted partner for building invaluable executive communities, leveraging the power of networking events."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      {/* Our Vision */}
      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            Our <em>Vision</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed mb-4">
            The Ortus Club&apos;s vision is to become the most strategic executive dialogue
            curator in the world, with impactful conversations that engage everyone. With each of
            our events, we aim to:
          </p>
          <ul className="space-y-3 text-gray-700 leading-relaxed list-disc pl-6">
            <li>Bring together the right senior decision-makers for confidential discussions.</li>
            <li>Foster meaningful connections that translate into trust and business outcomes.</li>
            <li>Deliver high-quality, pitch-free environments where insights are exchanged freely.</li>
          </ul>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            Our <em>Expertise</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed mb-4">
            Unlike typical event suppliers, we are a trusted consultant — using our deep
            understanding of our audience to forge meaningful connections and provide
            unparalleled access to curated executive networks.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Across roundtables, masterclasses, virtual events, and large-scale summits, we
            specialise in producing the conditions for executives to share insights, build
            relationships, and accelerate business growth.
          </p>
        </div>
      </section>

      {/* Why Ortus */}
      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            Why <em>The Ortus Club</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed">
            Building relationships with senior executives is increasingly complex, costly, and
            time-consuming. The Ortus Club exists to make that easier — combining a global
            network, world-class venues, and expert moderation so every conversation is worth
            the seat at the table.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#1a1a1a] py-20 px-6 lg:px-12 text-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2
            className="text-4xl mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            Ortus in <em>Numbers</em>
          </h2>
          <div className="w-16 h-px bg-white mx-auto" />
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg py-10 px-6 text-center"
              style={{ backgroundColor: "#484D49" }}
            >
              <div
                className="text-5xl mb-3"
                style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}
              >
                {s.value}
              </div>
              <div className="text-white/80 text-xs tracking-widest italic">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            Want to find out more?
          </h2>
          <p className="text-gray-600 mb-8">
            Book a meeting with our team or download our event brochure.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact-us/"
              className="px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#F7BE68" }}
            >
              Book a Meeting
            </Link>
            <Link
              href="/event-highlights/"
              className="px-7 py-3 rounded-full text-black text-sm font-medium border border-black hover:bg-black hover:text-white transition-colors"
            >
              See Event Highlights
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
