"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Logo } from "@/app/components/ui/Logo";
import { easeOutExpo, easeOutStrong } from "@/app/lib/motion";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);

  useEffect(() => {
    let val = 0;
    const interval = setInterval(() => {
      val += Math.random() * 11 + 4;
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        setTimeout(() => setDone(true), 420);
      }
      setProgress(Math.min(val, 100));
    }, 75);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{
            y: "-100%",
            transition: { duration: 1.05, ease: easeOutStrong },
          }}
          className="fixed inset-0 z-[10000] flex items-end justify-between p-8 sm:p-12"
          style={{ background: "var(--bg-invert)", color: "var(--bg-base)" }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ clipPath: "inset(0 0 0 0)" }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 0.55, ease: easeOutExpo, delay: 0.5 },
            }}
            style={{ background: "var(--bg-invert)" }}
            aria-hidden
          />

          {/* Brand row */}
          <motion.div
            className="relative z-10 flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65, ease: easeOutExpo }}
          >
            <Logo size={26} style={{ color: "var(--bg-base)" }} />
            <div className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">
              SICD ▸ CA-YOLOv8
            </div>
          </motion.div>

          {/* Centered display */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.75, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: easeOutExpo }}
              className="mb-4"
              style={{ color: "var(--bg-base)" }}
            >
              <Logo size={84} animate={false} style={{ color: "var(--accent)" }} />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 28, letterSpacing: "0.35em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
              transition={{ duration: 0.75, delay: 0.18, ease: easeOutExpo }}
              className="font-display italic"
              style={{ fontSize: "clamp(3rem, 12vw, 10rem)", lineHeight: 0.85 }}
            >
              loading
            </motion.span>

            <div className="flex w-full max-w-md items-center gap-4">
              <div className="font-mono text-xs tabular-nums opacity-60">000</div>
              <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/12">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 40%, white))",
                    boxShadow: "0 0 24px color-mix(in srgb, var(--accent) 50%, transparent)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.4 }}
                />
              </div>
              <div className="font-mono text-xs tabular-nums">{String(Math.floor(progress)).padStart(3, "0")}</div>
            </div>
          </div>

          {/* Footer */}
          <motion.div
            className="relative z-10 text-right font-mono text-xs uppercase tracking-[0.3em] opacity-60"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease: easeOutExpo }}
          >
            campus vision · 2025/26
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
