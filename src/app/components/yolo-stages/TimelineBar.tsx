"use client";

import { motion } from "framer-motion";

interface StageInfo {
  id: number;
  label: string;
  short?: string;
  isCA?: boolean;
}

const STAGES: StageInfo[] = [
  { id: 0, label: "Input",    short: "In" },
  { id: 1, label: "Conv",     short: "Cv" },
  { id: 2, label: "C2f",      short: "C2" },
  { id: 3, label: "SPPF",     short: "Sp" },
  { id: 4, label: "CBAM",     short: "CB", isCA: true },
  { id: 5, label: "Coord Attn", short: "Cd", isCA: true },
  { id: 6, label: "Neck",     short: "Nk" },
  { id: 7, label: "P2 Head",  short: "P2", isCA: true },
  { id: 8, label: "Dec. Head", short: "Dc" },
  { id: 9, label: "Output",   short: "Out" },
];

interface Props {
  currentStage: number;
  onJump: (stage: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function TimelineBar({ currentStage, onJump, isPlaying, onTogglePlay }: Props) {
  return (
    <div
      className="flex w-full max-w-full flex-col gap-3 rounded-2xl px-3 py-3 sm:flex-row sm:items-center sm:gap-3 sm:px-5 sm:py-4"
      style={{ background: "var(--bg-subtle)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--border)" }}
    >
      {/* Play/Pause */}
      <button
        type="button"
        onClick={onTogglePlay}
        data-cursor="hover"
        aria-label={isPlaying ? "Pause" : "Play"}
        className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition sm:mx-0"
        style={{
          background: "var(--text-primary)",
          color:      "var(--bg-base)",
        }}
      >
        {isPlaying ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <rect x="0" y="0" width="3" height="12" rx="1" />
            <rect x="7" y="0" width="3" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <polygon points="0,0 10,6 0,12" />
          </svg>
        )}
      </button>

      {/* Progress track — horizontal scroll + snap on narrow screens */}
      <div className="min-h-[52px] min-w-0 flex-1 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 [-webkit-overflow-scrolling:touch] md:overflow-visible md:px-0">
        <div className="relative flex min-w-[min(100%,560px)] items-center md:min-w-0">
          <div
            className="absolute inset-x-0 top-1/2 hidden h-0.5 -translate-y-1/2 rounded-full md:block"
            style={{ background: "var(--border-strong)" }}
          />
          <motion.div
            className="absolute left-0 top-1/2 hidden h-0.5 -translate-y-1/2 rounded-full md:block"
            style={{ background: "var(--ca-neutral)" }}
            animate={{ width: `${(currentStage / (STAGES.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="relative z-10 flex w-full snap-x snap-mandatory justify-between gap-1 px-0.5 md:gap-0">
            {STAGES.map((stage) => {
              const isActive = currentStage === stage.id;
              const isPassed = currentStage > stage.id;
              const accentColor = stage.isCA ? "var(--ca-mark)" : "var(--ca-neutral)";

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => onJump(stage.id)}
                  data-cursor="hover"
                  className="group relative flex min-w-[2.75rem] snap-center flex-col items-center py-1 md:min-w-0"
                  aria-label={`Jump to ${stage.label}`}
                >
                  <div
                    className="h-3 w-3 rounded-full transition-all duration-300 md:h-3"
                    style={{
                      background: isActive ? accentColor : isPassed ? "var(--text-primary)" : "var(--border-strong)",
                      transform:  isActive ? "scale(1.55)" : "scale(1)",
                      boxShadow:  isActive ? `0 0 12px ${stage.isCA ? "rgba(245,201,105,0.55)" : "rgba(124,156,255,0.55)"}` : "none",
                    }}
                  >
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-full"
                        style={{ background: accentColor, opacity: 0.35 }}
                        animate={{ scale: [1, 2.2, 1], opacity: [0.35, 0, 0.35] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </div>
                  <span
                    className="mt-1.5 max-w-[3.25rem] truncate text-center font-mono text-[8px] font-bold leading-tight transition-colors sm:mt-2 sm:max-w-none sm:text-[9px]"
                    style={{
                      color: isActive
                        ? (stage.isCA ? "var(--ca-mark)" : "var(--text-primary)")
                        : isPassed
                          ? "var(--text-primary)"
                          : "var(--text-muted)",
                    }}
                  >
                    <span className="md:hidden">{stage.short ?? stage.label}</span>
                    <span className="hidden md:inline">
                      {stage.label}
                      {stage.isCA && " ★"}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
