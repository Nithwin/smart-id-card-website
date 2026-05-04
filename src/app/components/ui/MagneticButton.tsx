"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

import { springMagnetic } from "@/app/lib/motion";

interface MagneticButtonProps {
  href:      string;
  children:  ReactNode;
  className?: string;
  style?:    CSSProperties;
}

export function MagneticButton({
  href,
  children,
  className = "",
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ix = useSpring(x, springMagnetic);
  const iy = useSpring(y, springMagnetic);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top  - rect.height / 2;
    x.set(cx * 0.22);
    y.set(cy * 0.38);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      style={{ ...style, x: ix, y: iy, willChange: "transform" }}
      className={`group inline-flex items-center justify-center rounded-full px-8 py-5 text-sm font-semibold uppercase tracking-[0.18em] ${className}`}
    >
      <span className="inline-flex items-center gap-3">
        {children}
      </span>
    </motion.a>
  );
}
