"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value:    number;
  suffix?:  string;
  prefix?:  string;
  decimals?: number;
  duration?: number;
  className?: string;
  /** Re-fire animation on every viewport entry (default true). */
  repeat?:   boolean;
}

export function CountUp({
  value,
  suffix    = "",
  prefix    = "",
  decimals  = 0,
  duration  = 1.6,
  className = "",
  repeat    = true,
}: CountUpProps) {
  const ref       = useRef<HTMLSpanElement | null>(null);
  const inView    = useInView(ref, { amount: 0.55, once: !repeat });
  const motionVal = useMotionValue(0);
  const display   = useTransform(motionVal, (latest) =>
    `${prefix}${latest.toFixed(decimals)}${suffix}`,
  );
  const [text, setText] = useState(`${prefix}${(0).toFixed(decimals)}${suffix}`);

  useEffect(() => display.on("change", (v) => setText(v)), [display]);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionVal, value, { duration, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    } else if (repeat) {
      motionVal.set(0);
    }
  }, [inView, value, motionVal, duration, repeat]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
