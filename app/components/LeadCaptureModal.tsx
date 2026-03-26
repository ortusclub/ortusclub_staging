"use client";

import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadCaptureModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState({ fullName: "", email: "", company: "", position: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
      setErrors({});
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid work email";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.position.trim()) e.position = "Job position is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: Send to API / CRM
    console.log("Lead captured:", form);
    setSubmitted(true);

    // Trigger download after short delay
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/catalogue-pages/page-0.png"; // Replace with actual PDF
      link.download = "Ortus-Sport-Catalogue-2026.pdf";
      link.click();
      setTimeout(onClose, 1500);
    }, 800);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(0,0,0,0.1)",
    background: "#fafaf9",
    fontSize: "0.88rem",
    color: "#1a1a1a",
    outline: "none",
    transition: "border-color 0.3s",
    fontFamily: "-apple-system, sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#888",
    marginBottom: "6px",
    fontWeight: 500,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "lbFadeIn 0.3s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "48px 44px",
          maxWidth: "460px",
          width: "90%",
          position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.08)",
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
            transition: "all 0.3s",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>&#10003;</div>
            <h3
              style={{
                fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                fontWeight: 400,
                color: "#1a1a1a",
                marginBottom: "8px",
              }}
            >
              Thank You
            </h3>
            <p style={{ color: "#888", fontSize: "0.88rem" }}>
              Your catalogue is downloading now.
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase" as const,
                  color: "#F7BE68",
                  marginBottom: "10px",
                }}
              >
                Download Catalogue
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  color: "#1a1a1a",
                  marginBottom: "8px",
                }}
              >
                Get Our <em>2026/27 Catalogue</em>
              </h3>
              <div
                style={{
                  width: "32px",
                  height: "1.5px",
                  background: "#F7BE68",
                  margin: "0 auto 12px",
                  opacity: 0.5,
                }}
              />
              <p style={{ color: "#999", fontSize: "0.82rem", lineHeight: 1.6 }}>
                Enter your details to receive our full sporting events catalogue.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  placeholder="First and Last Name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  style={{
                    ...inputStyle,
                    borderColor: errors.fullName ? "#e55" : "rgba(0,0,0,0.1)",
                  }}
                />
                {errors.fullName && <p style={{ color: "#e55", fontSize: "0.72rem", marginTop: "4px" }}>{errors.fullName}</p>}
              </div>
              <div>
                <label style={labelStyle}>Work Email</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={{
                    ...inputStyle,
                    borderColor: errors.email ? "#e55" : "rgba(0,0,0,0.1)",
                  }}
                />
                {errors.email && <p style={{ color: "#e55", fontSize: "0.72rem", marginTop: "4px" }}>{errors.email}</p>}
              </div>
              <div>
                <label style={labelStyle}>Company</label>
                <input
                  type="text"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  style={{
                    ...inputStyle,
                    borderColor: errors.company ? "#e55" : "rgba(0,0,0,0.1)",
                  }}
                />
                {errors.company && <p style={{ color: "#e55", fontSize: "0.72rem", marginTop: "4px" }}>{errors.company}</p>}
              </div>
              <div>
                <label style={labelStyle}>Job Position</label>
                <input
                  type="text"
                  placeholder="e.g. CEO, Managing Director"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  style={{
                    ...inputStyle,
                    borderColor: errors.position ? "#e55" : "rgba(0,0,0,0.1)",
                  }}
                />
                {errors.position && <p style={{ color: "#e55", fontSize: "0.72rem", marginTop: "4px" }}>{errors.position}</p>}
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "8px",
                  padding: "14px 32px",
                  borderRadius: "999px",
                  background: "#F7BE68",
                  color: "#000",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.3s",
                }}
              >
                Download Catalogue
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
