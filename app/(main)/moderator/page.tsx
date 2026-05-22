import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Our Moderators — The Ortus Club",
  description:
    "A globally distributed network of 1,300+ expert moderators trained to facilitate executive discussions that are engaging, insightful, and on-topic.",
};

const principles = [
  {
    title: "The art of curation",
    body:
      "Exceptional moderation is the heartbeat of a successful executive event — keeping every voice heard and every conversation on track.",
  },
  {
    title: "The role of the moderator",
    body:
      "A delicate balance: too much intervention stifles genuine dialogue; too little leads to disjointed, unproductive discussion. Our moderators consistently strike that balance.",
  },
  {
    title: "Ortus Certification Program",
    body:
      "Every Ortus moderator is selected, briefed, and supported through our internal certification — covering subject mastery, facilitation craft, and confidentiality standards.",
  },
];

const featuredMods = [
  {
    name: "Steven Nunez",
    company: "Akkodis",
    quote: "Can AI-level logic master the art of executive consensus?",
  },
  {
    name: "Cesar Ivan Diaz",
    company: "FreeBalance",
    quote: "Can the art of moderation induce global consensus in a fragmented world?",
  },
  {
    name: "Alish Shams",
    company: "Startup Grind Calgary",
    quote: "How can genuine connection be the ultimate strategy for B2B success?",
  },
  {
    name: "Danny Flint",
    company: "Ortus Moderator",
    quote: "The best conversations happen when the host knows when to step back.",
  },
];

export default function ModeratorPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Our Moderators"
        description="A globally distributed network of 1,300+ expert moderators — trained to make every executive event engaging, insightful, and outcome-driven."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            The art of curating the <em>perfect conversation</em>
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed">
            At The Ortus Club, we understand that exceptional moderation is the heartbeat of a successful
            event. Our globally distributed network of 1,300+ expert event moderators consistently strikes
            the balance between guiding the room and getting out of the way — ensuring every event is
            engaging, insightful, and achieves its objectives.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-8">
                <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                  {p.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Meet some of <em>our moderators</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredMods.map((m) => (
              <div key={m.name} className="rounded-2xl bg-[#F4F4F4] p-8">
                <div
                  className="text-2xl mb-1"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}
                >
                  {m.name}
                </div>
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-4">{m.company}</div>
                <blockquote className="text-gray-700 italic text-sm leading-relaxed border-l-2 border-[#F7BE68] pl-4">
                  &ldquo;{m.quote}&rdquo;
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Interested in joining as a moderator?
          </h2>
          <p className="text-gray-600 mb-8">
            We&apos;re always looking for seasoned facilitators with deep industry expertise.
          </p>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
