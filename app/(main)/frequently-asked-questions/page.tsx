import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — The Ortus Club",
  description:
    "Common questions about attending, hosting, and partnering with The Ortus Club.",
};

const faqs = [
  {
    q: "What is The Ortus Club?",
    a: "The Ortus Club is a global executive events company that designs and runs pitch-free, knowledge-sharing events — roundtables, masterclasses, virtual events, and large-scale summits — for senior decision-makers across industries.",
  },
  {
    q: "What does &lsquo;pitch-free&rsquo; mean?",
    a: "Our events are not sales pitches. Hosts and sponsors are welcome at the table as peers, but the conversation belongs to the executives in the room. Discussions follow the Chatham House Rule and stay focused on shared challenges and tested solutions.",
  },
  {
    q: "Who attends Ortus events?",
    a: "Senior decision-makers — typically directors, VPs, and C-level leaders — from companies that match the topic and audience profile we agreed with the host. Every attendee is vetted by role, seniority, and relevance, not by ticket purchase.",
  },
  {
    q: "How do I attend an event?",
    a: "Most events are invitation-only. You can request an invite through our Contact page, and our team will let you know about upcoming sessions that match your role and interests.",
  },
  {
    q: "Where are events held?",
    a: "We operate globally — Singapore, London, New York, Dubai, Hong Kong, Sydney, Tokyo, Seoul, and across the rest of APAC, EMEA and the Americas. We curate premium venues in each city for atmosphere, privacy, and quality of service.",
  },
  {
    q: "Is there a cost to attend?",
    a: "For invited executives, attendance is complimentary. The events are funded by our hosts — the companies who partner with us to convene the audience.",
  },
  {
    q: "Can my company host an event with The Ortus Club?",
    a: "Yes. We work with B2B companies who want to build trusted relationships with senior decision-makers. Get in touch via our Contact page and our team will walk you through audience profiles, formats, and what hosting an Ortus event looks like end-to-end.",
  },
  {
    q: "How do I become a moderator?",
    a: "Our 1,300+ moderator network is always growing. If you have deep industry expertise and proven facilitation experience, we&apos;d love to hear from you — start with our Contact page or visit the Our Moderators page.",
  },
  {
    q: "What kind of formats do you run?",
    a: "Intimate executive roundtables (8–15 guests), masterclasses and panels (up to 30), virtual events for global audiences, and large-scale summits for 100+ leaders. Many hosts use a combination across the year.",
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Frequently Asked Questions"
        description="Common questions about attending, hosting, and partnering with The Ortus Club."
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group rounded-lg border border-gray-200 bg-white open:bg-[#F4F4F4] transition-colors"
              >
                <summary className="cursor-pointer list-none p-5 flex justify-between items-center gap-4">
                  <span
                    className="text-lg pr-4"
                    style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}
                    dangerouslySetInnerHTML={{ __html: item.q }}
                  />
                  <span className="text-xl text-gray-400 group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <div
                  className="px-5 pb-5 text-gray-700 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.a }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-16 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Still have questions?
          </h2>
          <Link href="/contact-us/" className="inline-block px-7 py-3 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68" }}>
            Ask Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
