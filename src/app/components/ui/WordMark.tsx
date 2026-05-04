"use client";

/**
 * WordMark — splits a text string into per-word spans.
 * Each word gets the `.word-hi` hover highlight (marker-pen effect).
 *
 * Usage:
 *   <WordMark text="Smart ID Detection" />
 *   <WordMark text="Overview" as="h2" className="text-display-md" />
 */

interface WordMarkProps {
  text: string;
  /** Rendered element. Defaults to <span> so it works inline inside h1, h2, p, etc. */
  as?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
  className?: string;
  style?: React.CSSProperties;
}

export function WordMark({ text, as: Tag = "span", className = "", style }: WordMarkProps) {
  const parts = text.split(/(\s+)/);
  return (
    <Tag className={className} style={style}>
      {parts.map((part, i) =>
        /^\s+$/.test(part) ? (
          // Preserve whitespace as-is
          <span key={i} aria-hidden="true">{part}</span>
        ) : (
          <span key={i} className="word-hi">
            {part}
          </span>
        ),
      )}
    </Tag>
  );
}
