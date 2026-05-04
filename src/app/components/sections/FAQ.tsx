"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { RevealText }   from "@/app/components/ui/RevealText";
import { WordMark }     from "@/app/components/ui/WordMark";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { faqs }         from "@/app/data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-28 sm:px-8">
      <SectionLabel number="10" label="FAQ" className="mb-12" />

      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <RevealText
            as="h2"
            text="Common questions."
            split="word"
            stagger={0.06}
            className="text-display-md font-display italic leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          />
          <ScrollReveal direction="lift" delay={0.15}>
            <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
              The questions reviewers and visitors actually ask — answered plainly, so the
              architecture is readable without opening the report.
            </p>
          </ScrollReveal>
        </div>

        <div className="md:col-span-7">
          <ul className="divide-y" style={{ borderColor: "var(--border)" }}>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.li
                  key={f.q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative border-t py-6"
                  style={{ borderColor: "var(--border)" }}
                >
                  {/* hover accent line */}
                  <span
                    className="pointer-events-none absolute left-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"
                    style={{ width: "60px", background: "var(--accent)" }}
                  />
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    data-cursor="hover"
                    className="flex w-full items-center justify-between gap-6 text-left"
                  >
                    <h3
                      className="text-lg font-medium leading-snug transition-transform duration-500 group-hover:translate-x-1 sm:text-xl"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <span className="mr-3 font-mono text-[11px] tabular-nums opacity-50">
                        Q.{String(i + 1).padStart(2, "0")}
                      </span>
                      <WordMark text={f.q} />
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: isOpen ? "var(--accent)" : "var(--bg-subtle)",
                        color:      isOpen ? "#0a0a0a"      : "var(--text-primary)",
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="mt-4 max-w-2xl text-base leading-relaxed"
                          style={{ color: "var(--text-body)" }}
                        >
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
