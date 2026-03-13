const COLORS = {
  kw: "#c678dd",
  str: "#98c379",
  num: "#d19a66",
  cmt: "#5c6370",
  prop: "#e06c75",
  val: "#61afef",
  typ: "#e5c07b",
  bool: "#d19a66",
  pct: "#abb2bf",
};

import { useState } from "react";

export default function CodeLine({ parts, onClick }) {
  const [hovered, setHovered] = useState(false);
  if (!parts || parts.length === 0) return <div style={{ height: 21 }}>&nbsp;</div>;
  if (parts.length === 1 && parts[0] === "") return <div style={{ height: 21 }}>&nbsp;</div>;

  const spans = [];
  for (let i = 0; i < parts.length; i += 2) {
    const type = parts[i];
    const text = parts[i + 1];
    if (text === undefined) {
      spans.push(
        <span key={i} style={{ color: COLORS.pct }}>{type}</span>
      );
    } else {
      spans.push(
        <span
          key={i}
          style={{
            color: COLORS[type] || COLORS.pct,
            fontStyle: type === "cmt" ? "italic" : "normal",
          }}
        >
          {text}
        </span>
      );
    }
  }

  return (
    <div
      style={{
        lineHeight: "21px",
        whiteSpace: "pre",
        cursor: onClick ? "pointer" : "text",
        background: onClick && hovered ? "rgba(255,255,255,0.05)" : "transparent",
        borderRadius: 3,
        transition: "background 120ms ease",
      }}
      onClick={onClick}
      onMouseEnter={onClick ? () => setHovered(true) : undefined}
      onMouseLeave={onClick ? () => setHovered(false) : undefined}
    >
      {spans}
    </div>
  );
}
