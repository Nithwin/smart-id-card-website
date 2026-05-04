"use client";

import { useEffect, useRef } from "react";

/**
 * ParticleField — canvas-based parametric particle system.
 *
 * Physics model:
 *   Each particle i has position (xᵢ, yᵢ) and constant velocity (vxᵢ, vyᵢ).
 *   Positions update each frame:   xᵢ += vxᵢ · Δt,  yᵢ += vyᵢ · Δt
 *   Boundary: particles wrap around (torus topology).
 *
 *   Mouse interaction: a soft repulsion force is applied when the cursor is
 *   within MOUSE_RADIUS pixels.  Force magnitude falls off as 1/d² (inverse-
 *   square law, same as gravity / Coulomb force):
 *
 *     F = REPEL_STRENGTH / d²   (clamped so near-zero d doesn't blow up)
 *     ax = F · (xᵢ − mx) / d
 *     ay = F · (yᵢ − my) / d
 *
 *   Velocity is damped each frame by DAMPING so the repulsion effect fades:
 *     vxᵢ += ax,  vyᵢ += ay,  vxᵢ *= DAMPING,  vyᵢ *= DAMPING
 *
 *   Connections: any two particles within LINK_DIST draw a line whose
 *   opacity is (1 − d / LINK_DIST) — linear fade to zero at the threshold.
 *
 * Respects prefers-reduced-motion: animation is killed and canvas cleared.
 */

const N            = 55;       // particle count
const BASE_SPEED   = 0.4;      // px / frame at 60 fps
const LINK_DIST    = 140;      // max connection length (px)
const MOUSE_RADIUS = 180;      // mouse repulsion zone (px)
const REPEL        = 2200;     // inverse-square strength constant
const DAMPING      = 0.96;     // velocity damping per frame

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; baseVx: number; baseVy: number;
}

function initParticles(W: number, H: number): Particle[] {
  return Array.from({ length: N }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = BASE_SPEED * (0.5 + Math.random());
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      baseVx: Math.cos(angle) * speed,
      baseVy: Math.sin(angle) * speed,
      r: 1 + Math.random() * 1.4,
    };
  });
}

interface ParticleFieldProps {
  /** accent colour for particles and links (default: var(--accent) resolved at runtime) */
  color?: string;
  className?: string;
}

export function ParticleField({ className = "" }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* Respect prefers-reduced-motion */
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Resolve accent colour from CSS variable */
    const resolveColor = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#a5b4fc";

    let W = 0, H = 0;
    let particles: Particle[] = [];
    let mx = -9999, my = -9999;
    let raf = 0;
    let accentColor = resolveColor();

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      particles = initParticles(W, H);
      accentColor = resolveColor();
    };

    resize();

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onLeave = () => { mx = -9999; my = -9999; };

    window.addEventListener("mousemove", onMouse, { passive: true });
    canvas.addEventListener("mouseleave", onLeave);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* --- The colour with opacity utility --- */
    const rgba = (hex: string, a: number) => {
      /* hex is either a named CSS var result like "#a5b4fc" or "rgb(…)" */
      /* We just use it directly and vary alpha via globalAlpha */
      void hex; // used via ctx.strokeStyle set once outside
      return a;
    };
    void rgba;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        /* Mouse repulsion (inverse-square) */
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 1) {
          const d  = Math.sqrt(d2);
          const f  = REPEL / d2;
          p.vx    += (dx / d) * f;
          p.vy    += (dy / d) * f;
        }

        /* Damp toward base velocity */
        p.vx = (p.vx * DAMPING) + (p.baseVx * (1 - DAMPING));
        p.vy = (p.vy * DAMPING) + (p.baseVy * (1 - DAMPING));

        /* Integrate position */
        p.x += p.vx;
        p.y += p.vy;

        /* Torus wrap */
        if (p.x < -10) p.x += W + 10;
        if (p.x > W + 10) p.x -= W + 10;
        if (p.y < -10) p.y += H + 10;
        if (p.y > H + 10) p.y -= H + 10;
      }

      /* Draw connections */
      ctx.strokeStyle = accentColor;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK_DIST) {
            ctx.globalAlpha = (1 - d / LINK_DIST) * 0.18;
            ctx.lineWidth   = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      /* Draw dots */
      ctx.fillStyle = accentColor;
      for (const p of particles) {
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
