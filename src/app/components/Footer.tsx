"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/app/components/ui/Logo";
import { team as projectTeam } from "@/app/data";

const sitemap = [
  ["#home",      "Home"],
  ["#overview",  "Overview"],
  ["#modules",   "Modules"],
  ["#ca-yolo",   "CA-YOLO Pipeline"],
  ["#metrics",   "Metrics"],
  ["#team",      "Team"],
  ["#timeline",  "Timeline"],
  ["#faq",       "FAQ"],
];

const stack = [
  "YOLOv8 + CBAM",
  "Coordinate Attention",
  "P2 Micro-Head",
  "Wise-IoU Loss",
  "InsightFace · ArcFace",
  "FastAPI · MJPEG",
];

export function Footer() {
  return (
    <footer
      className="invert-section relative overflow-hidden"
      style={{ background: "var(--bg-invert)", color: "var(--bg-base)" }}
    >
      {/* Top tagline + email */}
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 pt-24 sm:px-8 md:grid-cols-12">

        <div className="md:col-span-7">
          <div className="mb-8 flex items-center gap-3">
            <Logo size={32} style={{ color: "var(--bg-base)" }} />
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] opacity-70">
              smart-id / detection
            </span>
          </div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] opacity-50">
            ▸ Get in touch
          </p>
          <a
            href="mailto:vmnithwin@gmail.com"
            data-cursor="hover"
            className="group inline-block text-display-md font-display italic"
          >
            <span className="inline-flex items-center gap-4">
              vmnithwin@gmail.com
              <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 sm:h-12 sm:w-12" />
            </span>
          </a>
          <p className="mt-6 max-w-md text-base leading-relaxed opacity-60">
            Want the source, the report, or to collaborate on extending the model? Drop a line.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-5">
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] opacity-50">Sitemap</p>
            <ul className="space-y-2 text-sm">
              {sitemap.map(([href, label]) => (
                <li key={label}>
                  <a
                    href={href}
                    data-cursor="hover"
                    className="opacity-70 transition-opacity hover:opacity-100"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] opacity-50">Stack</p>
            <ul className="space-y-2 text-sm">
              {stack.map((s) => (
                <li key={s} className="opacity-70">{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Team band */}
      <div
        className="mx-auto mt-20 grid max-w-[1600px] gap-px overflow-hidden border-t px-5 pt-px sm:px-8 md:grid-cols-3"
        style={{ borderColor: "rgba(255,255,255,0.12)" }}
      >
        {projectTeam.map((t, i) => (
          <div
            key={t.name}
            className="flex items-center gap-4 border-r px-3 py-8 last:border-r-0 md:px-5"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-white/15">
              <Image
                src={t.photo}
                alt={t.name}
                fill
                sizes="64px"
                className="team-portrait-photo object-cover object-top"
              />
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-50">
                0{i + 1} · {t.shortRole}
              </span>
              <span className="font-display text-2xl italic sm:text-3xl">{t.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Monumental wordmark */}
      <div
        className="mx-auto max-w-[1600px] overflow-hidden border-t px-5 pb-8 pt-12 sm:px-8"
        style={{ borderColor: "rgba(255,255,255,0.12)" }}
      >
        <p
          className="font-display italic leading-[0.9] tracking-tighter"
          style={{ fontSize: "clamp(4rem, 18vw, 18rem)" }}
        >
          smart-id.
        </p>
      </div>

      {/* Minimal bottom row */}
      <div
        className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 border-t px-5 py-5 font-mono text-[11px] uppercase tracking-[0.22em] sm:px-8"
        style={{ borderColor: "rgba(255,255,255,0.12)" }}
      >
        <span className="opacity-60">© {new Date().getFullYear()} smart-id · CA-YOLOv8</span>
        <span className="flex flex-wrap items-center gap-2 opacity-80">
          <span className="opacity-60">designed &amp; developed by</span>
          <a
            href="mailto:vmnithwin@gmail.com"
            data-cursor="hover"
            className="group relative inline-flex items-center gap-1.5"
            style={{ color: "var(--accent)" }}
          >
            Nithwin
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span
              className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
              style={{ background: "var(--accent)" }}
            />
          </a>
        </span>
        <a
          href="#"
          data-cursor="hover"
          className="inline-flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
        >
          Back to top <ArrowUpRight className="h-3 w-3 -rotate-45" />
        </a>
      </div>
    </footer>
  );
}
