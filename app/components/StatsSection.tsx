"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration: number, startCounting: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out curve for a nice deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
}

function formatNumber(n: number) {
  return n.toLocaleString();
}

function StatCard({ target, suffix, label, startCounting }: { target: number; suffix: string; label: string; startCounting: boolean }) {
  const count = useCountUp(target, 2000, startCounting);

  return (
    <div
      className="rounded-lg py-8 px-8 text-center"
      style={{ backgroundColor: "#484D49", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
    >
      <div
        className="text-white text-5xl mb-3"
        style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300 }}
      >
        {formatNumber(count)}{suffix}
      </div>
      <div className="text-white/80 text-xs tracking-widest italic">
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    { target: 2500, suffix: "+", label: "EVENTS" },
    { target: 27000, suffix: "+", label: "PARTICIPANTS" },
    { target: 40, suffix: "+", label: "COUNTRIES" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [startCounting, setStartCounting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#F4F4F4] pb-20 px-12">
      {/* Stat cards */}
      <div ref={sectionRef} className="max-w-6xl mx-auto grid grid-cols-3 gap-6 mb-20">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
            startCounting={startCounting}
          />
        ))}
      </div>

      {/* Our Events heading + description */}
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-5xl mb-4"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
        >
          Our <em>Events</em>
        </h2>
        <div className="w-16 h-px bg-black mx-auto mb-8" />
        <p className="text-gray-600 text-sm leading-relaxed">
          Each engagement by The Ortus Club is anchored in a clear event strategy, from concept
          and planning to hosting in world-class venues and delivering memorable guest experiences.
          Whether in person or virtually, every forum is designed to encourage networking, sharing
          of insights, business growth, and the creation of relationships built on trust.
        </p>
      </div>
    </section>
  );
}
