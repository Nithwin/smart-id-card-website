"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { easeOutExpo } from "@/app/lib/motion";
import { WordMark }    from "@/app/components/ui/WordMark";

interface SectionLabelProps {
  number: string;
  label:  string;
  className?: string;
}

/**
 * Editorial section header — rule draws in, label fades up (award-site rhythm).
 */
export function SectionLabel({ number, label, className = "" }: SectionLabelProps) {
  const ref    = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.9, once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
      }}
      className={`flex items-center gap-3 border-b pb-3 ${className}`}
      style={{ borderColor: "var(--border)" }}
    >
      <motion.span
        variants={{
          hidden: { opacity: 0, x: -8 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: easeOutExpo } },
        }}
        className="font-mono text-xs tabular-nums"
        style={{ color: "var(--text-muted)" }}
      >
        {number}
      </motion.span>
      <motion.span
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 1, opacity: 1, transition: { duration: 0.85, ease: easeOutExpo } },
        }}
        className="h-px flex-1 origin-left"
        style={{ background: "var(--border-strong)" }}
      />
      <motion.span
        variants={{
          hidden: { opacity: 0, y: 6 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
        }}
        className="font-mono text-xs tracking-[0.22em]"
        style={{ color: "var(--text-muted)" }}
      >
        <WordMark text={label} />
      </motion.span>
    </motion.div>
  );
}
