"use client";

import { useRef, useState, useCallback, forwardRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

/* ── Editorial interstitial content ── */
const editorialPages = [
  {
    type: "quote" as const,
    quote: "Where the world's finest sport meets the art of meaningful connection.",
    attribution: "The Ortus Club Philosophy",
    accent: "Since 2012",
  },
  {
    type: "statement" as const,
    headline: "The Spirit of the Game",
    body: "Every great partnership begins with a shared moment. We believe the theatre of world-class sport provides the most powerful backdrop for forging lasting business relationships.",
    footnote: "Curated for the C-Suite",
  },
  {
    type: "quote" as const,
    quote: "Not just hospitality — an invitation into a world where sport, culture, and leadership converge.",
    attribution: "Our Promise",
    accent: "100+ Events Annually",
  },
  {
    type: "statement" as const,
    headline: "Beyond the Ordinary",
    body: "From the Paddock Club at Monaco to Centre Court at Wimbledon, from the first tee at Augusta to courtside at the NBA Finals — every experience is designed to be extraordinary.",
    footnote: "Across 30+ Countries",
  },
];

/* Interleave: image pages with editorial pages inserted after certain positions */
type PageDef =
  | { kind: "image"; index: number }
  | { kind: "editorial"; data: (typeof editorialPages)[number] };

function buildPageSequence(): PageDef[] {
  const IMAGE_COUNT = 11;
  const pages: PageDef[] = [];
  let editIdx = 0;

  for (let i = 0; i < IMAGE_COUNT; i++) {
    pages.push({ kind: "image", index: i });
    // Insert an editorial page after pages 1, 3, 6, 9 (0-indexed)
    if ((i === 1 || i === 3 || i === 6 || i === 9) && editIdx < editorialPages.length) {
      pages.push({ kind: "editorial", data: editorialPages[editIdx] });
      editIdx++;
    }
  }
  return pages;
}

const PAGE_SEQUENCE = buildPageSequence();
const TOTAL_PAGES = PAGE_SEQUENCE.length;

/* ── Image page component ── */
const ImagePage = forwardRef<HTMLDivElement, { number: number }>(
  function ImagePage({ number }, ref) {
    return (
      <div ref={ref} className="page-content">
        <img
          src={`/catalogue-pages/page-${number}.png`}
          alt={`Catalogue page ${number + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    );
  }
);

/* ── Editorial page component ── */
const EditorialPage = forwardRef<
  HTMLDivElement,
  { data: (typeof editorialPages)[number] }
>(function EditorialPage({ data }, ref) {
  return (
    <div ref={ref} className="page-content editorial-page">
      {data.type === "quote" ? (
        <div className="editorial-quote-layout">
          <div className="editorial-accent-top">{data.accent}</div>
          <div className="editorial-ornament">
            <span className="ornament-line" />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C5A255"
              strokeWidth="1"
            >
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <span className="ornament-line" />
          </div>
          <blockquote className="editorial-quote">&ldquo;{data.quote}&rdquo;</blockquote>
          <div className="editorial-attribution">&mdash; {data.attribution}</div>
          <div className="editorial-ornament bottom">
            <span className="ornament-line" />
            <span className="ornament-diamond" />
            <span className="ornament-line" />
          </div>
        </div>
      ) : (
        <div className="editorial-statement-layout">
          <div className="editorial-accent-top">{data.footnote}</div>
          <div className="editorial-ornament">
            <span className="ornament-line" />
            <span className="ornament-diamond" />
            <span className="ornament-line" />
          </div>
          <h3 className="editorial-headline">{data.headline}</h3>
          <p className="editorial-body">{data.body}</p>
          <div className="editorial-ornament bottom">
            <span className="ornament-line" />
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C5A255"
              strokeWidth="1"
            >
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <span className="ornament-line" />
          </div>
        </div>
      )}
    </div>
  );
});

/* ── Generic page wrapper ── */
const FlipPage = forwardRef<HTMLDivElement, { def: PageDef }>(
  function FlipPage({ def }, ref) {
    if (def.kind === "image") {
      return <ImagePage ref={ref} number={def.index} />;
    }
    return <EditorialPage ref={ref} data={def.data} />;
  }
);

export default function CatalogueBook() {
  const bookRef = useRef<any>(null);
  const lightboxBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const onChangeState = useCallback((e: any) => {
    setIsFlipping(e.data === "flipping");
  }, []);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage >= TOTAL_PAGES - 1;

  const activeRef = isExpanded ? lightboxBookRef : bookRef;

  /* Lock body scroll when lightbox is open */
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  const controls = (
    <div className="catalogue-controls">
      <button
        onClick={() => activeRef.current?.pageFlip()?.flipPrev()}
        className="catalogue-nav-btn"
        aria-label="Previous page"
        disabled={isFirstPage}
        style={{ opacity: isFirstPage ? 0.3 : 1 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="catalogue-page-indicator">
        <div className="page-indicator-track">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <span
              key={i}
              className={`page-indicator-dot${i === currentPage ? " active" : ""}`}
            />
          ))}
        </div>
        <span className="page-indicator-text">
          {currentPage + 1} of {TOTAL_PAGES}
        </span>
      </div>

      <button
        onClick={() => activeRef.current?.pageFlip()?.flipNext()}
        className="catalogue-nav-btn"
        aria-label="Next page"
        disabled={isLastPage}
        style={{ opacity: isLastPage ? 0.3 : 1 }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );

  return (
    <>
      <div className="catalogue-section-inner">
        {/* Decorative corner flourishes */}
        <div className="catalogue-frame">
          <span className="frame-corner frame-tl" />
          <span className="frame-corner frame-tr" />
          <span className="frame-corner frame-bl" />
          <span className="frame-corner frame-br" />
        </div>

        {/* Book — inline version */}
        <div className="catalogue-book-stage">
          <div
            className="catalogue-book-wrapper"
            style={{ perspective: "2800px", position: "relative" }}
          >
            {/* Stacked page edges */}
            <div className="page-edges" aria-hidden="true">
              <span className="page-edge edge-1" />
              <span className="page-edge edge-2" />
              <span className="page-edge edge-3" />
            </div>

            {/* Right-edge glow hint */}
            {!isFlipping && !isLastPage && (
              <div className="page-turn-hint" aria-hidden="true" />
            )}

            {/* @ts-ignore - react-pageflip types */}
            <HTMLFlipBook
              ref={bookRef}
              width={720}
              height={1018}
              size="stretch"
              minWidth={500}
              maxWidth={820}
              minHeight={707}
              maxHeight={1160}
              showCover={true}
              mobileScrollSupport={false}
              onFlip={onFlip}
              onChangeState={onChangeState}
              className="catalogue-flipbook"
              style={{}}
              startPage={0}
              drawShadow={true}
              flippingTime={800}
              usePortrait={false}
              startZIndex={0}
              autoSize={true}
              maxShadowOpacity={0.5}
              showPageCorners={true}
              disableFlipByClick={false}
              useMouseEvents={true}
              swipeDistance={30}
              clickEventForward={true}
            >
              {PAGE_SEQUENCE.map((def, i) => (
                <FlipPage key={i} def={def} />
              ))}
            </HTMLFlipBook>
          </div>
        </div>

        {/* Controls + actions */}
        {controls}

        <div className="catalogue-cta-group">
          <button
            onClick={() => setIsExpanded(true)}
            className="catalogue-expand-btn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            View Full Screen
          </button>
          <span className="catalogue-cta-divider" />
          <a href="#" className="catalogue-download-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download PDF
          </a>
          <span className="catalogue-cta-divider" />
          <a href="#" className="catalogue-proposal-link">
            Request a Bespoke Proposal
          </a>
        </div>
      </div>

      {/* ═══ Full-screen lightbox ═══ */}
      {isExpanded && (
        <div className="catalogue-lightbox" onClick={() => setIsExpanded(false)}>
          <div
            className="catalogue-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="catalogue-lightbox-close"
              onClick={() => setIsExpanded(false)}
              aria-label="Close full screen"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div
              className="catalogue-lightbox-book"
              style={{ perspective: "3000px", position: "relative" }}
            >
              {/* @ts-ignore - react-pageflip types */}
              <HTMLFlipBook
                ref={lightboxBookRef}
                width={800}
                height={1131}
                size="stretch"
                minWidth={600}
                maxWidth={900}
                minHeight={849}
                maxHeight={1274}
                showCover={true}
                mobileScrollSupport={false}
                onFlip={onFlip}
                onChangeState={onChangeState}
                className="catalogue-flipbook"
                style={{}}
                startPage={currentPage}
                drawShadow={true}
                flippingTime={800}
                usePortrait={false}
                startZIndex={0}
                autoSize={true}
                maxShadowOpacity={0.6}
                showPageCorners={true}
                disableFlipByClick={false}
                useMouseEvents={true}
                swipeDistance={30}
                clickEventForward={true}
              >
                {PAGE_SEQUENCE.map((def, i) => (
                  <FlipPage key={`lb-${i}`} def={def} />
                ))}
              </HTMLFlipBook>
            </div>

            {controls}
          </div>
        </div>
      )}

      <style jsx global>{`
        /* ── Book stage — expansive presentation ── */
        .catalogue-book-stage {
          position: relative;
          padding: 0 20px 16px 0;
          isolation: isolate;
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .catalogue-book-wrapper {
          width: 100%;
          max-width: 820px;
        }

        .catalogue-flipbook {
          box-shadow:
            0 4px 12px rgba(0,0,0,0.10),
            0 16px 48px rgba(0,0,0,0.20),
            0 32px 80px rgba(0,0,0,0.08);
          border-radius: 3px;
        }
        .catalogue-flipbook .page-content {
          background: white;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        /* ════════════════════════════════════════════
           Editorial Interstitial Pages
           ════════════════════════════════════════════ */
        .editorial-page {
          background: linear-gradient(170deg, #1a1a18 0%, #242420 40%, #1e1e1b 100%) !important;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
        }

        /* ── Quote layout ── */
        .editorial-quote-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 24px;
          max-width: 85%;
        }

        .editorial-accent-top {
          font-size: 0.65rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #C5A255;
          font-weight: 400;
        }

        .editorial-ornament {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .editorial-ornament.bottom {
          margin-top: 8px;
        }
        .ornament-line {
          display: block;
          width: 40px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(197,162,85,0.5), transparent);
        }
        .ornament-diamond {
          width: 6px;
          height: 6px;
          background: #C5A255;
          transform: rotate(45deg);
          opacity: 0.6;
        }

        .editorial-quote {
          font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
          font-size: 1.55rem;
          font-weight: 300;
          font-style: italic;
          line-height: 1.55;
          color: #f0ece4;
          letter-spacing: 0.01em;
        }

        .editorial-attribution {
          font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
          font-size: 0.85rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #C5A255;
          font-weight: 500;
        }

        /* ── Statement layout ── */
        .editorial-statement-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 22px;
          max-width: 85%;
        }

        .editorial-headline {
          font-family: var(--font-cormorant), 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 400;
          color: #f0ece4;
          letter-spacing: 0.02em;
          line-height: 1.2;
        }

        .editorial-body {
          font-size: 0.88rem;
          line-height: 1.75;
          color: rgba(240, 236, 228, 0.65);
          font-weight: 300;
          max-width: 380px;
        }

        /* ── Stacked page edges (right side) ── */
        .page-edges {
          position: absolute;
          top: 5px;
          right: -14px;
          bottom: 5px;
          width: 14px;
          z-index: -1;
          pointer-events: none;
        }
        .page-edge {
          position: absolute;
          top: 0;
          bottom: 0;
        }
        .edge-1 {
          right: 0;
          width: 5px;
          background: #b5b0ab;
          border-right: 1px solid rgba(0,0,0,0.10);
          border-radius: 0 2px 2px 0;
          box-shadow: 2px 0 6px rgba(0,0,0,0.10);
        }
        .edge-2 {
          right: 5px;
          width: 5px;
          background: #c2bdb8;
          border-right: 1px solid rgba(0,0,0,0.06);
        }
        .edge-3 {
          right: 10px;
          width: 4px;
          background: #cec9c4;
          border-right: 1px solid rgba(0,0,0,0.04);
        }

        /* ── Right-edge interaction hint ── */
        .page-turn-hint {
          position: absolute;
          top: 15%;
          right: -1px;
          bottom: 15%;
          width: 3px;
          z-index: 20;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(247, 190, 104, 0) 20%,
            rgba(247, 190, 104, 0.35) 50%,
            rgba(247, 190, 104, 0) 80%,
            transparent 100%
          );
          border-radius: 2px;
          animation: edgeShimmer 3s ease-in-out infinite;
        }

        @keyframes edgeShimmer {
          0%, 100% { opacity: 0; }
          40%, 60% { opacity: 1; }
        }

        /* ── Decorative frame corners ── */
        .catalogue-section-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          position: relative;
          padding: 48px 56px;
        }
        .catalogue-frame {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .frame-corner {
          position: absolute;
          width: 32px;
          height: 32px;
        }
        .frame-corner::before,
        .frame-corner::after {
          content: "";
          position: absolute;
          background: rgba(247, 190, 104, 0.3);
        }
        .frame-corner::before {
          height: 1px;
          width: 32px;
        }
        .frame-corner::after {
          width: 1px;
          height: 32px;
        }
        .frame-tl { top: 0; left: 0; }
        .frame-tl::before { top: 0; left: 0; }
        .frame-tl::after { top: 0; left: 0; }

        .frame-tr { top: 0; right: 0; }
        .frame-tr::before { top: 0; right: 0; }
        .frame-tr::after { top: 0; right: 0; }

        .frame-bl { bottom: 0; left: 0; }
        .frame-bl::before { bottom: 0; left: 0; }
        .frame-bl::after { bottom: 0; left: 0; }

        .frame-br { bottom: 0; right: 0; }
        .frame-br::before { bottom: 0; right: 0; }
        .frame-br::after { bottom: 0; right: 0; }

        /* ── Controls ── */
        .catalogue-controls {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .catalogue-nav-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.10);
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #333;
        }
        .catalogue-nav-btn:hover:not(:disabled) {
          border-color: #F7BE68;
          color: #F7BE68;
          box-shadow: 0 0 0 4px rgba(247, 190, 104, 0.08);
        }
        .catalogue-nav-btn:disabled {
          cursor: default;
        }

        /* ── Page indicator ── */
        .catalogue-page-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        .page-indicator-track {
          display: flex;
          gap: 7px;
          align-items: center;
        }
        .page-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(0,0,0,0.10);
          transition: all 0.4s ease;
        }
        .page-indicator-dot.active {
          background: #F7BE68;
          box-shadow: 0 0 8px rgba(247, 190, 104, 0.4);
          transform: scale(1.3);
        }
        .page-indicator-text {
          font-family: var(--font-cormorant), serif;
          font-size: 0.9rem;
          color: #999;
          letter-spacing: 0.15em;
          font-style: italic;
        }

        /* ── Catalogue CTAs ── */
        .catalogue-cta-group {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-top: 8px;
        }
        .catalogue-expand-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 26px;
          border-radius: 9999px;
          border: 1px solid rgba(0,0,0,0.12);
          background: white;
          color: #333;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .catalogue-expand-btn:hover {
          border-color: #F7BE68;
          color: #F7BE68;
        }
        .catalogue-download-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 26px;
          border-radius: 9999px;
          background-color: #F7BE68;
          color: #000;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          transition: opacity 0.3s ease;
          text-decoration: none;
        }
        .catalogue-download-btn:hover {
          opacity: 0.85;
        }
        .catalogue-cta-divider {
          width: 1px;
          height: 22px;
          background: rgba(0,0,0,0.10);
        }
        .catalogue-proposal-link {
          font-family: var(--font-cormorant), serif;
          font-size: 0.95rem;
          font-style: italic;
          color: #666;
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
        }
        .catalogue-proposal-link:hover {
          color: #F7BE68;
        }

        /* ═══ Lightbox ═══ */
        .catalogue-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.90);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: lbFadeIn 0.3s ease;
        }
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .catalogue-lightbox-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
          max-height: 95vh;
          max-width: 95vw;
        }
        .catalogue-lightbox-close {
          position: fixed;
          top: 20px;
          right: 24px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(0,0,0,0.5);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }
        .catalogue-lightbox-close:hover {
          border-color: #F7BE68;
          color: #F7BE68;
        }
        .catalogue-lightbox-book {
          max-height: 82vh;
        }

        /* Lightbox controls styling overrides */
        .catalogue-lightbox .catalogue-nav-btn {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.15);
          color: white;
        }
        .catalogue-lightbox .catalogue-nav-btn:hover:not(:disabled) {
          border-color: #F7BE68;
          color: #F7BE68;
          box-shadow: 0 0 0 4px rgba(247, 190, 104, 0.12);
        }
        .catalogue-lightbox .page-indicator-dot {
          background: rgba(255,255,255,0.15);
        }
        .catalogue-lightbox .page-indicator-dot.active {
          background: #F7BE68;
        }
        .catalogue-lightbox .page-indicator-text {
          color: rgba(255,255,255,0.45);
        }
      `}</style>
    </>
  );
}
