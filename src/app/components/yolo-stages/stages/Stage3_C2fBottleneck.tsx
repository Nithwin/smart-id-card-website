"use client";

import { motion } from "framer-motion";
import { C2fPathLines } from "./stage3/C2fPathLines";
import { C2fStaticNodes } from "./stage3/C2fStaticNodes";
import { C2fLiveTensors } from "./stage3/C2fLiveTensors";

export function Stage3_C2fBottleneck() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4 md:p-8 overflow-hidden">
      <div className="yolo-stage-card relative w-full max-w-5xl h-[240px] sm:h-[280px]">

        {/* --- SCHEMATIC SVG PATHS --- */}
        <C2fPathLines />

        {/* --- STATIC MACHINE NODES --- */}
        <C2fStaticNodes />

        {/* --- LIVE TENSOR DATA BLOCKS --- */}
        <C2fLiveTensors />

      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel w-full max-w-4xl rounded-xl border p-4 text-center text-xs leading-relaxed text-slate-300"
        style={{ borderColor: "var(--border)" }}
      >
        <strong className="mx-auto mb-1 block font-bold text-[color:var(--ca-neutral)]">Watch for:</strong>
        One route keeps raw detail while the second route learns deeper abstractions, then both are fused.
      </motion.div>
    </div>
  );
}
