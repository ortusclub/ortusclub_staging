import Link from "next/link";

const aboutCopy =
  "Through the creation and management of pitch-free executive events that focus on providing senior decision-makers with the right opportunities to share expertise and business insights, The Ortus Club provides valuable networking and knowledge-sharing opportunities for executives across the globe.";

const phones = [
  { label: "US", number: "+1 415 969 7673" },
  { label: "SG", number: "+65 31 295 117" },
  { label: "UK", number: "+44 772 3449 423" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#1a1a1a] text-white/90 mt-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Ortus */}
        <div className="lg:col-span-2">
          <h3 className="text-xs tracking-widest text-white/60 mb-4">ABOUT ORTUS</h3>
          <p className="text-sm leading-relaxed text-white/80 mb-6 max-w-md">{aboutCopy}</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.google.com/maps/place/The+Ortus+Club/@1.285317,103.845837,20z/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Singapore office →
              </a>
            </li>
            <li>
              <Link href="/ortus-careers/" className="hover:underline">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/frequently-asked-questions/" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs tracking-widest text-white/60 mb-4">CONTACT</h3>
          <div className="space-y-3 text-sm">
            <div>
              <div className="text-white/60 text-[11px] uppercase tracking-widest mb-1">Email us</div>
              <a href="mailto:info@ortusclub.com" className="hover:underline">
                info@ortusclub.com
              </a>
            </div>
            <div>
              <div className="text-white/60 text-[11px] uppercase tracking-widest mb-1">Call us</div>
              <ul className="space-y-1">
                {phones.map((p) => (
                  <li key={p.label}>
                    <span className="text-white/60 mr-2">{p.label}:</span>
                    <a href={`tel:${p.number.replace(/\s/g, "")}`} className="hover:underline">
                      {p.number}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xs tracking-widest text-white/60 mb-4">NEWSLETTER</h3>
          <p className="text-sm text-white/80 mb-4">
            Join our community for top B2B knowledge-sharing insights.
          </p>
          <form
            className="flex flex-col gap-2"
            action="/newsletter/"
            method="post"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@company.com"
              className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60"
            />
            <button
              type="submit"
              className="rounded-full px-5 py-2 text-sm font-medium text-black hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#F7BE68" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Ortus Strategy, Pte. Ltd. All rights reserved.</div>
          <Link href="/privacy-statement/" className="hover:underline">
            Privacy statement
          </Link>
        </div>
      </div>
    </footer>
  );
}
