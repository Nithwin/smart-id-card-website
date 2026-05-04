"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useRef, type ReactNode, type CSSProperties } from "react";

/**
 * TiltCard — 3-D perspective physics tilt.
 *
 * Maths:
 *   Let (cx, cy) = mouse pos normalised to [-0.5, +0.5] within the card.
 *   rotateY =  cx * MAX_TILT   (positive → right edge comes forward)
 *   rotateX = -cy * MAX_TILT   (positive → top edge comes forward)
 *   glare   =  linear-gradient following (cx+0.5, cy+0.5) in [0..100%]
 *
 * A spring (stiffness 320, damping 30) sits between the raw motion value
 * and the rendered transform — giving the natural overshoot + settle feel.
 *
 * Respects prefers-reduced-motion automatically via Framer Motion.
 */

interface TiltCardProps {
  children:       ReactNode;
  className?:     string;
  style?:         CSSProperties;
  /** data-cursor label forwarded to the DOM element for CustomCursor to pick up */
  "data-cursor"?: string;
  /** Maximum tilt degrees (default 10°) */
  maxTilt?:       number;
  /** Perspective distance in px (default 900) */
  perspective?:   number;
  /** Show a subtle glare overlay (default true) */
  glare?:         boolean;
}

const SPRING = { stiffness: 320, damping: 30, mass: 0.6 };

export function TiltCard({
  children,
  className   = "",
  style,
  "data-cursor": dataCursor,
  maxTilt     = 10,
  perspective = 900,
  glare       = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotX = useSpring(rawX, SPRING);
  const rotY = useSpring(rawY, SPRING);

  /* Glare: tracks mouse position in the card (0→100%).
   * Must be declared unconditionally (hooks rules). */
  const glareX = useTransform(rawY, [-maxTilt, maxTilt], ["0%",  "100%"]);
  const glareY = useTransform(rawX, [-maxTilt, maxTilt], ["100%", "0%"]);
  const glareGradient = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.09) 0%, transparent 65%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx   = (e.clientX - rect.left)  / rect.width  - 0.5;
    const cy   = (e.clientY - rect.top)   / rect.height - 0.5;
    rawY.set(cx *  maxTilt);
    rawX.set(cy * -maxTilt);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        rotateX: rotX,
        rotateY: rotY,
        transformStyle:   "preserve-3d",
        transformPerspective: perspective,
        willChange: "transform",
      }}
      className={`relative ${className}`}
      data-cursor={dataCursor}
    >
      {children}

      {/* Glare plane — sits above children but is pointer-events-none.
          Rendered when glare=true; value always computed above (hooks rule). */}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareGradient, zIndex: 2 }}
        />
      )}
    </motion.div>
  );
}
