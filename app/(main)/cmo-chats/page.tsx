import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "CMO Chats — The Ortus Club",
  description:
    "A knowledge-sharing series interviewing leading CMOs about strategy, leadership, and the evolving role of marketing in B2B.",
};

const pillars = [
  {
    title: "Knowledge-sharing",
    body: "Interviews with leading CMOs on the strategy, leadership lessons, and operating models shaping B2B marketing today.",
  },
  {
    title: "Relationship building",
    body: "A peer-to-peer initiative that connects CMOs and senior marketing leaders across companies, geographies, and industries.",
  },
  {
    title: "Promotional opportunity",
    body: "A platform for the most accomplished marketers to share their perspective with a sharp, engaged audience of peers.",
  },
];

const featured = [
  {
    name: "Suzana Ristevski",
    role: "CMO, Google Australia & New Zealand",
    blurb: "On scaling marketing organisations in a year of hard prioritisation.",
  },
  {
    name: "Alexander de Leon",
    role: "VP of Marketing, PropertyGuru Group",
    blurb: "Building marketing engines that work across multiple Southeast Asian markets.",
  },
  {
    name: "Sameer Shaik",
    role: "Director of Marketing, QENTELLI",
    blurb: "How marketing teams partner with engineering to ship trust at velocity.",
  },
];

export default function CMOChatsPage() {
  return (
    <>
      <PageHero
        eyebrow="Marketing Hub"
        title="CMO Chats"
        description="A dynamic knowledge-sharing initiative cultivating peer-to-peer connections among business executives — propelling the marketing industry forward."
        image="https://www.ortusclub.com/wp-content/uploads/2026/03/2026-Home-Page-Banner-optimized.webp"
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            What <em>CMO Chats</em> is
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 leading-relaxed">
            Launched in 2020, CMO Chats is our backstage pass to the dynamic world of B2B marketing. We
            interview leading CMOs shaping the contemporary business landscape — unpacking global
            strategy, industry trends, and success stories with seasoned professionals, thought leaders,
            and visionaries.
          </p>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl p-8">
              <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                {p.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Featured <em>chats</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((c) => (
              <article key={c.name} className="bg-[#F4F4F4] rounded-2xl p-8">
                <div
                  className="text-2xl mb-1"
                  style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}
                >
                  {c.name}
                </div>
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-4">{c.role}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{c.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Want to feature on CMO Chats?
          </h2>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
