"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

import { easeOutExpo } from "@/app/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale" | "blur" | "clip" | "lift";

interface ScrollRevealProps {
  children:   ReactNode;
  direction?: Direction;
  delay?:     number;
  duration?:  number;
  amount?:    number;
  className?: string;
  style?:     CSSProperties;
  /** Re-fire animation every time element enters viewport (default true). */
  repeat?:    boolean;
  /** Stagger child motion items if children use motion.* with custom={i}. */
  stagger?:   number;
  /** Distance for movement directions. */
  distance?:  number;
  as?:        "div" | "section" | "li" | "span" | "article";
}

const variants = (dir: Direction, distance: number) => {
  switch (dir) {
    case "up":
      return { hidden: { y: distance, opacity: 0 }, visible: { y: 0, opacity: 1 } };
    case "down":
      return { hidden: { y: -distance, opacity: 0 }, visible: { y: 0, opacity: 1 } };
    case "left":
      return { hidden: { x: distance, opacity: 0 }, visible: { x: 0, opacity: 1 } };
    case "right":
      return { hidden: { x: -distance, opacity: 0 }, visible: { x: 0, opacity: 1 } };
    case "scale":
      return { hidden: { scale: 0.94, opacity: 0 }, visible: { scale: 1, opacity: 1 } };
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(16px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
      };
    case "lift":
      return {
        hidden: {
          y: distance * 1.1,
          opacity: 0,
          filter: "blur(12px)",
          scale: 0.97,
        },
        visible: {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
        },
      };
    case "clip":
      return {
        hidden:  { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        visible: { clipPath: "inset(0 0 0 0)",     opacity: 1 },
      };
    case "fade":
    default:
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
  }
};

/**
 * Scroll-reveal wrapper — `lift` = y + blur + scale (premium editorial feel).
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay     = 0,
  duration  = 0.85,
  amount    = 0.22,
  className = "",
  style,
  repeat    = true,
  stagger   = 0,
  distance  = 44,
  as = "div",
}: ScrollRevealProps) {
  const ref    = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount, once: !repeat });

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants(direction, distance)}
      transition={{
        duration,
        delay,
        ease: easeOutExpo,
        staggerChildren: stagger,
      }}
    >
      {children}
    </MotionTag>
  );
}
