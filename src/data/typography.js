// Typography constants — Butterick's Practical Typography compliant
// Reference: https://practicaltypography.com/
// Font: Inter (professional quality)
// Body: 16px / line-height 1.4 (140% — within 120–145% range)
// All-caps labels: letterSpacing 0.08em (within 5–12% rule)
// Paragraph spacing only — no first-line indents (never both)
// Bold used sparingly; no bold+italic together
// Line length capped at ~65ch (within 45–90 char rule)
// Dark UI: use off-white (#e8e8e8) not pure white — screens emit light, pure white is harsh
// Small text (≤12px) on dark bg: minimum #888 for legibility

export const T = {
  font: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
  body: { fontSize: 16, lineHeight: 1.4, color: "#333" },
  small: { fontSize: 15, lineHeight: 1.4, color: "#555" },
  label: { fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 },
  maxW: "65ch",
  pad: "48px 52px",
};
