"use client";

import { useCallback } from "react";
import { categories } from "./events-data";

export default function SportCalendarSection() {
  const handleDownload = useCallback(async () => {
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const gold = [247, 190, 104] as const;
    const dark = [17, 17, 17] as const;

    // ── Cover page ──
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

    doc.setFontSize(11);
    doc.setTextColor(180, 180, 180);
    const intro = doc.splitTextToSize(
      "Impress and delight your clients by hosting them at world-class sporting events. " +
        "Give them an experience they won't forget — the perfect ground to build and " +
        "continue lasting business relationships.",
      200
    );
    doc.text(intro, 30, 110);

    const totalEvents = categories.reduce((s, c) => s + c.events.length, 0);
    doc.setFontSize(10);
    doc.setTextColor(...gold);
    doc.text(
      `${totalEvents} events  ·  ${categories.length} sports  ·  All pricing indicative & per person`,
      30,
      140
    );

    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("The Ortus Club  ·  ortusclub.com  ·  Confidential", 30, 190);

    // ── Category pages ──
    for (const cat of categories) {
      doc.addPage("landscape");

      // Header bar
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

      // Table
      const rows = cat.events.map((e) => [
        e.name,
        e.date,
        `${e.location}, ${e.country}`,
        e.venue !== "TBD" && e.venue !== "Various" ? e.venue : "—",
        `From ${e.fromPrice} pp`,
        e.tier,
        e.notes,
      ]);

      autoTable(doc, {
        startY: 34,
        head: [["Event", "Date", "Location", "Venue", "Guide Price", "Tier", "Notes"]],
        body: rows,
        theme: "plain",
        styles: {
          fontSize: 8,
          cellPadding: 3,
          textColor: [60, 60, 60],
          lineColor: [230, 230, 230],
          lineWidth: 0.2,
        },
        headStyles: {
          fillColor: [245, 245, 245],
          textColor: [30, 30, 30],
          fontStyle: "bold",
          fontSize: 8,
        },
        alternateRowStyles: {
          fillColor: [252, 252, 252],
        },
        columnStyles: {
          0: { cellWidth: 52, fontStyle: "bold" },
          1: { cellWidth: 32 },
          2: { cellWidth: 38 },
          3: { cellWidth: 42 },
          4: { cellWidth: 28, textColor: [180, 140, 50] },
          5: { cellWidth: 22 },
          6: { cellWidth: 52, fontStyle: "italic", textColor: [130, 130, 130] },
        },
        margin: { left: 15, right: 15 },
      });

      // Footer
      const pageH = doc.internal.pageSize.getHeight();
      doc.setFontSize(7);
      doc.setTextColor(160, 160, 160);
      doc.text("The Ortus Club  ·  ortusclub.com", 15, pageH - 8);
      doc.text("All pricing is indicative and subject to availability", pageW - 15, pageH - 8, {
        align: "right",
      });
    }

    doc.save("Ortus-Sport-2026-Calendar.pdf");
  }, []);

  return (
    <section className="bg-white py-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
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
        <p className="text-neutral-500 text-base leading-relaxed mb-12 max-w-2xl mx-auto">
          View the full sporting calendar for all the events that your team can
          align themselves with. Download our comprehensive guide covering{" "}
          {categories.reduce((s, c) => s + c.events.length, 0)} events across{" "}
          {categories.length} sports — with indicative pricing, dates, and
          venues.
        </p>

        {/* PDF card */}
        <div
          className="mx-auto max-w-lg rounded-2xl overflow-hidden"
          style={{
            border: "1px solid #e5e5e5",
          }}
        >
          {/* Preview header */}
          <div
            className="px-8 py-10 text-left"
            style={{ backgroundColor: "#111" }}
          >
            <p
              className="text-sm tracking-widest mb-3 uppercase"
              style={{ color: "#F7BE68" }}
            >
              Free Download
            </p>
            <h3
              className="text-white text-2xl mb-2"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 400,
                fontStyle: "italic",
              }}
            >
              Ortus Sport 2026
            </h3>
            <p className="text-white/50 text-sm">
              Complete events calendar &middot; PDF &middot;{" "}
              {categories.length} sport categories
            </p>
          </div>

          {/* Sport icons row */}
          <div className="px-8 py-5 flex flex-wrap gap-3 justify-center" style={{ backgroundColor: "#fafafa" }}>
            {categories.slice(0, 10).map((cat) => (
              <span
                key={cat.name}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#666",
                }}
              >
                {cat.icon} {cat.name}
              </span>
            ))}
            {categories.length > 10 && (
              <span
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  backgroundColor: "#f0f0f0",
                  color: "#666",
                }}
              >
                +{categories.length - 10} more
              </span>
            )}
          </div>

          {/* Download button */}
          <div className="px-8 py-6">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: "#F7BE68", color: "#000" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Calendar PDF
            </button>
          </div>
        </div>

        {/* Subtle note */}
        <p className="text-neutral-400 text-xs mt-6">
          All pricing is indicative and subject to availability. Contact us for
          a tailored proposal.
        </p>
      </div>
    </section>
  );
}
