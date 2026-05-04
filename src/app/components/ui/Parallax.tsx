"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

interface ParallaxProps {
  children:   ReactNode;
  /** Translation distance in pixels at full progress. Negative pulls upward. */
  speed?:     number;
  className?: string;
  style?:     CSSProperties;
  /** Axis: y (default) or x. */
  axis?:      "x" | "y";
}

/**
 * Section-relative parallax. Tracks scroll progress of the element through the
 * viewport and translates by ±speed pixels. Re-runs continuously on scroll.
 */
export function Parallax({
  children,
  speed     = 80,
  className = "",
  style,
  axis      = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const move = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        ...style,
        ...(axis === "y" ? { y: move } : { x: move }),
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}
