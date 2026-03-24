"use client";

import { useCallback, useRef, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { categories } from "./events-data";
import type { SportCategory } from "./events-data";

/* ────────────────────────────────────────────
   Individual page components (must use forwardRef
   for react-pageflip to work)
   ──────────────────────────────────────────── */

const CoverPage = forwardRef<HTMLDivElement>(function CoverPage(_props, ref) {
  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center h-full text-center"
      style={{
        backgroundColor: "#2a2a2a",
        border: "1px solid #444",
        padding: "40px 30px",
      }}
    >
      {/* Top ornament */}
      <div className="w-12 h-px mb-4" style={{ backgroundColor: "#F7BE68" }} />
      <p
        className="text-[10px] tracking-[0.4em] uppercase mb-2"
        style={{ color: "#F7BE68" }}
      >
        Est. 2018
      </p>
      <p
        className="tracking-[0.35em] uppercase mb-6"
        style={{ color: "#F7BE68", fontSize: "10px" }}
      >
        The Ortus Club
      </p>

      {/* Divider */}
      <div className="w-20 h-px mb-8" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

      {/* Title */}
      <h2
        className="text-white mb-2"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "2.6rem",
          lineHeight: 1.1,
        }}
      >
        Sporting
      </h2>
      <h2
        className="text-white mb-8"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "2.6rem",
          lineHeight: 1.1,
        }}
      >
        Catalogue
      </h2>

      {/* Divider */}
      <div className="w-20 h-px mb-8" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

      {/* Subtitle */}
      <p
        className="text-xs tracking-[0.2em] uppercase mb-3"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        A Definitive Guide to
      </p>
      <p
        className="tracking-[0.15em] uppercase mb-8"
        style={{
          color: "#F7BE68",
          fontSize: "1.1rem",
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 600,
          letterSpacing: "0.15em",
        }}
      >
        2026 Sporting Events
      </p>

      {/* Disclaimer */}
      <div className="w-12 h-px mb-4" style={{ backgroundColor: "rgba(255,255,255,0.15)" }} />
      <p className="text-[9px] text-white/30 leading-relaxed max-w-[220px]">
        Subject to availability. Prices may vary.
      </p>
      <p className="text-[9px] text-white/20 mt-1">ortusclub.com</p>
    </div>
  );
});

const IntroPage = forwardRef<HTMLDivElement>(function IntroPage(_props, ref) {
  return (
    <div ref={ref} className="flex flex-col justify-center h-full p-10" style={{ backgroundColor: "#f5f3ef", border: "1px solid #e0ddd6" }}>
      <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "#F7BE68" }}>
        About Ortus Sport
      </p>
      <p className="text-neutral-700 text-sm leading-relaxed mb-6">
        Impress and delight your clients by hosting them at world-class sporting
        events. Give them an experience they won&apos;t forget — the perfect
        ground to build and continue lasting business relationships.
      </p>
      <p className="text-neutral-500 text-sm leading-relaxed mb-8">
        This calendar covers the full 2026 sporting season across Formula 1,
        Tennis, Golf, Football, Rugby, Cricket, and many more. All pricing is
        indicative and per person — contact us for a tailored proposal.
      </p>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span
            key={cat.name}
            className="text-[10px] px-2.5 py-1 rounded-full"
            style={{ backgroundColor: "#eee", color: "#555" }}
          >
            {cat.icon} {cat.name}
          </span>
        ))}
      </div>
    </div>
  );
});

const CategoryPage = forwardRef<HTMLDivElement, { category: SportCategory; pageNum: number }>(
  function CategoryPage({ category, pageNum }, ref) {
    return (
      <div ref={ref} className="flex flex-col h-full" style={{ backgroundColor: "#f5f3ef", border: "1px solid #e0ddd6" }}>
        {/* Header */}
        <div
          className="px-8 py-5 flex items-center justify-between shrink-0"
          style={{ backgroundColor: "#2a2a2a" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{category.icon}</span>
            <h3
              className="text-white text-xl"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 400,
                fontStyle: "italic",
              }}
            >
              {category.name}
            </h3>
          </div>
          <span className="text-xs" style={{ color: "#F7BE68" }}>
            {category.events.length} events
          </span>
        </div>

        {/* Events list */}
        <div className="flex-1 overflow-hidden px-6 py-4">
          <div className="space-y-0">
            {category.events.map((event, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2.5"
                style={{ borderBottom: "1px solid #f0f0f0" }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-neutral-800 truncate">
                    {event.name}
                  </p>
                  <p className="text-[10px] text-neutral-400 truncate">
                    {event.date} &middot; {event.location}, {event.country}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-medium" style={{ color: "#b8943a" }}>
                    {event.fromPrice}
                  </p>
                  <p className="text-[9px] text-neutral-400">{event.tier}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-2 flex justify-between shrink-0"
          style={{ borderTop: "1px solid #f0f0f0" }}
        >
          <span className="text-[9px] text-neutral-300">The Ortus Club</span>
          <span className="text-[9px] text-neutral-300">{pageNum}</span>
        </div>
      </div>
    );
  }
);

const BackCover = forwardRef<HTMLDivElement>(function BackCover(_props, ref) {
  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center h-full p-10 text-center"
      style={{ backgroundColor: "#2a2a2a", border: "1px solid #444" }}
    >
      <div className="w-16 h-px mb-6" style={{ backgroundColor: "#F7BE68" }} />
      <h3
        className="text-white text-2xl mb-3"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 400,
          fontStyle: "italic",
        }}
      >
        Get in Touch
      </h3>
      <p className="text-white/50 text-sm mb-6 max-w-xs">
        All experiences are tailored to your group. Reach out and we&apos;ll put
        together a bespoke proposal.
      </p>
      <p className="text-xs" style={{ color: "#F7BE68" }}>
        ortusclub.com
      </p>
    </div>
  );
});

/* ────────────────────────────────────────────
   Main section
   ──────────────────────────────────────────── */

export default function SportCalendarSection() {
  const bookRef = useRef<ReturnType<typeof HTMLFlipBook> | null>(null);

  const handleDownload = useCallback(async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const gold = [247, 190, 104] as const;
    const dark = [17, 17, 17] as const;

    doc.setFillColor(...dark);
    doc.rect(0, 0, pageW, doc.internal.pageSize.getHeight(), "F");
    doc.setFont("helvetica", "italic");
    doc.setFontSize(42);
    doc.setTextColor(255, 255, 255);
    doc.text("Ortus Sport", 30, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(200, 200, 200);
    doc.text("2026 Sporting Events Calendar", 30, 85);
    doc.setDrawColor(...gold);
    doc.setLineWidth(0.8);
    doc.line(30, 95, 120, 95);

    for (const cat of categories) {
      doc.addPage("landscape");
      doc.setFillColor(...dark);
      doc.rect(0, 0, pageW, 28, "F");
      doc.setFont("helvetica", "italic");
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text(`${cat.icon}  ${cat.name}`, 15, 19);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...gold);
      doc.text(`${cat.events.length} events`, pageW - 15, 19, { align: "right" });

      const rows = cat.events.map((e) => [
        e.name, e.date, `${e.location}, ${e.country}`,
        e.venue !== "TBD" && e.venue !== "Various" ? e.venue : "—",
        `From ${e.fromPrice} pp`, e.tier, e.notes,
      ]);

      autoTable(doc, {
        startY: 34,
        head: [["Event", "Date", "Location", "Venue", "Guide Price", "Tier", "Notes"]],
        body: rows,
        theme: "plain",
        styles: { fontSize: 8, cellPadding: 3, textColor: [60, 60, 60], lineColor: [230, 230, 230], lineWidth: 0.2 },
        headStyles: { fillColor: [245, 245, 245], textColor: [30, 30, 30], fontStyle: "bold", fontSize: 8 },
        alternateRowStyles: { fillColor: [252, 252, 252] },
        columnStyles: {
          0: { cellWidth: 52, fontStyle: "bold" }, 1: { cellWidth: 32 }, 2: { cellWidth: 38 },
          3: { cellWidth: 42 }, 4: { cellWidth: 28, textColor: [180, 140, 50] },
          5: { cellWidth: 22 }, 6: { cellWidth: 52, fontStyle: "italic", textColor: [130, 130, 130] },
        },
        margin: { left: 15, right: 15 },
      });

      const pageH = doc.internal.pageSize.getHeight();
      doc.setFontSize(7);
      doc.setTextColor(160, 160, 160);
      doc.text("The Ortus Club  ·  ortusclub.com", 15, pageH - 8);
      doc.text("All pricing is indicative and subject to availability", pageW - 15, pageH - 8, { align: "right" });
    }

    doc.save("Ortus-Sport-2026-Calendar.pdf");
  }, []);

  return (
    <section className="py-20 px-8" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl mb-5"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
              color: "#111",
              lineHeight: 1.2,
            }}
          >
            The 2026 <em>Sporting Calendar</em>
          </h2>
          <p className="text-neutral-500 text-base leading-relaxed max-w-2xl mx-auto">
            Browse through all the events your team can align themselves with
            this year. Flip through our catalogue or download the full PDF.
          </p>
        </div>

        {/* Flipbook with nav arrows */}
        <div className="flex items-center justify-center gap-6 mb-10">
          {/* Left arrow */}
          <button
            onClick={() => {
              const book = bookRef.current as unknown as { pageFlip: () => { flipPrev: () => void } };
              book?.pageFlip()?.flipPrev();
            }}
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
            style={{ backgroundColor: "#F7BE68" }}
            aria-label="Previous page"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Book */}
          <div className="relative">
            <div
              className="rounded-lg overflow-hidden"
              style={{
                boxShadow: "0 25px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(0,0,0,0.1)",
              }}
            >
              <HTMLFlipBook
                ref={bookRef}
                width={380}
                height={520}
                size="fixed"
                minWidth={300}
                maxWidth={400}
                minHeight={420}
                maxHeight={560}
                showCover={true}
                mobileScrollSupport={true}
                className="flipbook"
                style={{}}
                startPage={0}
                drawShadow={true}
                flippingTime={600}
                usePortrait={false}
                startZIndex={0}
                autoSize={false}
                maxShadowOpacity={0.3}
                showPageCorners={true}
                disableFlipByClick={false}
                swipeDistance={30}
                clickEventForward={true}
                useMouseEvents={true}
              >
                <CoverPage />
                <IntroPage />
                {categories.map((cat, i) => (
                  <CategoryPage key={cat.name} category={cat} pageNum={i + 3} />
                ))}
                <BackCover />
              </HTMLFlipBook>
            </div>

            {/* Page curl hint */}
            <div
              className="absolute bottom-0 right-0 pointer-events-none animate-pulse"
              style={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, transparent 50%, rgba(247,190,104,0.3) 50%)",
                borderRadius: "0 0 8px 0",
              }}
            />
          </div>

          {/* Right arrow */}
          <button
            onClick={() => {
              const book = bookRef.current as unknown as { pageFlip: () => { flipNext: () => void } };
              book?.pageFlip()?.flipNext();
            }}
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
            style={{ backgroundColor: "#F7BE68" }}
            aria-label="Next page"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Navigation hint + download */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-neutral-400 text-xs">
            Use the arrows or drag the page corners to flip &middot;{" "}
            {categories.reduce((s, c) => s + c.events.length, 0)} events across{" "}
            {categories.length} sports
          </p>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-opacity hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: "#F7BE68", color: "#000" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download Full PDF
          </button>
        </div>
      </div>
    </section>
  );
}
