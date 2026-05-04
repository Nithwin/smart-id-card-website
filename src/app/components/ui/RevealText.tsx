"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";

import { easeOutExpo, easeOutStrong } from "@/app/lib/motion";

interface RevealTextProps {
  text:       string;
  as?:        "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?:     CSSProperties;
  delay?:     number;
  stagger?:   number;
  /** "char" splits per character, "word" splits per word */
  split?:     "char" | "word";
  /**
   * If true (default), animation re-fires every time the element enters viewport.
   * Set to false to play only once.
   */
  repeat?:    boolean;
}

/**
 * Masked rise + slight blur clear — high-end portfolio headline feel.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  style,
  delay   = 0,
  stagger = 0.028,
  split   = "char",
  repeat  = true,
}: RevealTextProps) {
  const tokens = split === "word" ? text.split(/(\s+)/) : Array.from(text);

  const ref    = useRef<HTMLElement | null>(null);
  /* amount: 0 fires as soon as even 1px is visible — important for above-fold hero */
  const inView = useInView(ref, { amount: 0, once: !repeat });

  const MotionTag = motion[Tag] as typeof motion.h2;

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
        return (
          <span
            key={i}
            className="inline-block align-baseline"
            style={{ verticalAlign: "baseline", overflow: "hidden", paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          >
            <motion.span
              className="inline-block word-hi"
              variants={{
                hidden: {
                  y: "115%",
                  opacity: 0,
                  filter: "blur(8px)",
                  transition: { duration: 0.45, ease: easeOutStrong },
                },
                visible: {
                  y: "0%",
                  opacity: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.82, ease: easeOutExpo },
                },
              }}
            >
              {token === " " ? "\u00A0" : token}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
