import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Careers at The Ortus Club",
  description:
    "Join a global team building the world's most curated executive networking experiences. Roles across events, partnerships, marketing, and operations.",
};

const offices = [
  { city: "Singapore", note: "HQ — APAC operations" },
  { city: "London", note: "EMEA operations" },
  { city: "New York", note: "Americas operations" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the rooms where decisions happen."
        description="We&apos;re a global team building the world&apos;s most curated executive networking experiences. If you love being close to the work that shapes industries, we&apos;d love to hear from you."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Why <em>Ortus</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed mb-4">
            Every week, we put senior executives in the same room and watch what happens. Our team gets
            to design those rooms — from the topic and audience to the venue, host, and conversation
            structure that makes the magic possible.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you care about the craft of bringing people together and want to do it at a global scale,
            this is the place.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Our <em>offices</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((o) => (
              <div key={o.city} className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl mb-2" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                  {o.city}
                </h3>
                <p className="text-gray-700 text-sm">{o.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Interested in joining?
          </h2>
          <p className="text-gray-600 mb-8">
            We&apos;re always open to hearing from talented people. Send us your CV and a short note about
            what you&apos;d like to work on.
          </p>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Apply via Contact
          </Link>
        </div>
      </section>
    </>
  );
}
