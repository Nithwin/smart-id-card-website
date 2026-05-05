"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MagneticButton }  from "@/app/components/ui/MagneticButton";
import { RevealText }      from "@/app/components/ui/RevealText";
import { CountUp }         from "@/app/components/ui/CountUp";
import { ParticleField }   from "@/app/components/ui/ParticleField";
import { HeroLivePreview } from "@/app/components/sections/HeroLivePreview";
import { easeOutExpo }     from "@/app/lib/motion";

const VERBS = ["Detects.", "Captures.", "Identifies.", "Escalates."] as const;

/* Real numbers — 100-epoch CA-YOLOv8m on Tesla T4 */
const HERO_STATS = [
  { value: 98.6, suffix: "%",    decimals: 1, label: "mAP@50 all classes" },
  { value: 89,   suffix: " fps", decimals: 0, label: "GPU inference (T4)"  },
  { value: 11.2, suffix: " ms",  decimals: 1, label: "Inference latency"   },
  { value: 97,   suffix: "%",    decimals: 0, label: "F1 peak @ conf 0.4"  },
];

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const titleY       = useTransform(scrollYProgress, [0, 1],         [0, -120]);
  const titleScale   = useTransform(scrollYProgress, [0, 0.18, 0.6, 1], [1.02, 1, 0.97, 0.84]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.68],      [1, 0]);
  const previewY     = useTransform(scrollYProgress, [0, 1],         [0, 70]);
  const previewScale = useTransform(scrollYProgress, [0, 0.8],       [1, 0.96]);
  const gridOpacity  = useTransform(scrollYProgress, [0, 0.55],      [0.5, 0]);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 40, damping: 28, mass: 0.55 });
  const sy = useSpring(my, { stiffness: 40, damping: 28, mass: 0.55 });
  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${sx}% ${sy}%,
    color-mix(in srgb, var(--accent) 20%, transparent) 0%,
    transparent 60%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const [verbIdx, setVerbIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setVerbIdx((i) => (i + 1) % VERBS.length), 2400);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col overflow-hidden px-5 pb-8 pt-20 sm:px-8 sm:pb-10 sm:pt-24"
    >
      {/* Cursor spotlight */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: spotlight }} />

      {/* Parametric particle field — neural-net constellation */}
      <ParticleField className="-z-10 opacity-60 dark:opacity-40" />

      {/* Fine grid */}
      <motion.svg
        aria-hidden
        className="hero-grid-pulse pointer-events-none absolute inset-0 -z-10 h-full w-full"
        viewBox="0 0 100 100" preserveAspectRatio="none"
        style={{ opacity: gridOpacity }}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} x1={(i * 100) / 14} x2={(i * 100) / 14} y1="0" y2="100"
            stroke="var(--border)" strokeWidth="0.04" vectorEffect="non-scaling-stroke" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h${i}`} y1={(i * 100) / 9} y2={(i * 100) / 9} x1="0" x2="100"
            stroke="var(--border)" strokeWidth="0.04" vectorEffect="non-scaling-stroke" />
        ))}
      </motion.svg>

      {/* Subtle diagonal stripe — top right */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.45 }}
        transition={{ delay: 0.7, duration: 1.6, ease: easeOutExpo }}
        className="pointer-events-none absolute right-[6%] top-[18%] hidden h-px w-[28vw] origin-right md:block"
        style={{
          background: "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent-2) 55%, transparent))",
          transform: "rotate(-20deg)",
        }}
      />

      {/* ── TOP META ROW ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, ease: easeOutExpo }}
        className="relative flex w-full items-center justify-between"
      >
        <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
          <motion.span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent-2)" }}
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.65, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          Live campus pipeline · 2025/26
        </div>
        <div className="hidden items-center gap-5 sm:flex">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            Nithwin · Dharun Raj · Deepika
          </span>
          <span
            className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
          >
            CA-YOLOv8 + InsightFace
          </span>
        </div>
      </motion.div>

      {/* ── MAIN GRID — fills remaining space, vertically centred ─── */}
      <div className="relative flex flex-1 items-center">
        <div className="w-full grid gap-8 pt-6 md:grid-cols-2 md:gap-12 lg:gap-16 xl:gap-20 md:items-center">

          {/* LEFT — headline + text */}
          <motion.div
            style={{ y: titleY, scale: titleScale, opacity: titleOpacity, transformOrigin: "0% 50%" }}
            className="flex flex-col"
          >
            {/* Eyebrow verb ticker */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.65, ease: easeOutExpo }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
                ▸ The system
              </span>
              <span className="h-px w-8 shrink-0" style={{ background: "var(--border-strong)" }} />
              {/* Verb */}
              <span
                className="relative inline-flex overflow-hidden font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "var(--text-primary)", width: "6.5em", height: "1.1em" }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={VERBS[verbIdx]}
                    initial={{ y: "115%", opacity: 0 }}
                    animate={{ y: "0%",   opacity: 1 }}
                    exit={{ y: "-115%",   opacity: 0 }}
                    transition={{ duration: 0.5, ease: easeOutExpo }}
                    className="absolute inset-0 font-display italic text-[11px]"
                    style={{ fontStyle: "italic", letterSpacing: "0.04em", fontSize: "11px" }}
                  >
                    {VERBS[verbIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* Headline — BIG */}
            <RevealText
              as="h1"
              text="Smart ID Card."
              split="word"
              className="hero-headline block overflow-hidden"
              stagger={0.055}
              delay={0.35}
              repeat={false}
            />
            <RevealText
              as="h1"
              text="Detection & Authentication."
              split="word"
              className="hero-headline font-display italic block overflow-hidden"
              style={{ fontFamily: "var(--font-instrument), serif" }}
              stagger={0.055}
              delay={0.52}
              repeat={false}
            />

            {/* Brief */}
            <motion.p
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.85, duration: 0.9, ease: easeOutExpo }}
              className="mt-6 max-w-[50ch] text-base leading-[1.65] sm:text-[1.05rem] lg:text-[1.1rem]"
              style={{ color: "var(--text-body)" }}
            >
              A campus vision pipeline built on{" "}
              <em className="font-display italic">CA-YOLOv8</em>. Watches the live stream, flags
              students without a visible ID, captures the frame, runs{" "}
              <em className="font-display italic">InsightFace</em> against the enrolled gallery, and
              routes a clean incident packet to the{" "}
              <em className="font-display italic">HOD or Principal</em>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.75, ease: easeOutExpo }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                href="#ca-yolo"
                style={{ background: "var(--text-primary)", color: "var(--bg-base)" }}
              >
                Watch the pipeline
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <a
                href="#overview"
                data-cursor="hover"
                className="group inline-flex items-center gap-2 rounded-full border px-6 py-[14px] font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300"
                style={{
                  borderColor: "var(--border-strong)",
                  color: "var(--text-primary)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-2)" }} />
                How it works
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — live preview card
               Outer: entry fade/rise (initial→animate, no scroll transform)
               Inner: scroll parallax (style only, no initial/animate)
               Constrained to max-w so it never overwhelms the headline. */}
          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
            transition={{ delay: 0.6, duration: 1.05, ease: easeOutExpo }}
            className="flex flex-col items-center md:items-end"
          >
            <motion.div
              style={{ y: previewY, scale: previewScale }}
              className="w-full max-w-[400px] md:max-w-[420px] lg:max-w-[460px]"
            >
              <HeroLivePreview />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.7, ease: easeOutExpo }}
              className="mt-3 px-1 font-mono text-[10px] uppercase leading-relaxed tracking-[0.22em]"
              style={{ color: "var(--text-muted)" }}
            >
              ▸ simulated · cam-04 · pipeline state machine
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ── STATS STRIP — full width ──────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.85, ease: easeOutExpo }}
        className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4"
        style={{ background: "var(--border-strong)" }}
      >
        {HERO_STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-1.5 px-5 py-4 sm:px-6 sm:py-5"
            style={{ background: "var(--bg-raised)" }}
          >
            <CountUp
              value={s.value}
              suffix={s.suffix}
              decimals={s.decimals}
              duration={1.8}
              repeat={false}
              className="font-display text-[clamp(1.6rem,2.2vw,2.4rem)] leading-none tracking-tight"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              ▸ {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── BOTTOM ROW ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: easeOutExpo }}
        className="mt-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
          <ArrowDown className="h-4 w-4 animate-bounce" />
          Scroll to explore
        </div>
        <p className="hidden font-display italic text-right md:block" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.7rem)", color: "var(--text-primary)" }}>
          From frame to staff packet.<br />Every step is explainable.
        </p>
      </motion.div>
    </section>
  );
}
