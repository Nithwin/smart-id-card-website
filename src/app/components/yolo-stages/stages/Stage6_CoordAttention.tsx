"use client";

import { motion } from "framer-motion";
import { CoordPathLines } from "./stage6/CoordPathLines";
import { CoordStaticNodes } from "./stage6/CoordStaticNodes";
import { CoordLiveTensors } from "./stage6/CoordLiveTensors";

interface Props { scenario: "detected" | "not_detected" }

export function Stage6_CoordAttention({ scenario }: Props) {
  const detected = scenario === "detected";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-4 md:p-8 overflow-hidden">
      <div className="yolo-stage-card relative w-full max-w-5xl h-[240px] sm:h-[280px]">

        <CoordPathLines />
        <CoordStaticNodes />
        <CoordLiveTensors scenario={scenario} />

      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel w-full max-w-4xl rounded-xl border p-4 text-center text-xs leading-relaxed text-slate-300"
        style={{ borderColor: "var(--border)" }}
      >
        <strong className={`mx-auto mb-1 block font-bold ${detected ? "text-[color:var(--ca-mark)]" : "text-[color:var(--ca-alert)]"}`}>
          {detected ? "Coordinate Attention narrows horizontal and vertical position" : "Directional signals remain weak without a clear card"}
        </strong>
        {detected ? (
          <>X-axis and Y-axis attention are learned separately, so the detector knows exactly where to look.</>
        ) : (
          <>When no region stands out, the attention maps stay uniform and avoid false localization spikes.</>
        )}
      </motion.div>
    </div>
  );
}
