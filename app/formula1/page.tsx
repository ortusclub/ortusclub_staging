"use client";

import Image from "next/image";

/* ── Top 4 Marquee Events ── */
const majorEvents = [
  {
    name: "Miami Grand Prix",
    date: "May 1–3, 2026",
    location: "Miami Gardens, USA",
    fromPrice: "$3,000",
    image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Miami.webp",
  },
  {
    name: "Monaco Grand Prix",
    date: "June 5–7, 2026",
    location: "Monte Carlo, Monaco",
    fromPrice: "$5,000",
    image: "https://images.unsplash.com/photo-1752884991461-8ac432ad9266?auto=format&fit=crop&q=80&w=2000",
  },
  {
    name: "British Grand Prix",
    date: "July 3–5, 2026",
    location: "Silverstone, UK",
    fromPrice: "$2,500",
    image: "https://hips.hearstapps.com/hmg-prod/images/race-winner-lewis-hamilton-of-great-britain-driving-the-news-photo-1626625362.jpg?crop=1.00xw:0.893xh;0,0.0203xh&resize=1400:*",
  },
  {
    name: "Las Vegas Grand Prix",
    date: "November 21, 2026",
    location: "Las Vegas, USA",
    fromPrice: "$4,000",
    image: "https://ca-times.brightspotcdn.com/dims4/default/7a65ab6/2147483647/strip/true/crop/5074x3382+0+0/resize/2000x1333!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fd2%2F56%2F5c368dff41c7872cd0784c654caa%2F1376324-sp-f1-vegas-strip-17-mjc.jpg",
  },
];

/* ── Full 2026 Calendar ── */
const calendar = [
  { round: 1, gp: "Australian", date: "Mar 6–8", location: "Melbourne" },
  { round: 2, gp: "Chinese", date: "Mar 13–15", location: "Shanghai" },
  { round: 3, gp: "Japanese", date: "Mar 27–29", location: "Suzuka" },
  { round: 4, gp: "Bahrain", date: "Apr 10–12", location: "Sakhir" },
  { round: 5, gp: "Saudi Arabian", date: "Apr 17–19", location: "Jeddah" },
  { round: 6, gp: "Miami", date: "May 1–3", location: "Miami Gardens" },
  { round: 7, gp: "Canadian", date: "May 22–24", location: "Montreal" },
  { round: 8, gp: "Monaco", date: "Jun 5–7", location: "Monte Carlo" },
  { round: 9, gp: "Spanish", date: "Jun 12–14", location: "Barcelona" },
  { round: 10, gp: "Austrian", date: "Jun 26–28", location: "Spielberg" },
  { round: 11, gp: "British", date: "Jul 3–5", location: "Silverstone" },
  { round: 12, gp: "Belgian", date: "Jul 17–19", location: "Spa" },
  { round: 13, gp: "Hungarian", date: "Jul 24–26", location: "Budapest" },
  { round: 14, gp: "Dutch", date: "Aug 21–23", location: "Zandvoort" },
  { round: 15, gp: "Italian", date: "Sep 4–6", location: "Monza" },
  { round: 16, gp: "Madrid", date: "Sep 11–13", location: "Madrid" },
  { round: 17, gp: "Azerbaijan", date: "Sep 25–27", location: "Baku" },
  { round: 18, gp: "Singapore", date: "Oct 9–11", location: "Marina Bay" },
  { round: 19, gp: "United States", date: "Oct 23–25", location: "Austin" },
  { round: 20, gp: "Mexican", date: "Oct 30–Nov 1", location: "Mexico City" },
  { round: 21, gp: "Brazilian", date: "Nov 6–8", location: "Interlagos" },
  { round: 22, gp: "Las Vegas", date: "Nov 19–21", location: "Las Vegas" },
  { round: 23, gp: "Qatar", date: "Nov 27–29", location: "Lusail" },
  { round: 24, gp: "Abu Dhabi", date: "Dec 4–6", location: "Yas Marina" },
];

export default function F1LandingPage() {
  return (
    <main>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-6">
          <a href="/">
            <Image
              src="https://www.ortusclub.com/wp-content/uploads/2021/04/image-1.png"
              alt="The Ortus Club"
              width={100}
              height={32}
              style={{ objectFit: "contain" }}
            />
          </a>
          <span style={{ color: "rgba(247,190,104,0.4)", fontSize: "0.7rem", letterSpacing: "0.2em" }}>/</span>
          <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1rem", color: "#F7BE68", fontStyle: "italic" }}>Formula 1</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="/sport" className="text-white/60 text-sm tracking-wider hover:text-white transition-colors">ALL SPORTS</a>
          <a href="#events" className="text-white/60 text-sm tracking-wider hover:text-white transition-colors">EVENTS</a>
          <a href="#calendar" className="text-white/60 text-sm tracking-wider hover:text-white transition-colors">CALENDAR</a>
          <a href="#" className="text-sm tracking-wider border rounded-full px-5 py-2 transition-colors" style={{ color: "#F7BE68", borderColor: "rgba(247,190,104,0.3)" }}>
            ENQUIRE
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-[85vh] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1752884991461-8ac432ad9266?auto=format&fit=crop&q=80&w=2000"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #0a0c0a 0%, rgba(10,12,10,0.6) 40%, rgba(10,12,10,0.3) 100%)" }} />
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-8 pb-16">
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "#F7BE68", marginBottom: "16px", textTransform: "uppercase" }}>
            Ortus Club Presents
          </p>
          <h1 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "5rem", fontWeight: 300, color: "#fff", lineHeight: 1, marginBottom: "16px" }}>
            Formula <em>1</em>
          </h1>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.3rem", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.5)", maxWidth: "520px", lineHeight: 1.6, marginBottom: "32px" }}>
            Experience the pinnacle of motorsport from the world&apos;s most exclusive vantage points. Paddock Club suites, grid walks, and C-suite networking &mdash; all in one weekend.
          </p>
          <div className="flex gap-4">
            <a href="#events" className="px-8 py-3.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: "#F7BE68", color: "#0a0c0a" }}>
              View Experiences
            </a>
            <a href="#calendar" className="px-8 py-3.5 rounded-full text-sm border transition-colors hover:bg-white hover:text-black" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>
              2026 Calendar
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ background: "#0a0c0a", borderTop: "1px solid rgba(247,190,104,0.08)", borderBottom: "1px solid rgba(247,190,104,0.08)" }}>
        <div className="max-w-[1300px] mx-auto grid grid-cols-4">
          {[
            { num: "24", label: "Race Weekends" },
            { num: "4", label: "Ortus Experiences" },
            { num: "21", label: "Countries" },
            { num: "$2.5K+", label: "From Per Person" },
          ].map((s, i) => (
            <div key={i} className="text-center py-8" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2.2rem", fontWeight: 300, color: "#F7BE68", lineHeight: 1, marginBottom: "4px" }}>
                {s.num}
              </div>
              <div style={{ fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAJOR EVENTS ── */}
      <section id="events" style={{ background: "#0f110f", padding: "80px 24px" }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="text-center mb-14">
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "#F7BE68", marginBottom: "12px", textTransform: "uppercase" }}>
              Hospitality Experiences
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3rem", fontWeight: 400, color: "#fff" }}>
              Upcoming <em>Grand Prix</em>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
              <span className="block w-1.5 h-1.5 rounded-full" style={{ background: "#F7BE68" }} />
              <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {majorEvents.map((event) => (
              <div
                key={event.name}
                className="group cursor-pointer overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "16px",
                  transition: "border-color 0.4s, transform 0.4s, box-shadow 0.4s",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(247,190,104,0.15)"; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.3)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.05)"; el.style.transform = "none"; el.style.boxShadow = "none"; }}
              >
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={event.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,17,15,1) 0%, rgba(15,17,15,0.2) 50%, transparent 100%)" }} />
                  <div className="absolute top-3 left-3">
                    <span style={{ fontSize: "0.48rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 12px", borderRadius: "999px", background: "rgba(247,190,104,0.15)", color: "#F7BE68", border: "1px solid rgba(247,190,104,0.2)", backdropFilter: "blur(12px)" }}>
                      Ultra-Premium
                    </span>
                  </div>
                </div>

                <div className="p-5 pb-6">
                  <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.4rem", color: "#fff", fontWeight: 400, marginBottom: "12px", lineHeight: 1.2 }}>
                    {event.name}
                  </h3>
                  <div className="flex flex-col gap-1.5 mb-5">
                    <div className="flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3, color: "#fff" }}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3, color: "#fff" }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                      <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>{event.location}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.05rem", color: "#F7BE68" }}>From {event.fromPrice}</span>
                    <a href="#" style={{ padding: "8px 20px", borderRadius: "999px", border: "1px solid rgba(247,190,104,0.2)", color: "#F7BE68", fontSize: "0.65rem", letterSpacing: "0.06em", textDecoration: "none", transition: "all 0.3s" }}>
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section style={{ background: "#f7f6f4", padding: "80px 24px" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "2.8rem", fontWeight: 400, color: "#1a1a1a" }}>
              The <em>Paddock Club</em> Experience
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="block h-px w-12" style={{ background: "rgba(197,162,85,0.35)" }} />
              <span className="block w-1.5 h-1.5" style={{ background: "#C5A255", transform: "rotate(45deg)", opacity: 0.5 }} />
              <span className="block h-px w-12" style={{ background: "rgba(197,162,85,0.35)" }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A255" strokeWidth="1.2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg>
                ),
                title: "Paddock Club Suite",
                desc: "Private hospitality suite above the pit lane with panoramic views of the start/finish straight, pit stops, and podium ceremony.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A255" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                ),
                title: "C-Suite Networking",
                desc: "Curated guest lists of senior decision-makers. Every attendee is personally vetted to ensure meaningful, high-level conversations.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C5A255" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                ),
                title: "Grid Walk & Pit Access",
                desc: "Walk the starting grid before the race, visit team garages, and get behind-the-scenes access that money alone cannot buy.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center px-6 py-10"
                style={{ background: "#fff", borderRadius: "14px", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div className="flex justify-center mb-5">{item.icon}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.3rem", fontWeight: 400, fontStyle: "italic", color: "#1a1a1a", marginBottom: "12px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEASON CALENDAR ── */}
      <section id="calendar" style={{ background: "#0a0c0a", padding: "80px 24px" }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "#F7BE68", marginBottom: "12px", textTransform: "uppercase" }}>
              All 24 Rounds
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3rem", fontWeight: 400, color: "#fff" }}>
              2026 Season <em>Calendar</em>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
              <span className="block w-1.5 h-1.5 rounded-full" style={{ background: "#F7BE68" }} />
              <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.3)" }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-0">
            {calendar.map((race) => {
              const isOrtus = [6, 8, 11, 22].includes(race.round);
              return (
                <div
                  key={race.round}
                  className="flex justify-between items-center py-4 px-3 transition-colors"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    cursor: isOrtus ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div className="flex items-center gap-4">
                    <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: isOrtus ? "#F7BE68" : "rgba(255,255,255,0.15)", minWidth: "36px" }}>
                      R{race.round.toString().padStart(2, "0")}
                    </span>
                    <div>
                      <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.95rem", color: isOrtus ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: isOrtus ? 500 : 400 }}>
                        {race.gp} Grand Prix
                      </span>
                      {isOrtus && (
                        <span style={{ fontSize: "0.45rem", letterSpacing: "0.1em", marginLeft: "8px", padding: "2px 8px", borderRadius: "999px", background: "rgba(247,190,104,0.1)", color: "#F7BE68", border: "1px solid rgba(247,190,104,0.15)", verticalAlign: "middle" }}>
                          ORTUS
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>{race.location}</span>
                    <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", minWidth: "72px", textAlign: "right" }}>{race.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#484D49", padding: "80px 24px" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "3rem", fontWeight: 400, color: "#fff", marginBottom: "20px" }}>
            Secure Your <em>Grid Position</em>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "36px" }}>
            Availability is strictly limited. Whether you&apos;re hosting clients or attending as a guest, contact us to reserve your place at the most exclusive motorsport events of 2026.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#" className="px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#F7BE68", color: "#0a0c0a" }}>
              Request to Join
            </a>
            <a href="/sport" className="px-8 py-3.5 rounded-full text-white text-sm border border-white hover:bg-white hover:text-black transition-colors">
              Back to All Sports
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <p style={{ textAlign: "center", color: "#484f58", padding: "24px 0", fontSize: "0.8rem", background: "#0a0c0a" }}>
        Ortus Club &copy; 2026
      </p>
    </main>
  );
}
