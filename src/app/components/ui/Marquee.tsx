"use client";

import { useEffect, useRef, type CSSProperties } from "react";

interface MarqueeProps {
  items:     string[];
  duration?: number;
  className?: string;
  separator?: string;
  invert?:   boolean;
  italic?:   boolean;
}

/**
 * Scroll-velocity marquee.
 *
 * Physics:
 *   At each animation frame we compute the absolute scroll delta since the
 *   last frame and derive a "speed multiplier":
 *
 *     raw    = |scrollY − prevScrollY|
 *     target = clamp(1 + raw × 0.12, 1, 5)   [smoothstep normalised]
 *     current = lerp(current, target, 0.06)   [exponential ease toward target]
 *
 *   The current multiplier is written as a CSS custom property
 *   `--marquee-speed-factor` on the track element.  The @keyframes is
 *   untouched — we just vary `animation-duration` inline:
 *
 *     animation-duration = BASE_DURATION / speedFactor
 *
 *   When scrolling stops, the multiplier exponentially decays back to 1,
 *   giving a natural deceleration.
 */

const MIN   = 1;
const MAX   = 5;
const LERP  = 0.06;  // ease factor toward target (lower = more inertia)
const SCALE = 0.12;  // how much each px of scroll delta adds to speed

export function Marquee({
  items,
  duration  = 40,
  className = "",
  separator = "✦",
  invert    = false,
  italic    = false,
}: MarqueeProps) {
  const loop     = [...items, ...items];
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    let prevY    = window.scrollY;
    let current  = MIN;
    let raf      = 0;

    const tick = () => {
      const raw    = Math.abs(window.scrollY - prevY);
      prevY        = window.scrollY;
      const target = Math.min(MAX, MIN + raw * SCALE);
      current      = current + (target - current) * LERP;

      if (trackRef.current) {
        /* Reduce duration → faster marquee at higher scroll velocity */
        trackRef.current.style.animationDuration = `${duration / current}s`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

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
          ref={trackRef}
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
