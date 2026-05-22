import type { Metadata } from "next";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Subscribe to Our Newsletter — The Ortus Club",
  description:
    "Join 10,000+ executives receiving exclusive insights, upcoming events, and speaker highlights every first Tuesday of the month.",
};

const recent = [
  {
    title: "Synthetic Identity 3.0: AI-Generated Humans at Scale",
    blurb: "How fraud teams are confronting AI-generated personas that pass every legacy verification check.",
  },
  {
    title: "Agentic AI in the Enterprise",
    blurb: "Notes from a Manila roundtable on data modernisation and intelligent operations — what's working, what's not.",
  },
  {
    title: "Scaling Enterprise Implementations",
    blurb: "Turning implementation from a cost centre into a competitive advantage — a CFO + CIO perspective.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="Marketing Hub"
        title="Subscribe to Our Newsletter"
        description="Exclusive knowledge from the executive events we run — straight to your inbox the first Tuesday of every month."
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Stay informed with our <em>weekly digest</em>
          </h2>
          <div className="w-16 h-px bg-black mx-auto mb-6" />
          <p className="text-gray-700 leading-relaxed mb-8">
            Join 10,000+ subscribers every first Tuesday of the month for exclusive insights, upcoming
            events, and speaker highlights — delivered straight to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" action="#" method="post">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@company.com"
              className="flex-1 border border-gray-300 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="rounded-full px-7 py-3 text-sm font-medium text-black hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#F7BE68" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <section className="bg-[#F4F4F4] py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}>
            Recent <em>newsletters</em>
          </h2>
          <div className="w-16 h-px bg-black mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recent.map((n) => (
              <article key={n.title} className="bg-white rounded-2xl p-8">
                <h3 className="text-xl mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                  {n.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{n.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
