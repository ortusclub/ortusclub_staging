"use client";

import { useState } from "react";
import LeadCaptureModal from "./LeadCaptureModal";

export default function CatalogueDownloadButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "14px 32px",
          borderRadius: "999px",
          background: "#F7BE68",
          color: "#000",
          fontSize: "0.8rem",
          fontWeight: 500,
          letterSpacing: "0.04em",
          border: "none",
          cursor: "pointer",
          transition: "opacity 0.3s",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        Download Our Catalogue
      </button>
      <LeadCaptureModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
