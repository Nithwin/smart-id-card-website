"use client";

import { ShieldCheck, ShieldX } from "lucide-react";

interface Props {
  scenario: "detected" | "not_detected";
  onChange: (s: "detected" | "not_detected") => void;
}

export function ScenarioToggle({ scenario, onChange }: Props) {
  const isDetected = scenario === "detected";
  return (
    <div
      className="flex items-center gap-1 rounded-full p-1"
      style={{ background: "var(--bg-subtle)", border: "1px solid var(--border)" }}
    >
      <button
        type="button"
        onClick={() => onChange("detected")}
        data-cursor="hover"
        className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all"
        style={{
          background: isDetected ? "color-mix(in srgb, var(--ca-neutral) 18%, transparent)" : "transparent",
          color:      isDetected ? "var(--ca-neutral)" : "var(--text-muted)",
          border:     isDetected ? "1px solid color-mix(in srgb, var(--ca-neutral) 50%, transparent)" : "1px solid transparent",
        }}
      >
        <ShieldCheck className="h-3.5 w-3.5" /> With ID
      </button>
      <button
        type="button"
        onClick={() => onChange("not_detected")}
        data-cursor="hover"
        className="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all"
        style={{
          background: !isDetected ? "color-mix(in srgb, var(--ca-alert) 18%, transparent)" : "transparent",
          color:      !isDetected ? "var(--ca-alert)" : "var(--text-muted)",
          border:     !isDetected ? "1px solid color-mix(in srgb, var(--ca-alert) 50%, transparent)" : "1px solid transparent",
        }}
      >
        <ShieldX className="h-3.5 w-3.5" /> No ID
      </button>
    </div>
  );
}
