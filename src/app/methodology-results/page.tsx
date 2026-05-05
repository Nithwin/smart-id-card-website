import Link from "next/link";

export default function MethodologyResultsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10 sm:px-8">
      <header className="mb-10 border-b pb-5" style={{ borderColor: "var(--border)" }}>
        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
          Smart ID Detection
        </p>
        <h1 className="mt-2 font-display text-5xl italic leading-tight" style={{ color: "var(--text-primary)" }}>
          Methodology & Results
        </h1>
        <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-body)" }}>
          Printable summary page for project review, viva, and submission packets.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="font-mono text-sm uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
          Pipeline
        </h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
          Camera frame ingest → CA-YOLO detection (person + card) → no-ID rule check → InsightFace identification →
          structured alert packet to staff.
        </p>
      </section>

      <section className="mb-8 grid gap-3 sm:grid-cols-2">
        <article className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
            Core metrics
          </h3>
          <ul className="mt-2 space-y-1 text-sm" style={{ color: "var(--text-body)" }}>
            <li>mAP@50 (all): 98.6%</li>
            <li>mAP50-95 (all): 85.0%</li>
            <li>Inference latency: 11.2 ms/frame</li>
          </ul>
        </article>
        <article className="rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
          <h3 className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color: "var(--text-muted)" }}>
            Key modules
          </h3>
          <ul className="mt-2 space-y-1 text-sm" style={{ color: "var(--text-body)" }}>
            <li>CBAM attention</li>
            <li>Coordinate attention</li>
            <li>P2 micro-head</li>
            <li>Wise-IoU loss</li>
          </ul>
        </article>
      </section>

      <footer className="mt-10 border-t pt-5" style={{ borderColor: "var(--border)" }}>
        <Link
          href="/"
          className="inline-flex items-center rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.16em]"
          style={{ background: "var(--text-primary)", color: "var(--bg-base)" }}
        >
          Back to main showcase
        </Link>
      </footer>
    </main>
  );
}
