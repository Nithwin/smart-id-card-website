"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { storyPanels, type StoryPanel } from "@/app/data";
import { SectionLabel } from "@/app/components/ui/SectionLabel";

/**
 * Award-style horizontal narrative track.
 * Visuals are typographic / SVG — no stock photos, nothing that can fail to load.
 */
export function ProjectStory() {
  const wrapRef  = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrap  = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1.15,
          start: "top top",
          end: () =>
            `+=${Math.max(
              track.scrollWidth - window.innerWidth + window.innerHeight * 0.4,
              window.innerHeight * 1.1,
            )}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      id="chapters"
      className="relative overflow-hidden bg-[var(--bg-subtle)]"
      style={{ borderBlock: "1px solid var(--border)" }}
    >
      <div className="relative z-20 px-5 pb-4 pt-10 sm:px-8 sm:pt-14 md:absolute md:left-0 md:right-0 md:top-0 md:pb-0 md:pt-10">
        <SectionLabel number="∴" label="The story in five frames" className="mb-2 max-w-[1600px] mx-auto" />
        <p
          className="mx-auto max-w-[1600px] font-mono text-[11px] uppercase leading-relaxed tracking-[0.18em] sm:text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          Problem · Detection · CA-YOLOv8 · InsightFace · Delivery
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex w-full flex-col gap-0 md:h-[min(100dvh,900px)] md:w-max md:flex-row md:flex-nowrap md:items-stretch md:pt-28"
      >
        {storyPanels.map((p, i) => (
          <article
            key={p.id}
            className="relative flex min-h-[88dvh] w-full shrink-0 flex-col border-t md:h-full md:min-h-0 md:w-[min(92vw,720px)] md:flex-row md:border-l md:border-t-0"
            style={{ borderColor: "var(--border)" }}
          >
            <ChapterVisual panel={p} index={i} total={storyPanels.length} />

            <div
              className="flex flex-1 flex-col justify-center px-5 py-10 sm:px-8 md:py-16 md:pl-10 md:pr-12"
              style={{ background: "var(--bg-raised)" }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "var(--accent-3)" }}
              >
                ▸ {p.kicker}
              </p>
              <h2
                className="mt-3 font-display text-[clamp(1.75rem,4.6vw,3rem)] font-medium leading-[1.05] tracking-tight"
                style={{ color: "var(--text-primary)" }}
              >
                {p.title}
              </h2>
              <p
                className="mt-5 max-w-prose text-[15px] leading-relaxed sm:text-base"
                style={{ color: "var(--text-body)" }}
              >
                {p.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      <p
        className="px-5 py-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] md:hidden"
        style={{ color: "var(--text-muted)" }}
      >
        Scroll for each chapter
      </p>
    </section>
  );
}

/* ─── Custom typographic visual per chapter ──────────────── */

function ChapterVisual({ panel, index, total }: { panel: StoryPanel; index: number; total: number }) {
  return (
    <div
      className="relative flex h-[44vh] min-h-[260px] w-full overflow-hidden md:h-full md:w-[48%]"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--text-primary) 96%, transparent), color-mix(in srgb, var(--text-primary) 88%, transparent))",
        color: "var(--bg-base)",
      }}
    >
      {/* Faint dot grid */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-[0.16]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 18 }).map((_, r) =>
          Array.from({ length: 12 }).map((_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={(c * 100) / 11}
              cy={(r * 100) / 17}
              r="0.25"
              fill="currentColor"
            />
          )),
        )}
      </svg>

      {/* Tone wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 70% at 78% 22%, color-mix(in srgb, ${panel.tone} 28%, transparent), transparent 70%)`,
        }}
      />

      {/* Top meta */}
      <div className="absolute left-5 top-5 right-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] opacity-80 md:left-7 md:top-7 md:right-7">
        <span>chapter {panel.id}</span>
        <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      </div>

      {/* Centerpiece */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
        <ChapterGlyph glyph={panel.glyph} tone={panel.tone} />
      </div>

      {/* Footnote */}
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 md:bottom-7 md:left-7 md:right-7">
        <span
          className="font-display italic leading-none"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)", color: panel.tone }}
        >
          /{panel.id}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] opacity-70">
          {panel.kicker}
        </span>
      </div>
    </div>
  );
}

/**
 * Each chapter has a hand-drawn diagrammatic glyph that hints at what the chapter is about.
 * Pure SVG — small, sharp at any size, no asset dependencies.
 */
function ChapterGlyph({ glyph, tone }: { glyph: StoryPanel["glyph"]; tone: string }) {
  switch (glyph) {
    case "campus":
      return (
        <svg viewBox="0 0 200 140" className="h-full max-h-[260px] w-full" fill="none">
          {/* corridor */}
          <line x1="10" y1="120" x2="190" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.5" />
          <line x1="10" y1="124" x2="190" y2="124" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          {/* people */}
          {[30, 70, 110, 150].map((cx, i) => (
            <g key={cx}>
              <circle cx={cx} cy="72" r="7" stroke="currentColor" strokeWidth="1.4" />
              <path
                d={`M${cx - 12} 120 Q${cx} 92 ${cx + 12} 120`}
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
              {/* card lanyard on 3 of 4 */}
              {i !== 1 && (
                <g>
                  <line x1={cx - 4} y1="80" x2={cx + 4} y2="80" stroke={tone} strokeWidth="1" />
                  <rect x={cx - 6} y="85" width="12" height="9" rx="1" fill={tone} opacity="0.85" />
                </g>
              )}
              {/* missing ID badge on the 2nd person */}
              {i === 1 && (
                <g>
                  <circle cx={cx + 8} cy="80" r="5" stroke={tone} strokeWidth="1.2" fill="none" />
                  <line x1={cx + 5} y1="77" x2={cx + 11} y2="83" stroke={tone} strokeWidth="1.2" />
                </g>
              )}
            </g>
          ))}
          {/* camera glyph in corner */}
          <g transform="translate(160, 18)">
            <rect x="0" y="0" width="22" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="11" cy="7" r="3" stroke="currentColor" strokeWidth="1.2" />
            <line x1="11" y1="14" x2="11" y2="60" stroke="currentColor" strokeDasharray="2 3" strokeWidth="0.8" opacity="0.5" />
          </g>
        </svg>
      );

    case "yolo":
      return (
        <svg viewBox="0 0 200 140" className="h-full max-h-[260px] w-full" fill="none">
          {/* frame */}
          <rect x="22" y="20" width="156" height="100" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <text x="22" y="14" fontFamily="var(--font-geist-mono)" fontSize="7" fill="currentColor" opacity="0.6">
            FRAME · 640×640
          </text>
          {/* person box */}
          <rect x="60" y="38" width="56" height="74" stroke={tone} strokeWidth="1.6" />
          <text x="62" y="35" fontFamily="var(--font-geist-mono)" fontSize="6" fill={tone}>
            person 0.99
          </text>
          {/* card box */}
          <rect x="76" y="60" width="22" height="14" stroke={tone} strokeWidth="1.4" strokeDasharray="3 2" />
          <text x="76" y="57" fontFamily="var(--font-geist-mono)" fontSize="5.5" fill={tone}>
            id 0.92
          </text>
          {/* corner crosshairs */}
          {[
            [22, 20], [178, 20], [22, 120], [178, 120],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`}>
              <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} stroke="currentColor" strokeWidth="0.8" />
              <line x1={cx} y1={cy - 4} x2={cx} y2={cy + 4} stroke="currentColor" strokeWidth="0.8" />
            </g>
          ))}
        </svg>
      );

    case "attention":
      return (
        <svg viewBox="0 0 200 140" className="h-full max-h-[260px] w-full" fill="none">
          {/* heatmap grid */}
          {Array.from({ length: 12 }).map((_, r) =>
            Array.from({ length: 18 }).map((_, c) => {
              const dx = c - 8;
              const dy = r - 5;
              const d  = Math.sqrt(dx * dx + dy * dy);
              const a  = Math.max(0, 1 - d / 7);
              return (
                <rect
                  key={`${r}-${c}`}
                  x={20 + c * 9}
                  y={18 + r * 8}
                  width="7"
                  height="6"
                  fill={tone}
                  opacity={a * 0.85}
                />
              );
            }),
          )}
          {/* arrows H + V */}
          <line x1="10" y1="64" x2="190" y2="64" stroke="currentColor" strokeWidth="0.6" opacity="0.45" strokeDasharray="2 3" />
          <line x1="100" y1="6"  x2="100" y2="124" stroke="currentColor" strokeWidth="0.6" opacity="0.45" strokeDasharray="2 3" />
          <text x="14" y="14" fontFamily="var(--font-geist-mono)" fontSize="6.5" fill="currentColor" opacity="0.7">
            CBAM × Coord-Attn × P2
          </text>
        </svg>
      );

    case "face":
      return (
        <svg viewBox="0 0 200 140" className="h-full max-h-[260px] w-full" fill="none">
          {/* face oval */}
          <ellipse cx="100" cy="72" rx="38" ry="48" stroke="currentColor" strokeWidth="1.2" />
          {/* landmarks */}
          {[
            [88, 60], [112, 60], [100, 72], [88, 88], [112, 88], [100, 96],
            [82, 70], [118, 70], [94, 78], [106, 78],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill={tone} />
          ))}
          {/* connection lines */}
          {[
            [88, 60, 100, 72], [112, 60, 100, 72], [88, 88, 100, 96], [112, 88, 100, 96],
            [82, 70, 88, 60], [118, 70, 112, 60],
          ].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={tone} strokeWidth="0.6" opacity="0.7" />
          ))}
          {/* embedding ribbon */}
          <text x="20" y="124" fontFamily="var(--font-geist-mono)" fontSize="7" fill="currentColor" opacity="0.7">
            cosine 0.83 · matched
          </text>
          <text x="20" y="14" fontFamily="var(--font-geist-mono)" fontSize="6.5" fill="currentColor" opacity="0.7">
            ARCFACE · BUFFALO_L
          </text>
        </svg>
      );

    case "alert":
    default:
      return (
        <svg viewBox="0 0 200 140" className="h-full max-h-[260px] w-full" fill="none">
          {/* envelope */}
          <rect x="32" y="34" width="136" height="72" rx="4" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 32 36 L 100 80 L 168 36" stroke="currentColor" strokeWidth="1" opacity="0.6" fill="none" />
          {/* recipient line */}
          <line x1="42" y1="92" x2="120" y2="92" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
          <text x="42" y="89" fontFamily="var(--font-geist-mono)" fontSize="6" fill="currentColor" opacity="0.75">
            TO: HOD · PRINCIPAL
          </text>
          {/* attached chip */}
          <rect x="124" y="84" width="36" height="14" rx="3" fill={tone} />
          <text x="129" y="93" fontFamily="var(--font-geist-mono)" fontSize="6" fill="#0a0a0a">
            evidence
          </text>
          {/* signal */}
          <circle cx="170" cy="32" r="4" fill={tone} />
          <circle cx="170" cy="32" r="9" stroke={tone} strokeWidth="0.8" opacity="0.55" />
          <circle cx="170" cy="32" r="14" stroke={tone} strokeWidth="0.6" opacity="0.3" />
        </svg>
      );
  }
}
