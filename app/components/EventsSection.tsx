"use client";

import { useEffect, useRef, useState } from "react";

export default function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F4F4] py-24 px-12 relative overflow-hidden">
      {/* Large circle — slides in from left */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          backgroundColor: "#E2DFDB",
          left: 0,
          bottom: "-80px",
          transform: visible ? "translateX(-25%)" : "translateX(-110%)",
          opacity: visible ? 1 : 0,
          transition: "transform 1s ease-out, opacity 1s ease-out",
        }}
      />

      {/* Small circle — slides in from right */}
      <div
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: "#E2DFDB",
          right: "60px",
          bottom: "-40px",
          transform: visible ? "translateX(0%)" : "translateX(80%)",
          opacity: visible ? 1 : 0,
          transition: "transform 1s ease-out 0.3s, opacity 1s ease-out 0.3s",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex items-center gap-20">
        {/* Text */}
        <div className="flex-1 max-w-lg">
          <h2
            className="text-4xl leading-tight mb-4"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            We <em>Curate Events</em> Worth Attending
          </h2>
          <div className="w-16 h-px bg-black mb-6" />
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            We connect the world&apos;s most accomplished executives through roundtables,
            masterclasses, summits and interactive experiences designed with precision.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            For top-tier executives struggling to connect with the right audience and tired of
            over-promising and under-delivering events, The Ortus Club stands apart as the
            trusted partner for high-impact, results-driven networking.
          </p>
        </div>

        {/* YouTube embed */}
        <div className="flex-1 relative z-10">
          <div className="relative w-full" style={{ paddingBottom: "45%" }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded-sm"
              src="https://www.youtube.com/embed/NUAr-geY9DU"
              title="The Ortus Club - Executive Roundtable"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
