"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

/* ── Curated 2026 events ── */
interface CuratedEvent {
  name: string;
  sport: string;
  date: string;
  location: string;
  country: string;
  region: string;
  tier: "Ultra-Premium" | "Premium";
  fromPrice: string;
  image: string;
  month: string;
  imgPos?: string; // custom object-position for image
  expanded?: boolean; // true = only shown after "View More"
}

const curatedEvents: CuratedEvent[] = [
  /* ── Formula 1 ── */
  { name: "Monaco Grand Prix", sport: "Formula 1", date: "5–7 Jun 2026", location: "Monte Carlo", country: "Monaco", region: "Europe", tier: "Ultra-Premium", fromPrice: "$5,000", image: "https://images.unsplash.com/photo-1752884991461-8ac432ad9266?auto=format&fit=crop&q=80&w=2000", month: "Jun" },
  { name: "British Grand Prix", sport: "Formula 1", date: "3–5 Jul 2026", location: "Silverstone", country: "UK", region: "Europe", tier: "Ultra-Premium", fromPrice: "$2,500", image: "https://hips.hearstapps.com/hmg-prod/images/race-winner-lewis-hamilton-of-great-britain-driving-the-news-photo-1626625362.jpg?crop=1.00xw:0.893xh;0,0.0203xh&resize=1400:*", month: "Jul" },
  { name: "Miami Grand Prix", sport: "Formula 1", date: "1–3 May 2026", location: "Miami Gardens", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$3,000", image: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Miami.webp", month: "May" },
  { name: "Las Vegas Grand Prix", sport: "Formula 1", date: "21 Nov 2026", location: "Las Vegas", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$4,000", image: "https://ca-times.brightspotcdn.com/dims4/default/7a65ab6/2147483647/strip/true/crop/5074x3382+0+0/resize/2000x1333!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fd2%2F56%2F5c368dff41c7872cd0784c654caa%2F1376324-sp-f1-vegas-strip-17-mjc.jpg", month: "Nov" },

  /* ── Tennis ── */
  { name: "Australian Open", sport: "Tennis", date: "12–25 Jan 2026", location: "Melbourne", country: "Australia", region: "Asia Pacific", tier: "Ultra-Premium", fromPrice: "$1,500", image: "https://www.thejewelleryeditor.com/media/images_thumbnails/filer_public_thumbnails/filer_public/77/ad/77adbe51-f2e3-4bba-b672-da3cbfd7321d/roger-federer-australian-open-2017.jpg__760x0_q75_crop-scale_subsampling-2_upscale-false.jpg", month: "Jan", imgPos: "center 10%" },
  { name: "Roland-Garros", sport: "Tennis", date: "24 May – 7 Jun 2026", location: "Paris", country: "France", region: "Europe", tier: "Ultra-Premium", fromPrice: "$2,000", image: "https://www.repstatic.it/content/nazionale/img/2022/05/21/211704945-b26cccb4-12fd-40db-b2db-1764324faa5b.jpg", month: "May" },
  { name: "Wimbledon Championships", sport: "Tennis", date: "29 Jun – 12 Jul 2026", location: "London", country: "UK", region: "Europe", tier: "Ultra-Premium", fromPrice: "$2,000", image: "https://cdn.mos.cms.futurecdn.net/KEnZEGi8VJvks7NGKogrxG-1000-80.jpg", month: "Jun" },
  { name: "US Open", sport: "Tennis", date: "31 Aug – 13 Sep 2026", location: "New York", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$2,500", image: "https://static01.nyt.com/images/2020/08/04/sports/04usopen-protocols01/04usopen-protocols01-videoSixteenByNineJumbo1600.jpg", month: "Aug" },

  /* ── Football ── */
  { name: "FIFA World Cup — Final", sport: "Football", date: "19 Jul 2026", location: "New Jersey", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$8,000", image: "https://media.cnn.com/api/v1/images/stellar/prod/221219105607-messi-crowd-world-cup-121822.jpg?q=w_3000,c_fill", month: "Jul" },
  { name: "UEFA Champions League Final", sport: "Football", date: "30 May 2026", location: "Budapest", country: "Hungary", region: "Europe", tier: "Ultra-Premium", fromPrice: "$3,500", image: "https://www.aljazeera.com/wp-content/uploads/2025/05/2025-05-31T211235Z_1348966444_UP1EL5V1MWXBJ_RTRMADP_3_SOCCER-CHAMPIONS-PSG-INT-REPORT-1748726122.jpg?resize=1920%2C1080", month: "May" },
  { name: "FIFA World Cup — Opening Match", sport: "Football", date: "11 Jun 2026", location: "Mexico City", country: "Mexico", region: "North America", tier: "Ultra-Premium", fromPrice: "$4,000", image: "https://media.cnn.com/api/v1/images/stellar/prod/221219105607-messi-crowd-world-cup-121822.jpg?q=w_3000,c_fill", month: "Jun" },

  /* ── Golf ── */
  { name: "The Masters", sport: "Golf", date: "9–12 Apr 2026", location: "Augusta", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$5,000", image: "https://975thefanatic.com/uploads/2024/04/GettyImages-2148192948.jpg", month: "Apr" },
  { name: "The Open Championship", sport: "Golf", date: "16–19 Jul 2026", location: "Royal Birkdale", country: "UK", region: "Europe", tier: "Ultra-Premium", fromPrice: "$3,000", image: "https://www.theopen.com/-/media/01---152-blog-wednesday-17/royaltroonsunset.jpg", month: "Jul" },
  { name: "Ryder Cup", sport: "Golf", date: "Sep 2026", location: "Bethpage", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$4,000", image: "https://images2.minutemediacdn.com/image/upload/c_fill,w_1920,ar_16:9,f_auto,q_auto,g_auto/MjAzNzAxMzY4MjcxNDgwNzIy/first-tee-2023-ryder-cup.jpg", month: "Sep" },
  { name: "US Open", sport: "Golf", date: "18–21 Jun 2026", location: "Shinnecock Hills", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$3,500", image: "https://res.cloudinary.com/rydercup-prod/w_1153,h_648,c_fit,q_auto,g_center,dpr_2.0,f_auto/rydercup/images/teams/united-states/First-Tee-Fans-Web-Hero.jpg", month: "Jun" },

  /* ── Basketball ── */
  { name: "NBA Finals", sport: "Basketball", date: "Jun 2026", location: "TBC", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$4,000", image: "https://assets2.cbsnewsstatic.com/hub/i/r/2024/06/18/73d44b11-879e-4299-8ff3-5815c784628f/thumbnail/1920x1227/4e99201f79e1dc936e70a8c2847ffdf3/gettyimages-2157576871.jpg", month: "Jun" },
  { name: "NBA All-Star Weekend", sport: "Basketball", date: "Feb 2026", location: "TBC", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$3,500", image: "https://assets3.cbsnewsstatic.com/hub/i/r/2024/06/18/58805c05-d3af-49a1-af25-dc1196b088f2/thumbnail/1920x1280/b08c53a105526bda5e3e02afe801acd1/gettyimages-2157538863.jpg", month: "Feb" },
  { name: "EuroLeague Final Four", sport: "Basketball", date: "May 2026", location: "TBC", country: "Germany", region: "Europe", tier: "Premium", fromPrice: "$1,500", image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1920&q=90&auto=format&fit=crop", month: "May" },
  { name: "March Madness Final Four", sport: "Basketball", date: "Apr 2026", location: "TBC", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$2,500", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=90&auto=format&fit=crop", month: "Apr" },

  /* ── Cricket ── */
  { name: "ICC Men's T20 World Cup", sport: "Cricket", date: "Feb–Mar 2026", location: "India & Sri Lanka", country: "India", region: "Asia Pacific", tier: "Ultra-Premium", fromPrice: "$1,500", image: "https://www.aljazeera.com/wp-content/uploads/2024/06/AP24161644584784-1718002256.jpg", month: "Feb" },
  { name: "The Ashes — Test Series", sport: "Cricket", date: "Various 2026", location: "England", country: "UK", region: "Europe", tier: "Ultra-Premium", fromPrice: "$2,000", image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=90&auto=format&fit=crop", month: "Jul" },
  { name: "ICC Cricket World Cup", sport: "Cricket", date: "Oct–Nov 2026", location: "TBC", country: "TBC", region: "Asia Pacific", tier: "Ultra-Premium", fromPrice: "$2,500", image: "https://www.aljazeera.com/wp-content/uploads/2023/11/AP23323600739758-1700417528.jpg", month: "Oct" },
  { name: "IPL Final", sport: "Cricket", date: "May 2026", location: "Chennai", country: "India", region: "Asia Pacific", tier: "Premium", fromPrice: "$1,800", image: "https://www.aljazeera.com/wp-content/uploads/2024/06/2024-06-09T175219Z_77441417_UP1EK691DN3CZ_RTRMADP_3_CRICKET-T20-IND-PAK-1718001821.jpg", month: "May" },

  /* ── Expanded sports (hidden by default) ── */

  /* ── Rugby ── */
  { name: "Six Nations Championship", sport: "Rugby", date: "7 Feb – 21 Mar 2026", location: "Various", country: "UK", region: "Europe", tier: "Ultra-Premium", fromPrice: "$1,500", image: "https://images.unsplash.com/photo-1693073410934-5e45e31a6b5c?w=1920&q=90&auto=format&fit=crop", month: "Feb", expanded: true },
  { name: "Rugby World Cup Final", sport: "Rugby", date: "Nov 2027", location: "TBC", country: "Australia", region: "Asia Pacific", tier: "Ultra-Premium", fromPrice: "$5,000", image: "https://e0.365dm.com/23/09/2048x1152/skysports-ryder-cup-golf-guardians-of-the-ryder_6302348.jpg?20230929150954", month: "Nov", expanded: true },
  { name: "Autumn Nations Series", sport: "Rugby", date: "Nov 2026", location: "Twickenham", country: "UK", region: "Europe", tier: "Premium", fromPrice: "$1,200", image: "https://images.unsplash.com/photo-1693073410934-5e45e31a6b5c?w=1920&q=90&auto=format&fit=crop", month: "Nov", expanded: true },
  { name: "Premiership Final", sport: "Rugby", date: "Jun 2026", location: "Twickenham", country: "UK", region: "Europe", tier: "Premium", fromPrice: "$1,000", image: "https://e0.365dm.com/24/04/2048x1152/skysports-i-am-maximus-grand-national_6520183.jpg?20240413163559", month: "Jun", expanded: true },

  /* ── Cycling ── */
  { name: "Tour de France", sport: "Cycling", date: "4–26 Jul 2026", location: "France", country: "France", region: "Europe", tier: "Ultra-Premium", fromPrice: "$2,500", image: "https://a.storyblok.com/f/135147/8013x5031/52bd775e39/24-07-08_2024-tour-de-france-gallery-week-one_culture-6.jpg", month: "Jul", expanded: true },
  { name: "Giro d'Italia", sport: "Cycling", date: "May 2026", location: "Italy", country: "Italy", region: "Europe", tier: "Premium", fromPrice: "$1,500", image: "https://cdn-jupiter.metropolis.co.uk/wp-content/uploads/sites/9/2024/07/zw-tour-de-france-2024-3-scaled.webp", month: "May", expanded: true },
  { name: "Vuelta a España", sport: "Cycling", date: "Aug–Sep 2026", location: "Spain", country: "Spain", region: "Europe", tier: "Premium", fromPrice: "$1,500", image: "https://cdn-jupiter.metropolis.co.uk/wp-content/uploads/sites/9/2024/09/CAuldPhoto-2024-LaVuelta-Stage6-6306-min-1-scaled.webp", month: "Aug", expanded: true },
  { name: "Paris-Roubaix", sport: "Cycling", date: "Apr 2026", location: "Roubaix", country: "France", region: "Europe", tier: "Premium", fromPrice: "$1,200", image: "https://cdn-jupiter.metropolis.co.uk/wp-content/uploads/sites/9/2023/04/PLP_Roubaix_0198-scaled-e1734018684421.webp", month: "Apr", expanded: true },

  /* ── Horse Racing ── */
  { name: "The Kentucky Derby", sport: "Horse Racing", date: "2 May 2026", location: "Louisville", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$3,000", image: "https://assets1.cbsnewsstatic.com/hub/i/r/2024/04/26/6fe8bb67-fda6-433e-9093-32d922770193/thumbnail/1920x1080/9ccf6942635d082978c6ed76a3fd9835/149th-kentucky-derby-getty-1488421340.jpg", month: "May", expanded: true },
  { name: "Royal Ascot", sport: "Horse Racing", date: "16–20 Jun 2026", location: "Ascot", country: "UK", region: "Europe", tier: "Ultra-Premium", fromPrice: "$3,500", image: "https://images.unsplash.com/photo-1631746556116-7559088141d6?w=1920&q=90&auto=format&fit=crop", month: "Jun", expanded: true },
  { name: "Melbourne Cup", sport: "Horse Racing", date: "3 Nov 2026", location: "Flemington", country: "Australia", region: "Asia Pacific", tier: "Ultra-Premium", fromPrice: "$2,500", image: "https://images.thenightly.com.au/publication/C-20568706/7546ef520810eaa9ecab08bb24f5e19f8e36a9ae-16x9-x0y0w4333h2437.webp", month: "Nov", expanded: true },
  { name: "The Grand National", sport: "Horse Racing", date: "11 Apr 2026", location: "Aintree", country: "UK", region: "Europe", tier: "Premium", fromPrice: "$1,500", image: "https://e0.365dm.com/24/04/2048x1152/skysports-i-am-maximus-grand-national_6520183.jpg?20240413163559", month: "Apr", expanded: true },

  /* ── Sailing ── */
  { name: "America's Cup", sport: "Sailing", date: "Oct 2026", location: "Barcelona", country: "Spain", region: "Europe", tier: "Ultra-Premium", fromPrice: "$4,000", image: "https://cdn.boatinternational.com/convert/bi_prd/bi/library_images/royvXCOoR6DTLUvAAK2Q_Emirates-Team-New-Zealand-racing-in-the-35th-Americas-cup-credit-acea-sander-van-der-borch.jpg/r[width]=1920/royvXCOoR6DTLUvAAK2Q_Emirates-Team-New-Zealand-racing-in-the-35th-Americas-cup-credit-acea-sander-van-der-borch.jpg", month: "Oct", expanded: true },
  { name: "Rolex Sydney Hobart", sport: "Sailing", date: "26 Dec 2026", location: "Sydney", country: "Australia", region: "Asia Pacific", tier: "Premium", fromPrice: "$2,000", image: "https://images.unsplash.com/photo-1534296264129-b318f8140c27?w=1920&q=90&auto=format&fit=crop", month: "Dec", expanded: true },

  /* ── Boxing ── */
  { name: "World Heavyweight Championship", sport: "Boxing", date: "Mar 2026", location: "Las Vegas", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$5,000", image: "https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=1920&q=90&auto=format&fit=crop", month: "Mar", expanded: true },
  { name: "Super Middleweight Unification", sport: "Boxing", date: "Sep 2026", location: "London", country: "UK", region: "Europe", tier: "Ultra-Premium", fromPrice: "$3,500", image: "https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=1920&q=90&auto=format&fit=crop", month: "Sep", expanded: true },

  /* ── MMA ── */
  { name: "UFC 300+", sport: "MMA", date: "Jul 2026", location: "Las Vegas", country: "USA", region: "North America", tier: "Ultra-Premium", fromPrice: "$4,000", image: "https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=1920&q=90&auto=format&fit=crop", month: "Jul", expanded: true },
  { name: "UFC Fight Night — London", sport: "MMA", date: "Mar 2026", location: "London", country: "UK", region: "Europe", tier: "Premium", fromPrice: "$2,000", image: "https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=1920&q=90&auto=format&fit=crop", month: "Mar", expanded: true },
];

/* Top 6 sports shown initially */
const topSports = ["Formula 1", "Tennis", "Football", "Golf", "Basketball", "Cricket"];
const moreSports = ["Rugby", "Cycling", "Horse Racing", "Sailing", "Boxing", "MMA"];

const regions = ["All Regions", "Europe", "North America", "Asia Pacific"];
const months = ["Any Date", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* ── "More" dropdown rendered via portal to escape border-radius clipping ── */
function MoreDropdown({ moreOpen, setMoreOpen, isMoreSportActive, activeSport, setActiveSport, moreSports: sports, getCount }: {
  moreOpen: boolean; setMoreOpen: (v: boolean) => void; isMoreSportActive: boolean;
  activeSport: string; setActiveSport: (v: string) => void; moreSports: string[]; getCount: (s: string) => number;
}) {
  const btnRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const updatePos = useCallback(() => {
    if (btnRef.current && moreOpen) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.left + rect.width / 2 });
    }
  }, [moreOpen]);

  useEffect(() => { updatePos(); }, [updatePos]);

  useEffect(() => {
    if (!moreOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (btnRef.current?.contains(e.target as Node) || dropRef.current?.contains(e.target as Node)) return;
      setMoreOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [moreOpen, setMoreOpen]);

  return (
    <div ref={btnRef} style={{ position: "relative", flex: "1 0 auto", minWidth: "80px" }}>
      <button
        onClick={() => setMoreOpen(!moreOpen)}
        style={{
          width: "100%", padding: "18px 14px", textAlign: "center",
          cursor: "pointer", background: "transparent", border: "none",
          borderBottom: isMoreSportActive ? "2px solid #F7BE68" : "2px solid transparent",
          transition: "all 0.3s",
        }}
      >
        <div style={{
          fontFamily: "var(--font-cormorant), serif", fontSize: "0.92rem",
          color: isMoreSportActive || moreOpen ? "#fff" : "rgba(255,255,255,0.35)",
          transition: "color 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
        }}>
          {isMoreSportActive ? activeSport : "More"}
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: moreOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
            <path d="M1 1l4 4 4-4" stroke={isMoreSportActive || moreOpen ? "#F7BE68" : "rgba(255,255,255,0.3)"} strokeWidth="1.2" />
          </svg>
        </div>
        <div style={{ fontSize: "0.5rem", color: isMoreSportActive ? "rgba(247,190,104,0.5)" : "rgba(255,255,255,0.12)", marginTop: "3px", letterSpacing: "0.08em" }}>
          {sports.reduce((sum, s) => sum + getCount(s), 0)}
        </div>
      </button>

      {moreOpen && pos && typeof document !== "undefined" && createPortal(
        <div
          ref={dropRef}
          style={{
            position: "fixed", top: pos.top, left: pos.left, transform: "translateX(-50%)",
            background: "#242724", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px", padding: "8px 0", minWidth: "180px",
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)", zIndex: 9999,
          }}
        >
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => { setActiveSport(sport); setMoreOpen(false); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "12px 20px", background: "transparent", border: "none",
                cursor: "pointer", transition: "background 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <span style={{
                fontFamily: "var(--font-cormorant), serif", fontSize: "0.9rem",
                color: activeSport === sport ? "#F7BE68" : "rgba(255,255,255,0.6)",
              }}>
                {sport}
              </span>
              <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>
                {getCount(sport)}
              </span>
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
}

export default function EventsBrowser() {
  const [activeSport, setActiveSport] = useState("All");
  const [region, setRegion] = useState("All Regions");
  const [dateFilter, setDateFilter] = useState("Any Date");
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreSportActive = moreSports.includes(activeSport);

  const filtered = useMemo(() => {
    let events = curatedEvents;

    // Sport filter
    if (activeSport !== "All") {
      events = events.filter((e) => e.sport === activeSport);
    } else {
      // "All" shows top sports + any active "more" sport events
      // Always show top sport events; show expanded only if a specific more-sport is selected
      events = events.filter((e) => !e.expanded);
    }

    if (region !== "All Regions") events = events.filter((e) => e.region === region);
    if (dateFilter !== "Any Date") events = events.filter((e) => e.month === dateFilter);

    return events;
  }, [activeSport, region, dateFilter]);

  const getCount = (sport: string) => {
    if (sport === "All") return curatedEvents.filter((e) => !e.expanded).length;
    return curatedEvents.filter((e) => e.sport === sport).length;
  };

  return (
    <section style={{ background: "#1a1d1a", padding: "80px 24px", color: "#f0ece4" }}>
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        {/* Header */}
        <div className="text-center mb-9">
          <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "#F7BE68" }}>
            Upcoming
          </p>
          <h2
            className="text-4xl mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400, color: "#fff" }}
          >
            Browse <em>Sporting Events</em>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.4)" }} />
            <span className="block w-1.5 h-1.5 rounded-full" style={{ background: "#F7BE68" }} />
            <span className="block h-px w-12" style={{ background: "rgba(247,190,104,0.4)" }} />
          </div>
        </div>

        {/* Filter bar */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "14px",
            marginBottom: "40px",
            overflow: "visible",
          }}
        >
          {/* Sport tabs */}
          <div style={{ display: "flex", flex: 1, borderRight: "1px solid rgba(255,255,255,0.05)", overflow: "visible" }}>
            {/* All tab */}
            <button
              onClick={() => { setActiveSport("All"); setMoreOpen(false); }}
              style={{
                flex: "1 0 auto", minWidth: "80px", padding: "18px 14px", textAlign: "center",
                cursor: "pointer", background: "transparent", border: "none",
                borderBottom: activeSport === "All" ? "2px solid #F7BE68" : "2px solid transparent",
                borderRight: "1px solid rgba(255,255,255,0.03)", transition: "all 0.3s",
              }}
            >
              <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.92rem", color: activeSport === "All" ? "#fff" : "rgba(255,255,255,0.35)", transition: "color 0.3s" }}>All</div>
              <div style={{ fontSize: "0.5rem", color: activeSport === "All" ? "rgba(247,190,104,0.5)" : "rgba(255,255,255,0.12)", marginTop: "3px", letterSpacing: "0.08em" }}>{getCount("All")}</div>
            </button>

            {/* Top 6 sport tabs */}
            {topSports.map((sport) => {
              const isActive = activeSport === sport;
              return (
                <button
                  key={sport}
                  onClick={() => { setActiveSport(sport); setMoreOpen(false); }}
                  style={{
                    flex: "1 0 auto", minWidth: "80px", padding: "18px 14px", textAlign: "center",
                    cursor: "pointer", background: "transparent", border: "none",
                    borderBottom: isActive ? "2px solid #F7BE68" : "2px solid transparent",
                    borderRight: "1px solid rgba(255,255,255,0.03)", transition: "all 0.3s",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "0.92rem", color: isActive ? "#fff" : "rgba(255,255,255,0.35)", transition: "color 0.3s" }}>{sport}</div>
                  <div style={{ fontSize: "0.5rem", color: isActive ? "rgba(247,190,104,0.5)" : "rgba(255,255,255,0.12)", marginTop: "3px", letterSpacing: "0.08em" }}>{getCount(sport)}</div>
                </button>
              );
            })}

            {/* "More" dropdown tab */}
            <MoreDropdown
              moreOpen={moreOpen}
              setMoreOpen={setMoreOpen}
              isMoreSportActive={isMoreSportActive}
              activeSport={activeSport}
              setActiveSport={setActiveSport}
              moreSports={moreSports}
              getCount={getCount}
            />
          </div>

          {/* Dropdowns */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ padding: "16px 20px", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
              <label style={{ display: "block", fontSize: "0.48rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)", marginBottom: "5px" }}>Region</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", fontFamily: "var(--font-cormorant), serif", cursor: "pointer", outline: "none", appearance: "none" as const, paddingRight: "16px", backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='5' viewBox='0 0 8 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l3 3 3-3' stroke='%23F7BE68' stroke-width='1'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right center" }}
              >
                {regions.map((r) => <option key={r} style={{ background: "#1a1d1a" }}>{r}</option>)}
              </select>
            </div>
            <div style={{ padding: "16px 20px", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
              <label style={{ display: "block", fontSize: "0.48rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.2)", marginBottom: "5px" }}>Date</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", fontFamily: "var(--font-cormorant), serif", cursor: "pointer", outline: "none", appearance: "none" as const, paddingRight: "16px", backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='5' viewBox='0 0 8 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l3 3 3-3' stroke='%23F7BE68' stroke-width='1'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right center" }}
              >
                {months.map((m) => <option key={m} style={{ background: "#1a1d1a" }}>{m === "Any Date" ? m : `${m} 2026`}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: "0.88rem", color: "rgba(255,255,255,0.25)", marginBottom: "24px" }}>
          Showing {filtered.length} event{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Event cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "40px" }}>
          {filtered.map((ev, i) => (
            <div
              key={`${ev.name}-${i}`}
              style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "16px", overflow: "hidden",
                transition: "border-color 0.4s, transform 0.4s, box-shadow 0.4s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(247,190,104,0.15)"; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 12px 36px rgba(0,0,0,0.2)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.05)"; el.style.transform = "none"; el.style.boxShadow = "none"; }}
            >
              {/* Image */}
              <div style={{ height: "180px", position: "relative", overflow: "hidden" }}>
                <img src={ev.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", objectPosition: ev.imgPos || "center center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,29,26,1) 0%, rgba(26,29,26,0.2) 50%, transparent 100%)" }} />
                <div style={{ position: "absolute", top: "14px", left: "14px", right: "14px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{
                    fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "5px 12px", borderRadius: "999px", backdropFilter: "blur(12px)",
                    ...(ev.tier === "Ultra-Premium"
                      ? { background: "rgba(247,190,104,0.15)", color: "#F7BE68", border: "1px solid rgba(247,190,104,0.2)" }
                      : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }),
                  }}>{ev.tier}</span>
                  <span style={{ fontSize: "0.48rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "4px 10px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)", backdropFilter: "blur(12px)" }}>{ev.sport}</span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "20px 24px 24px" }}>
                <div style={{ fontSize: "0.58rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: "8px" }}>{ev.sport}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.35rem", color: "#fff", fontWeight: 400, marginBottom: "14px", lineHeight: 1.2 }}>{ev.name}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3 }}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{ev.date}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{ev.location}, {ev.country}</span>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.05rem", color: "#F7BE68" }}>From {ev.fromPrice}</span>
                  <a href="#" style={{ padding: "9px 22px", borderRadius: "999px", border: "1px solid rgba(247,190,104,0.2)", background: "transparent", color: "#F7BE68", fontSize: "0.68rem", letterSpacing: "0.06em", textDecoration: "none", transition: "all 0.3s" }}>Enquire</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center" style={{ padding: "60px 0", color: "rgba(255,255,255,0.3)" }}>
            <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.2rem", fontStyle: "italic" }}>
              No events match your filters. Try adjusting your selection.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}
