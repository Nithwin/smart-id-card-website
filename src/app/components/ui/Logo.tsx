"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface LogoProps {
  size?:      number;
  className?: string;
  style?:     CSSProperties;
  /** Animate the scan line on mount/hover */
  animate?:   boolean;
}

/**
 * SICD brand mark — stylized ID card with photo, lines and a scanning beam.
 * Uses currentColor so it inherits text-color in both themes.
 */
export function Logo({ size = 32, className = "", style, animate = true }: LogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      style={style}
      initial={animate ? { opacity: 0, scale: 0.85 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <rect x="3" y="7" width="26" height="18" rx="3.5" stroke="currentColor" strokeWidth="2.2" />
      <rect x="6.5" y="11" width="6.5" height="10" rx="1.2" fill="currentColor" />
      <rect x="15.5" y="12" width="9"   height="1.5" rx="0.75" fill="currentColor" />
      <rect x="15.5" y="15.25" width="6.5" height="1.5" rx="0.75" fill="currentColor" opacity="0.7" />
      <rect x="15.5" y="18.5" width="8"  height="1.5" rx="0.75" fill="currentColor" opacity="0.5" />

      {/* Scan beam — animates back and forth */}
      <motion.line
        x1="1"  x2="31"
        y1="16" y2="16"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="1.5 2"
        opacity="0.6"
        animate={animate ? { y1: [9, 23, 9], y2: [9, 23, 9] } : undefined}
        transition={{ duration: 3.4, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.svg>
  );
}
