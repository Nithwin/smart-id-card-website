"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { easeOutExpo } from "@/app/lib/motion";

type Mode = "scanning" | "compliant" | "violation" | "matched";

const SEQUENCE: { mode: Mode; ms: number }[] = [
  { mode: "scanning",  ms: 1700 },
  { mode: "compliant", ms: 2200 },
  { mode: "scanning",  ms: 1100 },
  { mode: "violation", ms: 2200 },
  { mode: "matched",   ms: 2400 },
];

/**
 * A self-contained "live camera preview" panel for the hero.
 * Cycles through a short narrative: scanning → ID OK → no-ID → InsightFace match → route to HOD.
 * Pure SVG + framer — no images, no canvas, lightweight.
 */
export function HeroLivePreview() {
  const [step, setStep] = useState(0);
  const cur = SEQUENCE[step % SEQUENCE.length];

  useEffect(() => {
    const t = setTimeout(() => setStep((s) => (s + 1) % SEQUENCE.length), cur.ms);
    return () => clearTimeout(t);
  }, [step, cur.ms]);

  const isViolation = cur.mode === "violation" || cur.mode === "matched";

  return (
    <motion.div
      className="hero-preview relative w-full overflow-hidden rounded-[24px]"
      style={{
        background:
          "linear-gradient(160deg, color-mix(in srgb, var(--text-primary) 96%, transparent), color-mix(in srgb, var(--text-primary) 78%, transparent))",
        border: "1px solid color-mix(in srgb, var(--text-primary) 50%, transparent)",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 border-b px-5 py-3 sm:px-6"
        style={{ borderColor: "rgba(255,255,255,0.12)", color: "color-mix(in srgb, var(--bg-base) 92%, transparent)" }}
      >
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-90">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full" style={{ background: "var(--accent-2)" }} />
            <span className="relative h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent-2)" }} />
          </span>
          live · cam-04 · gate-a
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">
          <span className="hidden sm:inline">CA-YOLOv8</span>
          <span className="opacity-50">·</span>
          <span>InsightFace</span>
        </div>
      </div>

      {/* Camera viewport */}
      <div
        className="relative aspect-[16/10] w-full overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 30%, color-mix(in srgb, var(--bg-base) 8%, transparent), transparent 70%), color-mix(in srgb, var(--text-primary) 92%, transparent)",
        }}
      >
        {/* Faint dot grid */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden>
          {Array.from({ length: 16 }).map((_, r) =>
            Array.from({ length: 22 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={(c * 100) / 21}
                cy={(r * 80) / 15}
                r="0.18"
                fill="var(--bg-base)"
              />
            )),
          )}
        </svg>

        {/* Scan line — top-down sweep, runs continuously */}
        <motion.div
          className="pointer-events-none absolute left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${isViolation ? "var(--accent-2)" : "var(--accent)"} 50%, transparent)`,
            mixBlendMode: "screen",
          }}
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "linear" }}
        />

        {/* Scene */}
        <PersonScene mode={cur.mode} />

        {/* Corner brackets */}
        {[
          { x: "12px", y: "12px", r: 0 },
          { x: "auto",  y: "12px", r: 90,  right: "12px" },
          { x: "12px", y: "auto",  r: 270, bottom: "12px" },
          { x: "auto",  y: "auto", r: 180, right: "12px", bottom: "12px" },
        ].map((c, i) => (
          <span
            key={i}
            aria-hidden
            className="pointer-events-none absolute h-3 w-3"
            style={{
              left: c.x === "auto" ? undefined : c.x,
              top:  c.y === "auto" ? undefined : c.y,
              right:  (c as { right?: string }).right,
              bottom: (c as { bottom?: string }).bottom,
              transform: `rotate(${c.r}deg)`,
              borderTop: "1px solid color-mix(in srgb, var(--bg-base) 60%, transparent)",
              borderLeft: "1px solid color-mix(in srgb, var(--bg-base) 60%, transparent)",
            }}
          />
        ))}

        {/* Status badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.mode}
            initial={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="absolute right-3 top-3 flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
            style={{
              background: badgeBg(cur.mode),
              color:      "var(--bg-base)",
              border:     `1px solid ${badgeBorder(cur.mode)}`,
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: badgeDot(cur.mode) }} />
            {badgeLabel(cur.mode)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Telemetry strip */}
      <div className="grid grid-cols-3 gap-px"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        {telemetryFor(cur.mode).map((t) => (
          <div key={t.label}
            className="px-4 py-3 sm:px-5"
            style={{ background: "color-mix(in srgb, var(--text-primary) 96%, transparent)", color: "var(--bg-base)" }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] opacity-55">{t.label}</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={t.value}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className="mt-1.5 font-display italic leading-none"
                style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.65rem)", color: t.tone ?? "var(--bg-base)" }}
              >
                {t.value}
              </motion.p>
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Bottom routing line */}
      <div className="flex items-center justify-between gap-3 border-t px-5 py-3 sm:px-6 font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ borderColor: "rgba(255,255,255,0.12)", color: "color-mix(in srgb, var(--bg-base) 80%, transparent)" }}
      >
        <span className="opacity-70">▸ pipeline</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={cur.mode + "_route"}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.35 }}
            className="truncate"
            style={{ color: isViolation ? "var(--accent)" : "var(--bg-base)" }}
          >
            {routeLabel(cur.mode)}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Scene — silhouette + boxes + face landmarks ─────────────────── */

function PersonScene({ mode }: { mode: Mode }) {
  const showCard   = mode === "compliant";
  const showFace   = mode === "violation" || mode === "matched";
  const showVector = mode === "matched";

  return (
    <svg
      viewBox="0 0 100 80"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {/* Subtle horizon */}
      <line x1="0" y1="62" x2="100" y2="62" stroke="var(--bg-base)" strokeWidth="0.18" opacity="0.18" />

      {/* Person body silhouette (geometric) */}
      <g
        opacity="0.95"
        fill="none"
        stroke="color-mix(in srgb, var(--bg-base) 75%, transparent)"
        strokeWidth="0.6"
      >
        {/* Head */}
        <circle cx="50" cy="20" r="6" />
        {/* Neck */}
        <line x1="50" y1="26" x2="50" y2="32" />
        {/* Torso */}
        <path d="M 36 36 Q 50 30 64 36 L 64 60 Q 50 64 36 60 Z" />
        {/* Arms */}
        <line x1="36" y1="40" x2="30" y2="58" />
        <line x1="64" y1="40" x2="70" y2="58" />
        {/* Legs */}
        <line x1="44" y1="62" x2="42" y2="78" />
        <line x1="56" y1="62" x2="58" y2="78" />
      </g>

      {/* Person bbox — always visible, animates color */}
      <motion.rect
        x="28" y="12" width="44" height="56" rx="0.6"
        stroke="var(--accent)" strokeWidth="0.45" fill="none"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
      <motion.text x="28" y="10" fontSize="2.4" fontFamily="var(--font-geist-mono)" fill="var(--accent)" opacity="0.9">
        person 0.99
      </motion.text>

      {/* ID card box (compliant only) */}
      <AnimatePresence>
        {showCard && (
          <motion.g
            key="card"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: "50px 42px" }}
          >
            <rect x="44" y="38" width="14" height="9" rx="0.4"
              stroke="var(--accent-2)" strokeWidth="0.45" strokeDasharray="1.2 0.8"
              fill="color-mix(in srgb, var(--accent-2) 14%, transparent)" />
            <text x="44" y="36.6" fontSize="2" fontFamily="var(--font-geist-mono)" fill="var(--accent-2)">
              id 0.92
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* No-ID violation indicator */}
      <AnimatePresence>
        {(mode === "violation" || mode === "matched") && (
          <motion.g
            key="warn"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4 }}
            style={{ transformOrigin: "51px 42px" }}
          >
            <circle cx="51" cy="42" r="4.4" stroke="var(--accent-2)" strokeWidth="0.5" fill="none" />
            <line x1="48.5" y1="39.5" x2="53.5" y2="44.5" stroke="var(--accent-2)" strokeWidth="0.55" />
            <text x="56" y="43.5" fontSize="1.9" fontFamily="var(--font-geist-mono)" fill="var(--accent-2)">
              no id
            </text>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Face landmarks (when escalating) */}
      <AnimatePresence>
        {showFace && (
          <motion.g
            key="face"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <circle cx="50" cy="20" r="6.6" stroke="var(--accent)" strokeWidth="0.5" fill="none" strokeDasharray="0.8 0.7" />
            {[
              [47.5, 18.2], [52.5, 18.2], [50, 20.5], [50, 22], [47.8, 23.4], [52.2, 23.4],
              [45.6, 19.8], [54.4, 19.8],
            ].map(([cx, cy], i) => (
              <motion.circle
                key={i}
                cx={cx} cy={cy} r="0.55" fill="var(--accent)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>

      {/* Match vector ribbon */}
      <AnimatePresence>
        {showVector && (
          <motion.g
            key="vec"
            initial={{ opacity: 0, x: -2 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            <line x1="58" y1="20" x2="86" y2="20" stroke="var(--accent)" strokeWidth="0.4" strokeDasharray="0.8 0.6" />
            <rect x="86" y="16.5" width="12" height="7" rx="0.4" fill="var(--accent)" />
            <text x="87.2" y="21" fontSize="1.9" fontFamily="var(--font-geist-mono)" fill="#0a0a0a">
              0.83 ✓
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

/* ─── Helpers ──────────────────────────────────────────────────────── */

function badgeBg(mode: Mode) {
  switch (mode) {
    case "compliant": return "color-mix(in srgb, #34d399 22%, transparent)";
    case "violation": return "color-mix(in srgb, var(--accent-2) 24%, transparent)";
    case "matched":   return "color-mix(in srgb, var(--accent) 26%, transparent)";
    case "scanning":
    default:          return "color-mix(in srgb, var(--bg-base) 12%, transparent)";
  }
}
function badgeBorder(mode: Mode) {
  switch (mode) {
    case "compliant": return "color-mix(in srgb, #34d399 60%, transparent)";
    case "violation": return "color-mix(in srgb, var(--accent-2) 70%, transparent)";
    case "matched":   return "color-mix(in srgb, var(--accent) 70%, transparent)";
    case "scanning":
    default:          return "color-mix(in srgb, var(--bg-base) 30%, transparent)";
  }
}
function badgeDot(mode: Mode) {
  switch (mode) {
    case "compliant": return "#34d399";
    case "violation": return "var(--accent-2)";
    case "matched":   return "var(--accent)";
    case "scanning":
    default:          return "color-mix(in srgb, var(--bg-base) 75%, transparent)";
  }
}
function badgeLabel(mode: Mode) {
  switch (mode) {
    case "compliant": return "id ok";
    case "violation": return "no id · capturing";
    case "matched":   return "match · routing";
    case "scanning":
    default:          return "scanning";
  }
}

function routeLabel(mode: Mode) {
  switch (mode) {
    case "compliant": return "no action · log only";
    case "violation": return "frame captured → InsightFace";
    case "matched":   return "Routing to HOD / Principal";
    case "scanning":
    default:          return "watching cam-04";
  }
}

function telemetryFor(mode: Mode): { label: string; value: string; tone?: string }[] {
  switch (mode) {
    case "compliant":
      return [
        { label: "person", value: "0.99" },
        { label: "id card", value: "0.92" },
        { label: "verdict", value: "ok", tone: "#34d399" },
      ];
    case "violation":
      return [
        { label: "person", value: "0.99" },
        { label: "id card", value: "—",  tone: "var(--accent-2)" },
        { label: "verdict", value: "no id", tone: "var(--accent-2)" },
      ];
    case "matched":
      return [
        { label: "match", value: "0.83" },
        { label: "student", value: "VRN-184" },
        { label: "route", value: "hod ✓", tone: "var(--accent)" },
      ];
    case "scanning":
    default:
      return [
        { label: "fps", value: "18" },
        { label: "lat", value: "142ms" },
        { label: "frames", value: "00:42" },
      ];
  }
}
