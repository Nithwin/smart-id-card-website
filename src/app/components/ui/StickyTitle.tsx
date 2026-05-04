"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

interface StickyTitleProps {
  children:   ReactNode;
  className?: string;
  style?:     CSSProperties;
  /** Pixel offset from the top while pinned. */
  top?:       number;
}

/**
 * Sticky scroll header — pins to top of viewport while user scrolls through
 * its parent. Subtly fades and scales as the parent leaves view.
 */
export function StickyTitle({ children, className = "", style, top = 96 }: StickyTitleProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.0, 0.15, 0.85, 1.0], [0.4, 1, 1, 0.4]);
  const y       = useTransform(scrollYProgress, [0,   1],            [-20, 20]);

  return (
    <motion.div
      ref={ref}
      style={{
        ...style,
        position: "sticky",
        top,
        opacity,
        y,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
