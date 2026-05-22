import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Join a Marketing Event — The Ortus Club",
  description:
    "Curated in-person and virtual events for senior marketing professionals. Discussions, panels, coffee meet-ups, and informal social gatherings.",
};

const reasons = [
  {
    title: "Network with peers",
    body: "Dedicated time to meet senior marketing peers who share your passions — in a dynamic, collaborative community that encourages knowledge-sharing.",
  },
  {
    title: "Stay ahead of trends",
    body: "Surrounded by industry visionaries, thought leaders, and disruptors, you&apos;ll get a front-row view of emerging strategies before they go mainstream.",
  },
  {
    title: "Shape the conversation",
    body: "Our roundtables are designed for executives who don&apos;t just consume insight — they create it. Bring your perspective, leave with new ones.",
  },
];

const featured = [
  {
    title: "Marketing That Matters: Designing Events That Build Trust, Authority, and Revenue",
    location: "Sydney",
  },
  {
    title: "Ecosystem-Led Growth: Turning Partner Marketing into a Scalable Revenue Engine",
    location: "Virtual",
  },
  {
    title: "Scale, Scope, and Spend: Architecting a High-Impact Global Event Portfolio for 2026",
    location: "London / New York",
  },
  {
    title: "Elevating Corporate Events: Turning Engagement into Tangible Value",
    location: "Singapore",
  },
];

export default function JoinMarketingEventPage() {
  return (
    <>
      <PageHero
        eyebrow="Marketing Hub"
        title="Join a Marketing Event"
        description="In-person discussions, virtual roundtables, webinars, panels, coffee meet-ups, and informal gatherings — designed for senior marketing professionals."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Why you should <em>attend</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((r) => (
              <div key={r.title}>
                <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                  {r.title}
                </h3>
                <p
                  className="text-gray-700 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: r.body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Explore <em>marketing events</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((e) => (
              <article key={e.title} className="bg-white rounded-2xl p-8">
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-2">{e.location}</div>
                <h3 className="text-xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                  {e.title}
                </h3>
                <Link href="/contact-us/" className="text-sm font-medium inline-flex items-center gap-2 hover:opacity-70">
                  Request invite →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Don&apos;t see the right event?
          </h2>
          <p className="text-gray-600 mb-8">
            Tell us your role and the topics you care about — we&apos;ll match you to upcoming sessions.
          </p>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Request an Invitation
          </Link>
        </div>
      </section>
    </>
  );
}
