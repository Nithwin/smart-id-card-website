"use client";

import { type CSSProperties } from "react";

interface MarqueeProps {
  items:     string[];
  duration?: number;
  className?: string;
  separator?: string;
  invert?:   boolean;
  italic?:   boolean;
}

export function Marquee({
  items,
  duration  = 40,
  className = "",
  separator = "✦",
  invert    = false,
  italic    = false,
}: MarqueeProps) {
  const loop = [...items, ...items];

  const style: CSSProperties = {
    "--marquee-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div
      className={`group relative overflow-hidden border-y py-6 sm:py-8 ${
        invert ? "invert-section" : ""
      } ${className}`}
      style={{ borderColor: "var(--border)" }}
    >
      <div className="marquee-wrap overflow-hidden">
        <div
          className="marquee-track flex w-max items-center gap-12"
          style={style}
        >
          {loop.map((item, idx) => (
            <span
              key={idx}
              className={`flex shrink-0 items-center gap-12 whitespace-nowrap ${
                italic ? "font-display italic" : "font-display"
              }`}
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 1 }}
            >
              {item}
              <span className="text-[0.4em] opacity-40">{separator}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
