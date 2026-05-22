import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Marketing Leaders Peer Advisory Group — The Ortus Club",
  description:
    "An invite-only, complimentary peer advisory group for marketing leaders worldwide — from CMOs to events and field marketing executives.",
};

const hotTopics = [
  {
    title: "How to leverage AI to maximise marketing strategies",
    body: "Practical case studies of marketing teams using AI to scale content, sharpen targeting, and accelerate experimentation.",
  },
  {
    title: "Techniques to measure ROI",
    body: "Modern attribution, mixed-media modelling, and pipeline-aware reporting — how leading teams prove what marketing does.",
  },
  {
    title: "Emerging marketing trends",
    body: "What's actually moving the needle right now versus what's noise — from communities to creator partnerships to product-led growth.",
  },
];

export default function MarketingLeadersPage() {
  return (
    <>
      <PageHero
        eyebrow="Marketing Hub"
        title="Marketing Leaders Peer Advisory Group"
        description="An invite-only community for marketing leaders worldwide — from CMOs to events and field marketing executives. Complimentary. High value. Genuinely peer-led."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            About the <em>group</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed mb-4">
            This invite-only community is designed for marketing leaders worldwide. Connect, collaborate,
            and gain insights from peers across leading global brands — in a complimentary, high-value
            network setting.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our Virtual Access Groups meet once a month. Sessions are 100% digital, connecting you with
            peers across the globe. All discussions are private and bound by our confidentiality
            disclaimer — what&apos;s said in the group stays in the group.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Hot topics of <em>discussion</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotTopics.map((t) => (
              <div key={t.title} className="bg-white rounded-2xl p-8">
                <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                  {t.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Register your interest
          </h2>
          <p className="text-gray-600 mb-8">
            Tell us about your role and we&apos;ll be in touch about the next session.
          </p>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Register Interest
          </Link>
        </div>
      </section>
    </>
  );
}
