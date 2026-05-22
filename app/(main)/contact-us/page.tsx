import type { Metadata } from "next";
import PageHero from "../../components/PageHero";

export const metadata: Metadata = {
  title: "Contact Us — The Ortus Club",
  description:
    "Get in touch with The Ortus Club to host or attend a curated executive event. Offices in Singapore, US, and UK.",
};

const phones = [
  { label: "United States", number: "+1 415 969 7673" },
  { label: "Singapore", number: "+65 31 295 117" },
  { label: "United Kingdom", number: "+44 772 3449 423" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's start a conversation."
        description="Tell us about the executives you want to reach, the topic you want to convene around, or the event you're considering hosting. Our team will respond within one business day."
      />

      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form column — HubSpot form embed placeholder */}
          <div>
            <h2
              className="text-3xl mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
            >
              Send us a <em>message</em>
            </h2>
            <div className="w-16 h-px bg-black mb-8" />

            <form className="space-y-4" action="#" method="post">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="block text-xs tracking-widest uppercase text-gray-600 mb-2">
                    First name
                  </label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-xs tracking-widest uppercase text-gray-600 mb-2">
                    Last name
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs tracking-widest uppercase text-gray-600 mb-2">
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-xs tracking-widest uppercase text-gray-600 mb-2">
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs tracking-widest uppercase text-gray-600 mb-2">
                  How can we help?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto rounded-full px-7 py-3 text-sm font-medium text-black hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#F7BE68" }}
              >
                Send message
              </button>
              <p className="text-xs text-gray-500">
                {/* TODO: replace this form with the real HubSpot embed — needs HubSpot portal ID + form ID */}
                A team member will respond within one business day.
              </p>
            </form>
          </div>

          {/* Contact info column */}
          <div>
            <h2
              className="text-3xl mb-4"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
            >
              Reach <em>us directly</em>
            </h2>
            <div className="w-16 h-px bg-black mb-8" />

            <div className="space-y-8">
              <div>
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-2">Email</div>
                <a href="mailto:info@ortusclub.com" className="text-lg hover:underline">
                  info@ortusclub.com
                </a>
              </div>

              <div>
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-2">Phone</div>
                <ul className="space-y-2">
                  {phones.map((p) => (
                    <li key={p.label} className="flex justify-between max-w-xs">
                      <span className="text-gray-600">{p.label}</span>
                      <a href={`tel:${p.number.replace(/\s/g, "")}`} className="hover:underline">
                        {p.number}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-2">
                  Singapore HQ
                </div>
                <a
                  href="https://www.google.com/maps/place/The+Ortus+Club/@1.285317,103.845837,20z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base hover:underline"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
