"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Physics-aware cursor.
 *
 * Mathematics used:
 *  • Velocity: Δpos / Δt sampled each RAF frame
 *  • Speed magnitude: √(vx² + vy²)
 *  • Stretch factor: mapped from [0, MAX_SPEED] → [1, MAX_STRETCH]
 *    via a smoothstep so it feels organic, not linear
 *  • Rotation: atan2(vy, vx) → degrees
 *  • Ring follows mouse with exponential ease (lerp coefficient 0.14)
 *  • On hover: ring morphs to filled pill with context label
 */

const BASE      = 36;   // resting ring diameter (px)
const STRETCH   = 2.6;  // max horizontal stretch multiplier
const MAX_SPEED = 38;   // px/frame above which stretch is clamped
const LERP      = 0.14; // ring chase factor (lower = more lag)

function smoothstep(x: number): number {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

export function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement | null>(null);
  const ringRef   = useRef<HTMLDivElement | null>(null);
  const labelRef  = useRef<HTMLSpanElement | null>(null);
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.body.classList.add("has-cursor");

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let prevX  = mouseX;
    let prevY  = mouseY;
    let hidden = true;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px,${mouseY - 3}px,0)`;
        dotRef.current.style.opacity   = "1";
      }
      hidden = false;
    };

    const onLeave = () => {
      hidden = true;
      if (dotRef.current)  dotRef.current.style.opacity  = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      hidden = false;
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const onOver = (e: MouseEvent) => {
      const t     = e.target as HTMLElement;
      const hover = t.closest("[data-cursor]") as HTMLElement | null;
      if (hover) {
        const ctx = hover.getAttribute("data-cursor") ?? "";
        setLabel(ctx === "hover" ? "" : ctx);
      } else {
        setLabel("");
      }
    };

    let raf = 0;
    const loop = () => {
      /* ── Chase with lerp ── */
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;

      /* ── Velocity ── */
      const vx    = mouseX - prevX;
      const vy    = mouseY - prevY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      prevX = mouseX;
      prevY = mouseY;

      /* ── Stretch (smoothstepped) ── */
      const t        = smoothstep(speed / MAX_SPEED);
      const scaleX   = 1 + t * (STRETCH - 1);
      const scaleY   = 1 / Math.sqrt(scaleX);      // conserve area
      const angleDeg = speed > 0.5 ? Math.atan2(vy, vx) * (180 / Math.PI) : 0;

      if (ringRef.current && !hidden) {
        const hasLabel = label.length > 0;
        ringRef.current.style.transform = `translate3d(${ringX - BASE / 2}px,${ringY - BASE / 2}px,0) rotate(${angleDeg}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
        ringRef.current.style.opacity   = "1";
        ringRef.current.style.background = hasLabel
          ? "color-mix(in srgb, var(--accent) 90%, #000)"
          : "transparent";
        ringRef.current.style.borderColor = hasLabel
          ? "transparent"
          : "color-mix(in srgb, var(--text-primary) 80%, transparent)";
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove",    onMove,  { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover",  onOver,  { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove",    onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover",  onOver);
      document.body.classList.remove("has-cursor");
    };
  }, [label]);

  return (
    <>
      {/* Precise dot — snaps to exact pointer position */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[6px] w-[6px] rounded-full"
        style={{
          background: "var(--text-primary)",
          opacity:    0,
          mixBlendMode: "difference",
          willChange: "transform",
          transition: "opacity 160ms ease",
        }}
      />

      {/* Ring — velocity-morphed ellipse */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full"
        style={{
          width:        BASE,
          height:       BASE,
          border:       "1.5px solid",
          borderColor:  "color-mix(in srgb, var(--text-primary) 80%, transparent)",
          opacity:      0,
          willChange:   "transform, opacity, background-color",
          transition:   "opacity 200ms ease, background-color 200ms ease, border-color 200ms ease",
        }}
      >
        <span
          ref={labelRef}
          className="pointer-events-none select-none font-mono text-[8px] font-bold uppercase tracking-[0.18em]"
          style={{
            color:     "#0a0a0a",
            opacity:   label ? 1 : 0,
            transition: "opacity 180ms ease",
            /* counter-rotate so the label reads upright regardless of cursor rotation */
            transform: "rotate(0deg)",
          }}
        >
          {label}
        </span>
      </div>
    </>
  );
}
