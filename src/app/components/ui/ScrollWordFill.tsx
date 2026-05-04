"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type CSSProperties } from "react";

interface ScrollWordFillProps {
  text:           string;
  className?:     string;
  style?:         CSSProperties;
  /** Color of the scroll-revealed fill. Defaults to var(--text-primary). */
  fillColor?:     string;
  /** Color before scroll reveal. Defaults to muted. */
  baseColor?:     string;
  as?:            "h2" | "h3" | "p";
}

function Word({
  word,
  scrollYProgress,
  index,
  total,
  fillColor,
  baseColor,
}: {
  word:           string;
  scrollYProgress: MotionValue<number>;
  index:           number;
  total:           number;
  fillColor:       string;
  baseColor:       string;
}) {
  const start = index / total;
  const end   = start + 1 / total;
  const color = useTransform(
    scrollYProgress,
    [start * 0.88, end * 0.92],
    [baseColor, fillColor],
  );
  const y = useTransform(scrollYProgress, [start * 0.88, end * 0.92], [18, 0]);

  return (
    <motion.span
      style={{
        color,
        y,
        marginRight: "0.25em",
        display: "inline-block",
      }}
    >
      {word}
    </motion.span>
  );
}

/**
 * Scroll-driven word fill + subtle lift — editorial / Awwwards-style.
 */
export function ScrollWordFill({
  text,
  className = "",
  style,
  fillColor = "var(--text-primary)",
  baseColor = "color-mix(in srgb, var(--text-muted) 62%, transparent)",
  as: Tag = "h2",
}: ScrollWordFillProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 48%"],
  });

  const words = text.split(" ");
  const Component = Tag;

  return (
    <Component ref={ref} className={className} style={{ position: "relative", ...style }}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          word={w}
          scrollYProgress={scrollYProgress}
          index={i}
          total={words.length}
          fillColor={fillColor}
          baseColor={baseColor}
        />
      ))}
    </Component>
  );
}
