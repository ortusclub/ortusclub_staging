"use client";

import { useRef, useState, useCallback, forwardRef } from "react";
import HTMLFlipBook from "react-pageflip";

const TOTAL_PAGES = 11;

const Page = forwardRef<HTMLDivElement, { number: number }>(
  function Page({ number }, ref) {
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

export default function CatalogueBook() {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Book */}
      <div
        style={{
          perspective: "2000px",
        }}
      >
        {/* @ts-expect-error - react-pageflip types */}
        <HTMLFlipBook
          ref={bookRef}
          width={420}
          height={594}
          size="stretch"
          minWidth={300}
          maxWidth={500}
          minHeight={424}
          maxHeight={707}
          showCover={true}
          mobileScrollSupport={false}
          onFlip={onFlip}
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
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <Page key={i} number={i} />
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-gray-500 text-sm tabular-nums">
          {currentPage + 1} / {TOTAL_PAGES}
        </span>
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <p className="text-gray-400 text-xs">Click a page edge or drag to flip</p>

      <style jsx global>{`
        .catalogue-flipbook {
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
          border-radius: 4px;
        }
        .catalogue-flipbook .page-content {
          background: white;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
